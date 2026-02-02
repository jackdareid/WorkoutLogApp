const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Specify what type of response you are sending
  res.setHeader("Content-Type", "text/html");

  let path = "";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // Give the response content by reading an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

const PORT = 8000;

server.listen(PORT, "localhost", () => {
  console.log(`Server Initialized. Listening on port ${PORT}`);
});
