const dbKaryawan = require("../database/karyawan");

function fetchAll(req, res) {
  const data = dbKaryawan.fetchAll();
  res.send(data);
}

function fetchOne(req, res) {
  const id = +req.params.id;
  const selectedProduct = dbKaryawan.fetchOne(id);
  res.send(selectedProduct);
}

function create(req, res) {
  const data = dbKaryawan.fetchAll();
  const existingData = data.find(
    (d) => d.name == req.body.name && d.day == req.body.day
  );
  if (existingData) {
    res.status(400).send({message: "Karyawan ini sudah ada jadwal piket!"});
  } else {
    const body = req.body;
    const result = dbKaryawan.create(body);
    res.status(201).send(result);
  }
}

function update(req, res) {
  const id = req.params.id;
  const bodyData = req.body;
  const result = dbKaryawan.update(bodyData, id);
  res.send(result);
}

function destroy(req, res) {
  const id = req.params.id;
  dbKaryawan.destroy(id);
  res.sendStatus(204);
}

module.exports = {
  fetchAll,
  fetchOne,
  create,
  update,
  destroy,
};
