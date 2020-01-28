const app = require("./app");
const env = app.get("env");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port} in ${env} mode`);
});
