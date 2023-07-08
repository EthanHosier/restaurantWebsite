"use client";
import { useState } from 'react';


const Form = ({ DATA }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form submission logic goes here
      console.log('Form submitted:', formData);

      const foundLocation = DATA.addresses.find(obj => obj.locationId === formData.location);

      console.log(foundLocation.email)

      fetch('https://us-central1-management-restaurants.cloudfunctions.net/api/bookings/handleContactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': "willybum"
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          surname: formData.lastName,
          emailFrom: formData.email,
          emailTo: foundLocation.email,
          message: formData.message,
        })
      })

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        message: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!data.location.trim()) {
      errors.location = 'Location is required';
    }
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  return (
    <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
      <div className="flex mb-4">
        <div className="w-1/2 mr-1">
          <label className="block text-tprimary text-sm  mb-2" htmlFor="firstName">
            First Name <span className='text-red-500'>*</span>
          </label>
          <input
            className={`appearance-none border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
        </div>
        <div className="w-1/2 ml-1">
          <label className="block text-tprimary text-sm  mb-2" htmlFor="lastName">
            Last Name <span className='text-red-500'>*</span>
          </label>
          <input
            className={`appearance-none border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-tprimary text-sm  mb-2" htmlFor="email">
          Email <span className='text-red-500'>*</span>
        </label>
        <input
          className={`appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-tprimary text-sm  mb-2" htmlFor="location">
          Restaurant Location <span className='text-red-500'>*</span>
        </label>
        <select
          className={`appearance-none border ${errors.location ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Select a location</option>
          {DATA.addresses.map((address) => (
            <option key={address.locationId} value={address.locationId}>
              {address.name + ", " + address.area}
            </option>
          ))}
        </select>
        {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-tprimary text-sm  mb-2" htmlFor="message">
          Message <span className='text-red-500'>*</span>
        </label>
        <textarea
          className={`appearance-none border ${errors.message ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-accent text-ttertiary py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;