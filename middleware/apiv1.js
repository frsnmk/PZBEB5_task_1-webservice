const express = require("express");
const apicache = require("apicache");

const atkController = require("../controller/atk");
const karyawanController = require("../controller/karyawan");

const app = express();
const router = express.Router();

apicache.options({
  debug: true,
  defaultDuration: "1 hour",
  appendKey: ["query", "body"],
});

app.use(function (req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=3600");
  next();
});

router.get("/atk", cache(), atkController.fetchAll);

router.post("/atk", cache(), atkController.create);

router.get("/atk/:id", cache(), atkController.fetchOne);

router.put("/atk/:id", cache(), atkController.update);

router.delete("/atk/:id", cache(), atkController.destroy);

router.get("/karyawan", cache(), karyawanController.fetchAll);

router.post("/karyawan", cache(), karyawanController.create);

router.get("/karyawan/:id", cache(), karyawanController.fetchOne);

router.put("/karyawan/:id", cache(), karyawanController.update);

router.delete("/karyawan/:id", cache(), karyawanController.destroy);

module.exports = router;
