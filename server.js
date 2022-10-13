const express = require("express");

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const messages = [
  { name: "John", message: "Hello" },
  { name: "Doe", message: "Hi" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
    console.log(req.body);
  });

const server = app.listen(5000, () => {
  console.log("Server is listening on port", server.address().port);
});
