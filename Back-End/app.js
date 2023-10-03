const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks); //root route

app.use(notFound);

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL); //.env variable
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
