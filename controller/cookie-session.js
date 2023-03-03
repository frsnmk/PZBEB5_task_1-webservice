const getCookie = (req, res) => {
  res.send(req.cookies);
};

const sendCookie = (req, res) => {
  const data = req.query;
  res.cookie("data_hp", data);
  res.send(data);
};

const sendSession = (req, res) => {
  const data = req.query;
  req.session.bootcamp_data = data;
  res.send(req.session);
};

module.exports = {
  getCookie,
  sendCookie,
  sendSession,
};
