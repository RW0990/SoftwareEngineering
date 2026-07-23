const mongoose = require("mongoose");
const express = require("express");
const bandSite = require("./models/bandSite");
const site = express();

//use json in browser
site.use(express.json());
//making folder public
site.use(express.static("public"));
//use view engine
site.set("views", "./views");
site.set("view engine", "ejs");

//connection to Database
const DBURI =
  "mongodb+srv://whiteryan2599_db_user:2SlHwmD4V7ponOiE@bandapp.2dcjfoh.mongodb.net/BandApp";
mongoose.connect(DBURI);

//route
site.get("/", (request, response) => {
  bandSite
    .find()
    .sort({
      createdAt: -1,
    })
    .then((result) =>
      response.render("dashboard", {
        title: "Dashboard",
        bandSite: result,
      }),
    )
    .catch((error) => {
      console.log(error);
      response.status(500).send("Error loading dashboard");
    });
});

//events page
site.get("/events", async (request, response) => {
  try {
    const events = await bandSite.find().sort({ showDate: 1 });

    response.render("events", {
      title: "Events",
      events,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error loading events");
  }
});
//login page
site.get("/login", (request, response) => {
  response.render("login", {
    title: "Login",
  });
});

//register page
site.get("/register", (request, response) => {
  response.render("register", {
    title: "Register",
  });
});
//contact page
site.get("/contact", (request, response) => {
  response.render("contact", {
    title: "Contact",
  });
});
//merchandise page
site.get("/merchandise", (request, response) => {
  response.render("merchandise", {
    title: "Merchandise",
  });
});
//admin page
site.get("/admin", (request, response) => {
  response.render("admin", {
    title: "Admin",
  });
});
//cart page
site.get("/cart", (request, response) => {
  const cartItems = [];

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  response.render("cart", {
    title: "Cart",
    cartItems,
    cartTotal,
  });
});

//tickets page
site.get("/tickets", async (request, response) => {
  try {
    const events = await bandSite.find().sort({
      showDate: 1,
    });

    response.render("tickets", {
      title: "Tickets",
      events,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error loading tickets");
  }
});
//404 error page
site.use((request, response) => {
  response.status(404).render("404", {
    title: "Error",
    heading: "Page not found",
    message: "The page you are looking for does not exist.",
    status: 404,
  });
});

//setting up connection
console.log(DBURI);
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    site.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("MongoDB connection error: ", error));
