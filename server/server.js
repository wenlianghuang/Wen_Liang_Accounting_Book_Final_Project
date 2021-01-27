/*let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
*/
import dotenv_default from 'dotenv-defaults';

//import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import express from 'express';
const app = express();
//import cors from 'cors';
//import bodyParser from 'body-parser';
//import database from './database/db.js';
//import userRoute from './routes/user_routes.js';
import {GraphQLServer,PubSub} from 'graphql-yoga'; 
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import db from './database/db.js'
import cors from 'cors';
dotenv_default.config({path: "../.env"});//The path in the root folder and find the ".env" file.It seems that the version of nvm 12 is can't work, only version v14 can woark

                                         


const __dirname = path.resolve(path.dirname(''));                            
const buildPath = path.join(__dirname, '..', 'build');
console.log('buildPath: ',buildPath);
app.use(cors());
let localURL = "MONGO_URL=mongodb://WenLiangHuang:matt042275@cluster0-shard-00-00.l1lzq.mongodb.net:27017,cluster0-shard-00-01.l1lzq.mongodb.net:27017,cluster0-shard-00-02.l1lzq.mongodb.net:27017/final_project?ssl=true&replicaSet=atlas-10rnel-shard-0&authSource=admin&retryWrites=true&w=majority"
const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context: {
        db,
        pubsub
    }

})
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URL,dbOptions)
    .then(res => {
        console.log('mongo db connection created')
    })

const mongodatabase = mongoose.connection;

mongodatabase.on("error", (error) => {
    console.error(error);
  });
console.log("Path join 2: ",path.join(buildPath,'index.html'));
//app.use(express.static(buildPath));
server.express.use(express.static(buildPath));
server.express.get("*",(req,res)=>{
    res.sendFile(path.join(buildPath,'index.html'))})
/*app.get("*",function(req,res){
    res.sendFile(path.join(buildPath,'index.html'))
})*/
const port = process.env.PORT || 5000;
mongodatabase.once("open", () => {
    console.log("MongoDB connected!");
  
    server.start({port: port},()=>{
      console.log(`The server is port ${port}`);
    });
  });


