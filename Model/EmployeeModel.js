const mongoose = require("mongoose");
const jobs = ["Tech", "Marketing", "Operations"];
const Schema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, enum: jobs, required: true },
  salary: { type: Number, required: true },
});

const EmpModel = mongoose.model("employee", Schema);

module.exports = { EmpModel };
