require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/api");
mongoose.connect("mongodb+srv://bkrajor:Bk.190196@cluster0.bn0kl.mongodb.net/honeysysAdminPanel",
    { useNewUrlParser: true })
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err.message))
app.use("/", routes);
app.listen(port, () => {
    console.log("listening on http://localhost:" + port);
});
