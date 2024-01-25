const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");
const { socialAuth } = require("./controllers/loginController");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/testing/firebase/auth", socialAuth);

app.use("/", (req, res) => res.send("Welcome..."));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
