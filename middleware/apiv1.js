const express = require("express");
const apicache = require("apicache");

const atkController = require("../controller/atk");
const karyawanController = require("../controller/karyawan");

const app = express();
const router = express.Router();

const cache = apicache.middleware;

apicache.options({
  debug: true,
  defaultDuration: "1 hour",
  appendKey: ["query", "body"],
});

app.use(function (req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=3600");
  next();
});

router.get("/atk", atkController.fetchAll);

router.post("/atk", atkController.create);

router.get("/atk/:id", atkController.fetchOne);

router.put("/atk/:id", atkController.update);

router.delete("/atk/:id", atkController.destroy);

router.get("/karyawan", karyawanController.fetchAll);

router.post("/karyawan", karyawanController.create);

router.get("/karyawan/:id", karyawanController.fetchOne);

router.put("/karyawan/:id", karyawanController.update);

router.delete("/karyawan/:id", karyawanController.destroy);

module.exports = router;
