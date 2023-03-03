const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const apiv1 = require("./middleware/apiv1");
const errorHandler = require("./middleware/errorHandler");

const cookieSessionController = require("./controller/cookie-session");

const app = express();
const port = 3000;

let isAuthenticated = false;

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "session_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true},
  })
);

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

app.use("/get-cookie", cookieSessionController.getCookie);
app.use("/send-cookie", cookieSessionController.sendCookie);
app.use("/send-session", cookieSessionController.sendSession);

app.use("/apiv1", apiv1); // Middleware level route
app.use("/api", errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
