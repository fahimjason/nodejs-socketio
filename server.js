const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Message = mongoose.model('message', {
    name: String,
    message: String
});

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post("/messages", (req, res) => {
    const message = new Message(req.body);

    message.save((err) => {
        if (err)
            sendStatus(500);

        io.emit(req.body);
        res.sendStatus(200);
    })
});

io.on("connection", () => {
    console.log('Connected')
});

mongoose.connect(process.env.MONGO_URI, (err) => {
    console.log('DB connected');
});

const server = http.listen(5000, () => {
    console.log("Server is listening on port", server.address().port);
});
