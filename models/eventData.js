const mongoose = require("mongoose");
const shows = require("./bandSite.js");
const event = require("./events.js");

async function Connect() {
  await mongoose.connect(
    "mongodb+srv://whiteryan2599_db_user:2SlHwmD4V7ponOiE@bandapp.2dcjfoh.mongodb.net/BandApp",
  );
  await shows.deleteMany({});
  await shows.insertMany([
    {
      showTitle: "Rock Party 2026 Live",
      showDate: new Date("2026-08-14"),
      venue: "3Arena",
      location: "Dublin, Ireland",
      description: "The Greatest Rock Bands join together for one night!",
      price: 100,
    },
    {
      showTitle: "Electric Picnic 2026",
      showDate: new Date("2026-8-20"),
      venue: "Kilmainham",
      location: "Dublin, Ireland",
      description: "The biggest music music festival in Ireland!",
      price: 50,
    },
  ]);
  console.log("Shows displayed successfully");

  await event.deleteMany({});
  await event.insertMany([
    {
      showTitle: "Rock Party 2026 Live",
      showDate: new Date("2026-08-14"),
      venue: "3Arena",
      location: "Dublin, Ireland",
      description: "The Greatest Rock Bands join together for one night!",
      price: 100,
    },
    {
      showTitle: "Electric Picnic 2026",
      showDate: new Date("2026-8-20"),
      venue: "Kilmainham",
      location: "Dublin, Ireland",
      description: "The biggest music music festival in Ireland!",
      price: 50,
    },
    {
      showTitle: "Meet and greet with the band",
      showDate: new Date("2026-09-24"),
      venue: "Gibson Hotel",
      location: "Dublin, Ireland",
      description: "Meet the band!",
      price: 50,
    },
    {
      showTitle: "Acoustic Gig",
      showDate: new Date("2026-9-29"),
      venue: "Whelan's",
      location: "Dublin, Ireland",
      description: "Small acoustic session for our biggest fans!",
      price: 50,
    },
  ]);
  console.log("Events displayed successfully");
  await mongoose.disconnect();
}
Connect().catch((error) => {
  console.error("Error displaying shows/events:", error);
  process.exit(1);
});
