import express from "express";
const app = express();
const apiRouter = require("./routes/apiRouter.js");
const PORT = 3000;

app.use("/api", apiRouter);

// // 404 Page
// app.use((_, res) => {
//   res.status(404).send("404 Error!");
// });

// .listen starts the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
