const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log("New request made");
  console.log(`Host: ${req.hostname}`);
  console.log(`Path: ${req.path}`);
  console.log(`Method: ${req.method}`);
  next();
});

app.get("/", (_, res) => {
  res.send("Perhaps the homepage?!");
});

app.get("/sign-up", (_, res) => {
  res.send("Yeah sign up");
});

app.get("/sign-in", (_, res) => {
  res.send("Yeah sign in");
});

app.get("/profile", (_, res) => {
  res.send("Yeah check your profile");
});

app.get("/track", (_, res) => {
  res.send("Tracking Beginning");
});

app.get("/create/program", (_, res) => {
  res.send("Create that program");
});

app.get("/create/workout", (_, res) => {
  res.send("Create that workout");
});

// 404 Page
app.use((_, res) => {
  res.status(404).send("404 Error!");
});

// .listen starts the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
