const http = require("http");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const { response } = require("express");

const server = http.createServer((request, response) => {
  console.log(`${request.url}${request.method}`);

  response.setHeader("Content-type", "text/html");

  let sitePath = "./";
  switch (request.url) {
    case "/":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;
    case "//events.html":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;
    case "//login.html":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;
    case "//merchandise.html":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;
    case "//contact.html":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;

    case "/tickets.html":
      sitePath += "tickets.html";
      response.statusCode = 200;
      break;

    case "/cart.html":
      sitePath += "cart.html";
      response.statusCode = 200;
      break;
    default:
      sitePath += "Error.html";
      response.statusCode = 404;
      break;
  }
  fs.readFile(sitePath, (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      response.end(data);
    }
  });
});
server.listen(5500, "localhost", () => {
  console.log("Server running....");
});
