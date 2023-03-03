const dbAtk = require("../database/atk");

function fetchAll(req, res) {
  const data = dbAtk.fetchAll();
  res.send(data);
}

function fetchOne(req, res) {
  const id = +req.params.id;
  const selectedProduct = dbAtk.fetchOne(id);
  res.send(selectedProduct);
}

function create(req, res) {
  const body = req.body;
  const result = dbAtk.create(body);
  res.status(201).send(result);
}

function update(req, res) {
  const id = req.params.id;
  const bodyData = req.body;
  const result = dbAtk.update(bodyData, id);
  res.send(result);
}

function destroy(req, res) {
  const id = req.params.id;
  dbAtk.destroy(id);
  res.sendStatus(204);
}

module.exports = {
  fetchAll,
  fetchOne,
  create,
  update,
  destroy,
};
