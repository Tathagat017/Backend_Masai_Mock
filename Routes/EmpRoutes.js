const express = require("express");
const mongoose = require("mongoose");
const { EmpModel } = require("../Model/EmployeeModel.js");
const EmpRouter = express.Router();
const {
  SearchFilterSortPaginationMiddleware,
} = require("../Middleware/SearchFilterSortPagination.js");
EmpRouter.post("/employees", async (req, res) => {
  try {
    let emp = await new EmpModel(req.body);
    emp.save();
    res.status(200).send({ messsage: "successfully added employee" });
  } catch (err) {
    res.status(500).send("Error in adding employee,please try again");
  }
});

EmpRouter.get(
  "/employees",
  SearchFilterSortPaginationMiddleware,
  async (req, res) => {
    try {
      let { query, sort, page, limit, skip } = req.new_query;
      console.log(query, sort, page, limit, skip);
      let all_emp = await EmpModel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      res
        .status(200)
        .send({ messsage: "successfully fetched employees", data: all_emp });
    } catch (err) {
      res.status(500).send("Error in fetching employees,please try again");
    }
  }
);

EmpRouter.patch(
  "/employees/:id",
  SearchFilterSortPaginationMiddleware,
  async (req, res) => {
    try {
      let { id } = req.params;

      let emp = await EmpModel.find({ _id: id });
      if (emp) {
        let newEmp = await EmpModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ message: "updated successfully", data: newEmp });
      }
    } catch (err) {
      res.status(500).send("Error in updating employees,please try again");
    }
  }
);

EmpRouter.delete(
  "/employees/:id",
  SearchFilterSortPaginationMiddleware,
  async (req, res) => {
    try {
      let { id } = req.params;

      let emp = await EmpModel.find({ _id: id });
      if (emp) {
        await EmpModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ message: "deleted successfully" });
      }
    } catch (err) {
      res.status(500).send("Error in deleting employees,please try again");
    }
  }
);

module.exports = { EmpRouter };
