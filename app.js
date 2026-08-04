const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bandSite = require("./models/bandSite");
const Event = require("./models/events");
const User = require("./models/User");
const site = express();

//use json in browser
site.use(express.json());
site.use(express.urlencoded({ extended: true }));
//making folder public
site.use(express.static("public"));
//use view engine
site.set("views", "./views");
site.set("view engine", "ejs");

//sessioni
site.use(
  session({ secret: "segreto123", resave: false, saveUninitialized: false }),
);
site.use((request, response, next) => {
  response.locals.userEmail = request.session.userEmail || null;
  next();
});
//connection to Database
const DBURI =
  "mongodb+srv://whiteryan2599_db_user:2SlHwmD4V7ponOiE@bandapp.2dcjfoh.mongodb.net/BandApp";

//route
site.get("/", (request, response) => {
  let message = null;
  if (request.query.registered) {
    message = "Registration completed successfully!";
  } else if (request.query.login) {
    message = "Login successful!";
  }

  bandSite
    .find()
    .sort({ createdAt: -1 })
    .then((result) =>
      response.render("dashboard", {
        title: "Dashboard",
        bandSite: result,
        message,
        eventName: "Rock Shock Party",
        eventDate: "15 OCTOBER 2026",
        eventLocation: "DUBLIN",
        eventId: 1,
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
    const events = await Event.find().sort({ showDate: 1 });
    response.render("events", { title: "Events", events });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error loading events");
  }
});

//login page
site.get("/login", (request, response) => {
  response.render("login", { title: "Login", error: null });
});

//login submit
site.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return response.render("login", {
      title: "Login",
      error: "Email or password incorrect",
    });
  }

  request.session.userId = user._id;
  request.session.userEmail = user.email; //
  response.redirect("/?login=true");
});

//register page
site.get("/register", (request, response) => {
  response.render("register", { title: "Register", error: null });
});

//register submit
site.post("/register", async (request, response) => {
  const { firstName, lastName, address, email, password } = request.body;

  const newUser = new User({ firstName, lastName, address, email, password });
  await newUser.save();

  request.session.userId = newUser._id;
  response.redirect("/?registered=true");
});

//logout
site.get("/logout", (request, response) => {
  request.session.destroy(() => response.redirect("/login"));
});

//contact page
site.get("/contact", (request, response) => {
  response.render("contact", { title: "Contact" });
});

//merchandise page
site.get("/merchandise", (request, response) => {
  response.render("merchandise", { title: "Merchandise" });
});

//admin page
site.get("/admin", (request, response) => {
  response.render("admin", { title: "Admin" });
});
//checkout page
site.get("/checkout", (request, response) => {
  response.render("checkout", { title: "Checkout" });
});

//cart page
site.get("/cart", (request, response) => {
  const cartItems = [];
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
  response.render("cart", { title: "Cart", cartItems, cartTotal });
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
    site.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} - run http://localhost:${PORT}/ in your browser`,
      ),
    );
  })
  .catch((error) => console.log("MongoDB connection error: ", error));
