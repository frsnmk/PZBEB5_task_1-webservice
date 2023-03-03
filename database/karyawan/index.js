const fs = require("fs");
const path = require("path");

const karyawanDbPath = path.resolve(__dirname, "./karyawan.json");

const fetchAll = () => {
  const data = fs.readFileSync(karyawanDbPath);
  return JSON.parse(data);
};

const fetchOne = (id) => {
  const data = fetchAll();
  return data.find((d) => d.id === id);
};

const create = (bodyData) => {
  const data = fetchAll();
  const atk = {
    id: Date.now(),
    ...bodyData,
  };
  data.push(atk);
  fs.writeFileSync(karyawanDbPath, JSON.stringify(data));
  return bodyData;
};

function update(bodyData, id) {
  let data = fetchOne(id);
  data = {
    ...data,
    id: +id,
    code: bodyData.code,
    name: bodyData.name,
    color: bodyData.color,
    qty: bodyData.qty,
  };
  const allData = fetchAll();
  const index = allData.findIndex((d) => d.id == id);
  if (!data && !index) throw new Error("Data tidak ditemukan");
  allData[index] = data;
  fs.writeFileSync(karyawanDbPath, JSON.stringify(allData));
  return data;
}

function destroy(id) {
  const data = fetchAll();
  const updatedData = data.filter((d) => d.id != id);
  fs.writeFileSync(karyawanDbPath, JSON.stringify(updatedData));
}

module.exports = {
  fetchAll,
  fetchOne,
  create,
  update,
  destroy,
};
