import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connecting to mongodb using mongoose ODM
const connect = async () => {
  await mongoose.connect("mongodb://localhost/WhaTodo");
};
//creating a model
const todoSchema = mongoose.Schema({
  content: {
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/todos", async (req, res) => {
  try {
    console.log("reached 2");
    const todos = await Todo.find();
    // console.log(todos)
    res.status(201).json({
      message: "sucessfully  found todo",
      data: todos,
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "couldnt find todo",
      data: {},
      sucess: false,
      err: { error },
    });
  }
});
app.post("/api/todos", async (req, res) => {
  const { todoItem } = req.body;
  console.log(req.body)
  try {
    // const todo = new Todo({ content });
    const todo = await Todo.create({content:todoItem})
    console.log(todo)
    // await todo.save();
    res.status(201).json({
      message: "sucessfully  created todo",
      data: todo,
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "couldnt create todo",
      data: {},
      sucess: false,
      err: { error },
    });
  }
});


app.listen(3001, async () => {
  console.log("Server running in Port 3001");
  await connect();
  console.log("Connected to Database");
});
