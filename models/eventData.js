const mongoose = require("mongoose");
const shows = require("./bandSite.js");

async function getShows() {
  await mongoose.connect(
    "mongodb+srv://whiteryan2599_db_user:2SlHwmD4V7ponOiE@bandapp.2dcjfoh.mongodb.net/BandApp",
  );
  await shows.deleteMany({});
  await shows.insertMany([
    {
      showTitle: "Rock Party 2026 Live",
      showDate: new Date("2026-08-24"),
      venue: "3Arena",
      location: "Dublin, Ireland",
      description: "The Greatest Rock Bands join together for one night!",
      price: 100,
    },
    {
      showTitle: "Electric Picnic 2026",
      showDate: new Date("2026-6-2"),
      venue: "Kilmainham",
      location: "Dublin, Ireland",
      description: "The biggest music music festival in Ireland!",
      price: 150,
    },
  ]);
  console.log("Shows displayed successfully");
  await mongoose.disconnect();
}
getShows().catch((error) => {
  console.error("Error displaying shows:", error);
  process.exit(1);
});
