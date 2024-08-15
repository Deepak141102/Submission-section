"use client"; // This ensures that the component runs on the client side
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications

const Section = () => {
  // State to hold form values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    ccEmails: [], // Stores additional email addresses (CC)
    startingRow: "",
    endingRow: "",
    file: null, // Stores the uploaded file
  });

  // State to hold errors for each form field
  const [errors, setErrors] = useState({});

  // State to track which fields have been interacted with
  const [touchedFields, setTouchedFields] = useState({});

  // State to track the current field with an error
  const [currentError, setCurrentError] = useState(null);

  // State to hold the current input for CC emails
  const [currentCcEmail, setCurrentCcEmail] = useState("");

  // State to indicate if the form is being submitted (loading state)
  const [loading, setLoading] = useState(false);

  // State to hold the file name after a file is selected
  const [fileName, setFileName] = useState("");

  // Reference to the hidden file input element
  const fileInputRef = useRef(null);

  // Validation functions for each field
  const validators = {
    email: (value) => {
      if (!value) return "Field required"; // Check if the field is empty
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Check if it's a valid email
        ? ""
        : "Invalid email address";
    },
    password: (value) => {
      if (!value) return "Field required"; // Check if the field is empty
      return value.length >= 6 ? "" : "Password must be at least 6 characters";
    },
    ccEmail: (value) => {
      if (!value) return "Field required"; // Check if the field is empty
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Check if it's a valid email
        ? ""
        : "Invalid CC Email address";
    },
    startingRow: (value) => {
      if (!value) return "Field required"; // Check if the field is empty
      return !isNaN(value) ? "" : "Starting row must be a number"; // Check if it's a number
    },
    endingRow: (value) => {
      if (!value) return "Field required"; // Check if the field is empty
      return !isNaN(value) ? "" : "Ending row must be a number"; // Check if it's a number
    },
  };

  // Update the current CC email input value
  const handleCcEmailChange = (e) => setCurrentCcEmail(e.target.value);

  // Handle adding a new CC email when Enter or comma is pressed
  const handleCcEmailKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission
      const email = currentCcEmail.trim(); // Remove whitespace
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFormValues((prevValues) => ({
          ...prevValues,
          ccEmails: [...prevValues.ccEmails, email], // Add email to the list
        }));
        setCurrentCcEmail(""); // Clear the input
      }
    }
  };

  // Handle removing a CC email
  const handleRemoveCcEmail = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ccEmails: prevValues.ccEmails.filter((_, i) => i !== index), // Remove the email by index
    }));
  };

  // Update the corresponding form field value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the value for the specific field
    }));

    // Clear any existing error for this field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Clear the current error if the field is being interacted with
    if (currentError === name) {
      setCurrentError(null);
    }
  };

  // Handle when a field loses focus (blur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validate = validators[name];
    const error = validate ? validate(value) : "";

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Mark the field as touched
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    // Set the current error field if there's an error
    if (error) {
      setCurrentError(name);
    }
  };

  // Handle custom file input button click
  const handleCustomFileClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormValues((prevValues) => ({
        ...prevValues,
        file: file, // Update the file in state
      }));
      setFileName(file.name); // Update the file name
    } else {
      setFileName(""); // Clear the file name if no file is selected
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    const validationErrors = {};
    // Validate all fields
    Object.keys(formValues).forEach((key) => {
      if (validators[key]) {
        const error = validators[key](formValues[key]);
        if (error) validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show validation errors

      // Automatically focus the first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      setCurrentError(firstErrorField);
    } else {
      setLoading(true); // Show loading state

      // Simulate form submission (e.g., sending data to an API)
      setTimeout(() => {
        // Reset form values after submission
        setFormValues({
          email: "",
          password: "",
          ccEmails: [],
          startingRow: "",
          endingRow: "",
          file: null,
        });
        setFileName(""); // Clear the file name
        setErrors({}); // Clear errors
        setTouchedFields({}); // Clear touched fields
        setCurrentError(null); // Clear current error

        setLoading(false); // Hide loading state

        // Show success message
        toast.success("Your form has been submitted!");
      }, 2000); // Simulate a 2-second delay for submission
    }
  };
  return (
    <>
    <div className="w-full h-[78.5vh] bg-bg-img bg-no-repeat bg-cover flex justify-center items-center">
      <div className="w-1/2 xl:w-[36vw] h-auto bg-white flex justify-center flex-col items-center rounded-lg pb-2 shadow-[0_0_10px_rgba(0,_0,_0,_0.5)] max-md:w-1/2">
        <form onSubmit={handleSubmit} className="w-11/12">
          {/* Email Input with Icon */}
          <div className="relative mb-3">
            <img
              src="/images/mail.svg"
              alt="Mail Icon"
              className="relative left-2 top-10 transform -translate-y-1/2"
              width="17"
            />
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`border-[2px] ${
                errors.email && currentError === "email"
                  ? "border-red-500"
                  : "border-gray-300"
              } w-full h-11 pl-10 pr-4 rounded-[5px]`}
              placeholder="Email id"
            />
            {errors.email && currentError === "email" && (
              <p className="text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input with Icon */}
          <div className="relative mt-4">
            <img
              src="/images/lock.svg"
              alt="Lock Icon"
              className="absolute left-2 top-6 transform -translate-y-1/2"
              width="17"
            />
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`border-[2px] ${
                errors.password && currentError === "password"
                  ? "border-red-500"
                  : "border-gray-300"
              } w-full h-11 pl-10 pr-4 rounded-[5px]`}
              placeholder="Password"
            />
            {errors.password && currentError === "password" && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <img
              src="/images/mark.svg"
              alt="Lock Icon"
              className="absolute right-2 top-6 transform -translate-y-1/2"
              width="17"
            />
          </div>

          {/* Add CC Email Input */}
          <div className="relative mt-4">
            <div className="flex flex-wrap items-center border-2 border-gray-300 rounded-md bg-gray-50">
              {formValues.ccEmails.map((ccEmail, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                >
                  <span className="text-sm text-gray-700">{ccEmail}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCcEmail(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={currentCcEmail}
                onChange={handleCcEmailChange}
                onKeyDown={handleCcEmailKeyDown}
                placeholder="Add CC Email"
                className="flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-11 pl-3 pr-4 rounded-[5px]"
              />
            </div>
            {errors.ccEmail && currentError === "ccEmail" && (
              <p className="text-red-500 mt-1 text-sm">{errors.ccEmail}</p>
            )}
          </div>

          {/* Starting Row Input with Icon */}
          <div className="relative mt-4">
            <img
              src="/images/list.svg"
              alt="List Icon"
              className="absolute left-2 top-6 transform -translate-y-1/2"
              width="17"
            />
            <input
              type="number"
              name="startingRow"
              value={formValues.startingRow}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`border-[2px] ${
                errors.startingRow && currentError === "startingRow"
                  ? "border-red-500"
                  : "border-gray-300"
              } w-full h-11 pl-10 pr-4 rounded-[5px]`}
              placeholder="Starting Row"
            />
            {errors.startingRow && currentError === "startingRow" && (
              <p className="text-red-500">{errors.startingRow}</p>
            )}
          </div>

          {/* Ending Row Input with Icon */}
          <div className="relative mt-4">
            <img
              src="/images/list.svg"
              alt="List Icon"
              className="absolute left-2 top-6 transform -translate-y-1/2"
              width="17"
            />
            <input
              type="number"
              name="endingRow"
              value={formValues.endingRow}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`border-[2px] ${
                errors.endingRow && currentError === "endingRow"
                  ? "border-red-500"
                  : "border-gray-300"
              } w-full h-11 pl-10 pr-4 rounded-[5px]`}
              placeholder="Ending Row"
            />
            {errors.endingRow && currentError === "endingRow" && (
              <p className="text-red-500">{errors.endingRow}</p>
            )}
          </div>

          {/* File Upload Section */}
          <div className="relative mt-4">
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex items-center justify-center">
              {fileName && <p className="mr-4 text-gray-700">{fileName}</p>}
              <button
                type="button"
                onClick={handleCustomFileClick}
                className="w-1/5 h-11 max-md:w-2/4 border- py-2 border-gray-300 rounded-[10px] bg-[#1976d2] text-white"
              >
                Upload file
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-5 flex justify-center items-center pb-6">
            <button
              type="submit"
              className="w-[88.8%] h-11 border-[2px] text-center flex items-center justify-center rounded-[6px] bg-[#1976d2] text-white hover:bg-[#145ca4] cursor-pointer transition-colors duration-100 font-normal"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
          <ToastContainer /> {/* Toastify container */}
</>
  );
};

export default Section;
