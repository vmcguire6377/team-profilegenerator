const Engineer = require('../lib/Engineer.js');

test('creates an engineer object', () => {
    const engineer = new Engineer('name');

    expect(engineer.name).toBe('name')
});