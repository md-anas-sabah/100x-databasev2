const db = require("./models/index.js");

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Got connected to database.");
  } catch (error) {
    console.log("Error in connecting to database: ", error);
  } finally {
    await db.sequelize.close();
  }
})();
