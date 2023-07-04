import { admin, bucket } from "../firebase/firebase-config";
import toTitleCase from "./toTitleCase";


const USER_UUID = process.env.WEBSITE_UUID;

const getDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const generateGetUrl = (img) => {
  const url = `https://firebasestorage.googleapis.com/v0/b/management-restaurants.appspot.com/o/${img.replace(/\//g, "%2F")}?alt=media`
  return url;
}

export async function getWebsiteData() {
  const dataPromise = admin.firestore().collection("websites").doc(USER_UUID).get();
  const locationsPromise = await admin.firestore().collection("restaurants").doc(USER_UUID).collection("locations").get();

  const [dataDoc, locationSnapshot] = await Promise.all([dataPromise, locationsPromise]);

  const data = dataDoc.data();


  //NO LONGER USING SIGNED URLS (but cba to change variable name te he)
  const signedData = getDeepCopy(data);


  if (data.logo) {
    signedData.logo = generateGetUrl(data.logo);
  }

  data.images.forEach((img, i) => {
    if (img) {
      signedData.images[i] = generateGetUrl(img);
    } else {
      signedData.images[i] = ""
    }
  })

  Object.keys(data.backgrounds).forEach((key) => {
    if (data.backgrounds[key]) {
      signedData.backgrounds[key] = generateGetUrl(data.backgrounds[key]);
    } else {
      signedData.backgrounds[key] = "";
    }
  })

  //now build the location data
  signedData.deliveryOptions = [];
  signedData.pickupOptions = [];
  signedData.addresses = [];
  signedData.delivery = false;
  signedData.pickup = false;
  signedData.reviewOptions = []

  locationSnapshot.forEach((doc) => {
    const location = doc.data();

    //delivery options
    if (location.delivery) {
      signedData.delivery = true;
      let deliveryOption = { location: location.name, options: [] };
      location.deliveryOptions.forEach(d => {
        deliveryOption.options.push(
          {
            type: d.type,
            url: d.url,
          }
        )
      })
      signedData.deliveryOptions.push(deliveryOption);
    }


    //pickup options:
    if (location.pickup) {
      signedData.pickup = true;
      let pickupOption = { location: location.name, options: [] };
      location.pickupOptions.forEach(p => {
        pickupOption.options.push(
          {
            type: p.type,
            url: p.url,
          }
        )
      })
      signedData.pickupOptions.push(pickupOption);
    }
    //addresses
    const address = {
      locationId: location.locationId,
      name: location.name,
      area: location.location,
      address: location.address,
      phone: location.contactNumber,
      email: location.contactEmail,
      openingTimes: location.openingTimes,
    }
    signedData.addresses.push(address);


    //review options:
    signedData.reviewOptions.push({
      location: `${location.name}, ${location.location}`,
      reviewTypes: location.reviewOptions,
    })
  })


  //now build other general site info
  signedData.navOptions = []

  //menus (make this a function) at some point once added that to admin:
  signedData.navOptions.push({
    "name": "Menus",
    "url": "",
    "dropdownOptions": signedData.menus.map((menu) => (
      {
        name: menu.name,
        url: generateGetUrl(menu.url),
      }
    )),
  })

  if (signedData.delivery) {
    signedData.navOptions.push({
      "name": "Delivery",
      "url": "/delivery",
      "dropdownOptions": []
    })
  }

  if (signedData.pickup) {
    signedData.navOptions.push({
      "name": "Pickup",
      "url": "/pickup",
      "dropdownOptions": []
    })
  }

  if (signedData.offerGiftCards) {
    signedData.navOptions.push({
      "name": "Gift Cards",
      "url": signedData.giftCardUrl,
      "dropdownOptions": []
    })
  }


  signedData.navOptions.push({
    "name": "Contact Us",
    "url": "/contactus",
    "dropdownOptions": []
  });

  console.log(signedData)

  return signedData;
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  let period = "am";
  let hour = parseInt(hours);

  if (hour >= 12) {
    period = "pm";
    if (hour > 12) {
      hour -= 12;
    }
  }

  return `${hour}:${minutes} ${period}`;
}

//probs written kinda shit but oh well
export const getOpeningTimesArrays = (timesObj) => {
  const DAYS_OF_WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  let openingTimes = []

  let currentStart = "monday";
  let currentEnd = "monday";

  let dayOn;

  for (let i = 1; i < DAYS_OF_WEEK.length; i++) {
    dayOn = DAYS_OF_WEEK[i];

    if (timesObj[dayOn].open === timesObj[currentEnd].open
      && timesObj[dayOn].close === timesObj[currentEnd].close) {
      //do nothing extend;

    }
    else if (currentStart === currentEnd) {
      openingTimes.push(`${toTitleCase(currentEnd)}: ${convertTo12HourFormat(timesObj[currentEnd].open)}-${convertTo12HourFormat(timesObj[currentEnd].close)}`);
      currentStart = dayOn;
    } else {
      openingTimes.push(`${toTitleCase(currentStart)} - ${toTitleCase(currentEnd)}: ${convertTo12HourFormat(timesObj[currentEnd].open)}-${convertTo12HourFormat(timesObj[currentEnd].close)}`);
      currentStart = dayOn;
    }

    currentEnd = dayOn;
  }

  if (currentStart === dayOn) {
    openingTimes.push(`${toTitleCase(currentStart)}: ${convertTo12HourFormat(timesObj[currentStart].open)}-${convertTo12HourFormat(timesObj[currentStart].close)}`);
  } else {
    openingTimes.push(`${toTitleCase(currentStart)} - ${toTitleCase(currentEnd)}: ${convertTo12HourFormat(timesObj[currentEnd].open)}-${convertTo12HourFormat(timesObj[currentEnd].close)}`);

  }

  return openingTimes;
}