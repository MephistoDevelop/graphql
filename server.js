const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const uuid = require('uuid')
const resolvers = require('./resolvers/index')
const typeDefs = require('./typeDefs')
const { connection } = require('./database/util')

//set env variables
dotEnv.config();
const app = express();

connection();
///Use the cors variable
app.use(cors());

//Body parser Middleware
app.use(express.json());

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