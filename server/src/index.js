require("dotenv").config("./.env");
const app = require("./app");
const connectDb = require("./db");

const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
