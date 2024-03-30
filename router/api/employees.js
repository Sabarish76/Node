const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const employeeController = require("../../controllers/EmployerController");

router.use(bodyParser.json());

router
  .route("/")
  .get(employeeController.getAllEmployee)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployeeById);

module.exports = router;
