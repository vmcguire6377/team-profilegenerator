const Manager = require('../lib/Manager.js');

test('creates a manager object', () => {
    const manager = new Manager('name');

    expect(manager.name).toBe('name')
});