const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

//Connecting to MongoDB
connectDB();

//Validating json usage
app.use(express.json({ extended: false }));

app.get("/", function (req, res) {
  res.send("App Running");
});

//Defining the Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));

//Running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App runing on ${PORT}`));
