const mongoose = require("mongoose");

mongoose
  .connect(DatabaseURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log("MongoDB connection error: ", error));

javascriptapp.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    eventName: "Rock Shock Party",
    eventDate: "15 OCTOBER 2026",
    eventLocation: "DUBLIN",
    eventId: 1,
  });
});
