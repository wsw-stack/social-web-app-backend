import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoutes from './routes/userRoutes'

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

app.use('/api/users', userRoutes);

mongoose
    .connect(
        "mongodb+srv://haitongyan2000:EgFeTE3CHvPoiu9u@cluster0.2h589.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Connection failed " + err));

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
