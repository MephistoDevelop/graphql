const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const { tasks, users } = require('./constatns')

//set env variables
dotEnv.config();
const app = express();
///Use the cors variable

app.use(cors());
//Body parser Middleware
app.use(express.json());

const typeDefs = gql `
    type Query {
        greetings:String
        tasks:[Task!]
        task(id: ID!): Task
        users: [User!]
        user(id: ID!): User
    }

    type User {
        id:ID!
        name:String!
        email:String!
        tasks:[Task!]
    }

    type Task {
        id:ID!
        name:String!
        completed:Boolean!
        user:User!
    }
`;

const resolvers = {
    Query: {
        greetings: () => "Hello World MephistoDevelops",
        tasks: () => tasks,
        task: (_, { id }) => tasks.find(task => task.id === id),
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id)

    },
    Task: {
        user: ({ userId }) => users.find(user => user.id === userId)
    },
    User: {
        tasks: ({ id }) => tasks.filter(task => task.id === id)
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.PORT || 3000;

app.use((req, res, next) => {
    res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

app.listen(PORT, () => {
    console.log(`Im listening the server on PORT ${ PORT }`);
})