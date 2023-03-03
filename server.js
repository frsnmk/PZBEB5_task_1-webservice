const express = require("express");
const cors = require("cors");

const apiv1 = require("./middleware/apiv1");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 3000;

let isAuthenticated = true;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/login", (req, res) => {
  isAuthenticated = true;
  res.send({message: "Kamu berhasil login"});
});
app.use("/logout", (req, res) => {
  isAuthenticated = false;
  res.send({message: "Kamu berhasil logout"});
});

// Middleware authentication
app.use((req, res, next) => {
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthenticated");
  }
});
app.use("/apiv1", apiv1); // Middleware level route
app.use("/api", errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
