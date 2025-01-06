document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get the form data

    fetch(this.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for your message!"); // Show success message
          // Optionally, you can reset the form
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
