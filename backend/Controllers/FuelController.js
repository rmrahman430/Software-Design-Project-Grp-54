// backend\Controllers\FuelController.js
let fuelQuotes = [];

const submitFuelQuote = (req, res) => {
  fuelQuotes.push(req.body);
  res.status(201).send({ message: "Fuel quote submitted successfully" });
};

const fetchFuelQuoteHistory = (req, res) => {
  res.status(200).json(fuelQuotes);
};

module.exports = {
  submitFuelQuote,
  fetchFuelQuoteHistory
};
