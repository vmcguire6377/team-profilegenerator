const Intern = require('../lib/Intern.js');

test('creates an intern object', () => {
    const intern = new Intern('name');

    expect(intern.name).toBe('name')
});