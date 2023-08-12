import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { register, login, logout } from "./controllers/auth/login.js";
import auth from "./middleware/auth.js";
import { createGroups, renameGroups, addInGroups, removeFromGroups } from "./controllers/chat/group.js";
import { getUsers } from "./controllers/user/user.js";
import { accessChats, getChats } from "./controllers/chat/chat.js";
import { getMessages, createMessages } from "./controllers/messages/messages.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
    res.send("Hi");
})






app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);


app.get("/users", auth, getUsers);


app.get("/chats", auth, getChats);
app.post("/chats", auth, accessChats);

app.post("/groups", auth, createGroups);
app.patch("/groups", auth, renameGroups);
app.patch("/groupremove", auth, removeFromGroups);
app.patch("/groupadd", auth, addInGroups);


app.get("/messages/:chatId", auth, getMessages);
app.post("/messages", auth, createMessages);



app.listen(8080, function () {
    console.log('Server started on port 8080');
});