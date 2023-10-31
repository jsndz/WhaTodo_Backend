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
  console.log(req.body._id)
  const { todoItem } = req.body;
  try {
    const todo = await Todo.create({content:todoItem})
    console.log(req.body)
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

app.delete("/api/todos",async (req,res)=>{
  try {
    console.log(req.body._id)
    const response = await Todo.findByIdAndRemove(req.body._id)
    res.status(201).json({
      message: "sucessfully  deleted todo",
      data: response,
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "couldnt delete todo",
      data: {},
      sucess: false,
      err: { error },
    });
  } 
})


app.listen(3001, async () => {
  console.log("Server running in Port 3001");
  await connect();
  console.log("Connected to Database");
});
