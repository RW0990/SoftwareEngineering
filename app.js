const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bandSite = require("./models/bandSite");
const Event = require("./models/events");
const User = require("./models/User");
const Contact = require("./models/contact");
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

site.post("/contact", (request, response, next) => {
  console.log("POST /contact reached");
  next();
});

//contact page
site.get("/contact", (request, response) => {
  response.render("contact", { title: "Contact", success: request.query.success === "true", error: "", name: "", email: "", message: ""});
});
//submut contact form
site.post("/contact", async (request, response) => {
  try {
    //get name, email and message from the form
    const { name, email, message } = request.body;
    
    // if any of the fields are empty, return an error message
    if (!name || !email || !message) {
      return response.status(400).render("contact", {
        success: false,
        error: "Please complete all fields.",
        name: name || "",
        email: email || "",
        message: message || "",
      });
    }
    //create a new contact and save it to the database
    const newContact = new Contact({
      name,
      email,
      message,
    });
    //save
    await newContact.save();

    //redirect to contact page with success message
    response.redirect("/contact?success=true");
    //if there is no success, show an error message
  } catch (error) {
    console.error("Contact form error:", error);

    //keep contact page open with the error message 
    response.status(500).render("contact", {
      success: false,
      error: "Your message could not be sent. Please try again.",
      name: request.body.name || "",
      email: request.body.email || "",
      message: request.body.message || "",
    });
  }
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
  response.render("checkout", { title: "Checkout", error: null });
});

//checkout submit
site.post("/checkout", (request, response) => {
  const { firstName, lastName, address, email, cardNumber, cvv, expiryDate } =
    request.body;

  if (
    !firstName ||
    !lastName ||
    !address ||
    !email ||
    !cardNumber ||
    !cvv ||
    !expiryDate
  ) {
    return response.render("checkout", {
      title: "Checkout",
      error: "Please fill in all fields",
    });
  }

  // cart empty after order completed
  request.session.cart = [];

  response.redirect("/orderplaced");
});

site.get("/orderplaced", (request, response) => {
  response.render("orderplaced", { title: "Order Placed", error: null });
});

//add to cart
site.post("/cart/add", (request, response) => {
  const { id, name, price, type, image } = request.body;

  if (!request.session.cart) {
    request.session.cart = [];
  }

  const existingItem = request.session.cart.find(
    (item) => item.id === id && item.type === type,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    request.session.cart.push({
      id,
      name,
      price: parseFloat(price),
      type,
      image,
      quantity: 1,
    });
  }

  response.redirect("/cart");
});

//remove from cart
site.post("/cart/remove", (request, response) => {
  const { id, type } = request.body;

  if (request.session.cart) {
    request.session.cart = request.session.cart.filter(
      (item) => !(item.id === id && item.type === type),
    );
  }

  response.redirect("/cart");
});

//cart page
site.get("/cart", (request, response) => {
  const cartItems = request.session.cart || [];
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  response.render("cart", { title: "Cart", cartItems, cartTotal });
});


//setting up connection
if (require.main === module) {
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
}
module.exports = { app: site };

//404 error page
site.use((request, response) => {
  response.status(404).render("404", {
    title: "Error",
    heading: "Page not found",
    message: "The page you are looking for does not exist.",
    status: 404,
  });
});
