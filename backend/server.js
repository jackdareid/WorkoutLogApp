const app = require("./app");
const config = require("./config");

app.listen(config.server.port, () => {
  console.log(`Server listening at http://localhost:${config.server.port}`);
});
