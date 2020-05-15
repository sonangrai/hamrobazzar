const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
var cors = require("cors");

app.use(cors());

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
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/ads", require("./routes/api/ads"));
app.use("/api/comment", require("./routes/api/comment"));
app.use("/api/gallery", require("./routes/api/gallery"));

//Running the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App runing on ${PORT}`));
