<<<<<<< HEAD
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
=======
//setting up connection
mongoose
  .connect(DatabaseURI)
  .then(() => {
    console.log("Connected to MongoDB");
    append.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => console.log("MongoDB connection error: ", error));
>>>>>>> 1c416085697ec3dfcde667d647f4433cab78d5aa
