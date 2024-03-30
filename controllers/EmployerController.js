data = {
  employees: require("../model/employee.json"),
  SetEmployee: function (data) {
    this.employees = data;
  },
};

const getAllEmployee = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data?.employees?.length
      ? data.employees[data?.employees?.length - 1].id + 1
      : 1,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  };

  if (!newEmployee.firstName || !newEmployee.lastName) {
    res.status(400).json({ message: "fist name and last name required" });
  }
  data.SetEmployee([...data.employees, newEmployee]);
  res.status(200).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res
      .status(400)
      .json({ message: `the entered ${req.body.id} is not available` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const fillteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...fillteredArray, employee];
  data.SetEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res
      .status(400)
      .json({ message: `the entered ${req.body.id} is not available` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const fillteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.SetEmployee([...fillteredArray]);
  res.json(data.employees);
};

const getEmployeeById = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};





