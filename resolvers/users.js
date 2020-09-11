const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { tasks, users } = require('../constatns');
const bcrypt = require('bcryptjs');
const User = require('../database/models/user');

module.exports = {
    Query: {
        users: (_, { id }, { randomNumber }) => {
            console.log("My random: ", randomNumber, id);
            return users;
        },
        user: (_, { id }, { randomNumber }) => {
            console.log("My random: ", randomNumber);
            return users.find(user => user.id === id)
        }
    },
    Mutation: {
        signup: async(_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email })
                if (user) {
                    throw new Error('Email is Already on Use');
                }
                const hashedPassword = await bcrypt.hash(input.password, 12);
                const newUser = new User({...input, password: hashedPassword });
                const result = await newUser.save();
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        login: async(_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });

                if (!user) {
                    throw new Error('User not found...');
                }

                const isPasswordValid = await bcrypt.compare(input.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Incorrect Password...');
                }

                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
                const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' });
                return { token };

            } catch (error) {
                console.log(error)
                throw error;
            }
        }
    },
    User: {
        tasks: ({ id }) => tasks.filter(task => task.id === id)
    }
}