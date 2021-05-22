const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    const employee = new Employee('name');

    expect(employee.name).toBe('name')
});
