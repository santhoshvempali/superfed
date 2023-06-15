require("dotenv").config();
const connection = require("./db");
const users = require("./routes/user");
const auth = require("./routes/login")
const express = require("express");
const app = express();


connection();
app.use(express.json());

app.use("/api/users",users)
app.use("/api/login",auth)
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
