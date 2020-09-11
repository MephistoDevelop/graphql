const uuid = require('uuid');
const { tasks, users } = require('../constatns');

module.exports = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id)
    },
    Mutation: {

    },
    User: {
        tasks: ({ id }) => tasks.filter(task => task.id === id)
    }
}