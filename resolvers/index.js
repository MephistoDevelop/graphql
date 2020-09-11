const { GraphQLDateTime } = require('graphql-iso-date');

const userResolver = require('./users');
const tasksResolver = require('./tasks');

const customDateScalarResolver = {
    Date: GraphQLDateTime
}
module.exports = [userResolver, tasksResolver, customDateScalarResolver];