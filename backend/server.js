const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");
const { socialAuth } = require("./controllers/loginController");

const app = express();
const port = 3001;

app.use(cors());

app.post("/testing/firebase/auth", socialAuth);

app.use(middleware.decodeToken);
app.get("/api/todos", (req, res) => {
  return res.json({
    todos: [
      {
        title: "Task1",
      },
      {
        title: "Task2",
      },
      {
        title: "Task3",
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
