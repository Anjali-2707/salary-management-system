const app = require("./app");
const initializeDatabase = require("./database/init");

const PORT = 3000;

initializeDatabase();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});