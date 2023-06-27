import { admin, bucket } from "../firebase/firebase-config";
import toTitleCase from "./toTitleCase";


const USER_UUID = process.env.WEBSITE_UUID;

const getDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const EXPIRATION_SECS = 60 * 60 * 3; //3 hrs

const getSignedUrl = async (imagePath) => {
  const options = {
    action: "read",
    expires: Date.now() + EXPIRATION_SECS * 1000,
  };

  try {
    const [url] = await bucket.file(imagePath).getSignedUrl(options);
    //console.log("Signed URL:", url);
    return url;
  } catch (error) {
    //console.error("Error generating signed URL:", error);
    return null;
  }
};

export async function getWebsiteData() {
  const dataPromise = admin.firestore().collection("websites").doc(USER_UUID).get();
  const locationsPromise = await admin.firestore().collection("restaurants").doc(USER_UUID).collection("locations").get();

  const [dataDoc, locationSnapshot] = await Promise.all([dataPromise, locationsPromise]);

  const data = dataDoc.data();



  //now need to populate the images w/ signed urls + combine dataDoc and locationsDoc
  const signedData = getDeepCopy(data);


  if (data.logo) {
    const url = await getSignedUrl(data.logo)
    signedData.logo = url
  }


  await Promise.all(data.images.map(async (img, i) => {
    if (img) {
      const url = await getSignedUrl(img);
      signedData.images[i] = url;
    } else {
      signedData.images[i] = "";
    }
  }));


  await Promise.all(Object.keys(data.backgrounds).map(async (key) => {
    if (data.backgrounds[key]) {
      const url = await getSignedUrl(data.backgrounds[key]);
      signedData.backgrounds[key] = url;
    } else {
      signedData.backgrounds[key] = "";
    }
  }));

  /// need to make this async?????? (says not async tho idfk) ^#############################################

  //now build the location data
  signedData.deliveryOptions = [];
  signedData.pickupOptions = [];
  signedData.addresses = [];
  signedData.addresses = [];
  signedData.emails = [];
  signedData.delivery = false;
  signedData.pickup = false;

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
      area: location.location,
      address: location.address,
      phone: location.contactNumber,
      openingTimes: location.openingTimes,
    }
    signedData.addresses.push(address);


    //email
    signedData.emails.push(location.contactEmail)
  })


  //now build other general site info
  signedData.navOptions = []

  //menus (make this a function) at some point once added that to admin:
  signedData.navOptions.push({
    "name": "Menus",
    "url": "",
    "dropdownOptions": [
      {
        "name": "Menu 1",
        "url": "https://www.redbamboo-nyc.com/_files/ugd/9fbf96_5d1e8c36b35749288d5cba920b1c229d.pdf?index=true"
      },
      {
        "name": "Menu 2",
        "url": "https://www.redbamboo-nyc.com/_files/ugd/9fbf96_5d1e8c36b35749288d5cba920b1c229d.pdf?index=true"
      },
      {
        "name": "Menu 3",
        "url": "https://www.redbamboo-nyc.com/_files/ugd/9fbf96_5d1e8c36b35749288d5cba920b1c229d.pdf?index=true"
      }
    ]
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

  //always add these next two (FOR NOW)
  signedData.navOptions.push({
    "name": "Gift Cards",
    "url": "/giftcards",
    "dropdownOptions": []
  })

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