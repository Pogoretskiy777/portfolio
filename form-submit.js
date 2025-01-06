document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get the form data
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    console.log("Sending form data:", formObject); // Log the form data to verify

    fetch("https://pogoretskiy.netlify.app/.netlify/functions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Form submitted successfully!") {
          alert("Thank you for your message!");
          this.reset();
        } else {
          alert("There was an error submitting your form. Please try again later.");
        }
      })
      .catch((error) => {
        alert("There was an error submitting your form. Please try again later.");
        console.error("Error:", error);
      });
  });
});
