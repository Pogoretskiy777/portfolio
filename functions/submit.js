const axios = require("axios");

exports.handler = async function (event, context) {
  // Check if the method is POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // Parse incoming form data (JSON body)
  const formData = JSON.parse(event.body);

  // Log the form data to verify it is being received correctly
  console.log("Received form data:", formData);

  try {
    // Send form data to Formspree
    const response = await axios.post("https://formspree.io/f/mdoqyjnj", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If successful, return a success response
    if (response.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Form submitted successfully!" }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "There was an issue submitting the form." }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "There was an error submitting your form. Please try again later.",
      }),
    };
  }
};
