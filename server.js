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
    case "//page2.html":
      sitePath += "dashboard.html";
      response.statusCode = 200;
      break;
    case "Error.html":
      sitePath += "dashboard.html";
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
