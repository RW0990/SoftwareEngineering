const express = require("express");
const mongoose = require("mongoose");
const bandSite = require("./SE PROJECT CODE");

//create app
const site = express();

//use json in browser
site.use(express.json());
//making folder public
site.use(express.static("public"));
//use view engine
site.set("view engine", ejs);

//connection to Database
const DatabaseURI =
  "mongodb+srv://whiteryan2599_db_user:2SlHwmD4V7ponOiE@bandapp.2dcjfoh.mongodb.net/";

mongoose
  .connect(DatabaseURI)
  .then((result) => application.listen(3000))
  .catch((error) => console.log(error));

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
    .catch((error) => console.log(error));
});

//events page
bandSite.get("/events", (request, repsonse) => {
  response.render("events", {
    title: "Events",
  });
});
//login page
bandSite.get("/login", (request, repsonse) => {
  response.render("login", {
    title: "Login",
  });
});
//contact page
bandSite.get("/contact", (request, repsonse) => {
  response.render("contact", {
    title: "Contact",
  });
});
//merchandise page
bandSite.get("/merchandise", (request, repsonse) => {
  response.render("merchandise", {
    title: "Merchandise",
  });
});
//admin page
bandSite.get("/admin", (request, repsonse) => {
  response.render("admin", {
    title: "Admin",
  });
});
//404 error page
bandSite.use((request, repsonse) => {
  response.status(404).render("404", {
    title: "Error",
  });
});
