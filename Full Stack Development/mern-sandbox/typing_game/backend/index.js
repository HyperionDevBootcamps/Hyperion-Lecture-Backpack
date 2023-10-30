const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoModel = require("./models/Todos");
let cors = require("cors");

const app = express();

app.use(cors());

// Custom Middleware: Logging
const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Move on to the next middleware or route handler
};

app.use(logMiddleware);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todo", async (req, res) => {
  try {
    let todos = await todoModel.find();
    console.log(todos);
    return res.status(200).json({ data: todos });
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    let todo = await todoModel.findById(req.params.id);
    return res.status(200).json({ data: todo });
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});

app.post("/todo", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let priority = req.body.priority;

  try {
    const new_todo = new todoModel({
      title: title,
      description: description,
      priority: priority,
    });
    await new_todo.save();
    return res.status(200).json({ data: new_todo });
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    let todo = await todoModel.findById(req.params.id);

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.priority = req.body.priority;

    await todo.save();

    return res.status(200).json({ data: todo });
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    let todo = await todoModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ success: true, data: todo });
  } catch (err) {
    return res.status(502).json({ success: false, error: err });
  }
});

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect("mongodb://127.0.0.1:27017/tododb");
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
