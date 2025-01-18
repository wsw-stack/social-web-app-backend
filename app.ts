import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from 'express-session'
import MongoStore from 'connect-mongo'

import userRoutes from './routes/userRoutes'
import sessionRoutes from './routes/sessionRoutes'
import postRoutes from './routes/postRoutes'
import cors from 'cors'

const app = express();

const sessionConfig = {
    secret: 'welcome to postit website!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        sameSite: "none" as "none",
        maxAge: 3*1000*24*3600,
    },
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://haitongyan2000:EgFeTE3CHvPoiu9u@cluster0.2h589.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 14 * 24 * 60 * 60, 
    })
}

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
  
app.use(cors(corsOptions));
app.use(session(sessionConfig))
app.use(bodyParser.json());

app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/posts', postRoutes)

mongoose
    .connect(
        "mongodb+srv://haitongyan2000:EgFeTE3CHvPoiu9u@cluster0.2h589.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Connection failed " + err));

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
