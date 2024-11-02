const express = require("express"); // cmnt
const bodyParser = require("body-parser");
const env = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
import path from "path";

const MovieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
const showRoutes = require("./routes/show.routes");
const paymentRoutes = require("./routes/payment.routes");

env.config();
const app = express(); // express app object

app.use(cors());

// configuring body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("frontend_dist"));

mongoose.set("debug", true);

MovieRoutes(app); // invoking movie routes
theatreRoutes(app); // invoking theatre routes
authRoutes(app); // invoking auth routes
userRoutes(app); // invoking user routes
bookingRoutes(app); // invoking booking routes
showRoutes(app); // invoking show routes
paymentRoutes(app); // invoking payment routes

// Fallback route to serve React app's index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend_dist", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Home");
// });

app.listen(process.env.PORT, async () => {
  // this callback gets executed, once we successfully start the server on the given port
  console.log(`Server started on Port ${process.env.PORT} !!`);

  try {
    mongoose.connect(process.env.PROD_DB_URL);
  } catch (error) {
    console.log("Not able to connect mongo", error);
  }
});
