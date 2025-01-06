const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  const formData = req.body;

  // Verify form data
  console.log("Received form data:", formData);

  try {
    // Send form data to Formspree
    const response = await axios.post("https://formspree.io/f/mdoqyjnj", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      res.status(200).send({ message: "Form submitted successfully!" });
    } else {
      res.status(500).send({ message: "There was an issue submitting the form." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ message: "There was an error submitting your form. Please try again later." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
