const express = require("express")
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const axios = require("axios")

const app = express()

let message = "This is a message"


const schema = buildSchema(`
    type Post{
        userId : ID
        id: Int
        title: String
        body: String
    }
    type User
    {
        name: String 
        age: Int
        college: String
    }

    type Query{
        hello: String!
        welcome(name: String, dayOfWeek: String!): String
        getUser: User
        getUsers: [User]
        getPostsFromExtrenelAPI: [Post]
    }
    input UserInput{
        name: String! 
        age: Int!
        college: String!
    }
    type Mutation{
        setMessage(newMessage: String): String
        createUser(user: UserInput): User
    }

`);

//createUser(name: String!, age: Int!, college: String!): User

const root = {
    hello: () => {
        return "Hello world!";
        //return null;
    },
    welcome: (args) => {
        console.log(args);
        return `Hey ${args.name}, hows Life, today is ${args.dayOfWeek}`;
    },
    getUser: () => {
        const user = {
            name : "Vinnu",
            age : 23,
            college : "VSM"
        };
        return user;
    },
    getUsers: ()=>{
        const users = [
            {
                name : "Potti",
                age : 21,
                college : "Nrayana"
            },
            {
                name : "Vinnu",
                age : 23,
                college : "VSM"
            },
        ];
        return users
    },
    getPostsFromExtrenelAPI: async() =>{
         const result = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        return result.data;
    },
    setMessage: ({newMessage}) =>{
        message = newMessage;
        return message;
    },
    message: () => message,

    createUser: (args) =>{
        // Creating user
        console.log(args)
        return args.user;
    }

}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
    })
);

app.listen(4000, () => console.log("Server on port 4000"))

