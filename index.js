import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
const app = express();
app.use(cors());
// connecting to mongodb using mongoose ODM
// const connect = async () =>{
//     await mongoose.connect('mongodb://localhost/WhaTodo');
// }

app.get('/api/todos',(req,res)=>{
    const todo =[
        {
            todoItem:"Eat"
        },
        {
            todoItem:"sleep"
        },
        {
            todoItem:"repeat"
        },
    ];
    res.send(todo)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001,async ()=>{
    console.log("Server running in Port 3001");
    // await connect();
    // console.log("Connected to Database")
})

// creating a model
// const todoSchema = mongoose.Schema({
//     content:{
//         type:String
//     }
// });

// const Todo = mongoose.model('Todo',todoSchema);

//creating a post request
// app.post('/api/todos',async(req,res)=>{
//     const {content} = req.body;
    
    
//     try {
        // const todo = new Todo({ content });
        // await todo.save();
//         res.status(201).json({
//             message:"sucessfully  created todo",
//             data:todo,
//             sucess:true,
//             err:{}
//         })
//     } catch (error) {
//         res.status(500).json({
//             message:"couldnt create todo",
//             data:{},
//             sucess:false,
//             err:{error}
//         })
//     }
// })

//creating the get request
// app.get('/api/todos', async (req, res) => {
//     try {
//       const todos = await Todo.find();
//       res.status(201).json({
//         message:"sucessfully  found todo",
//         data:todos,
//         sucess:true,
//         err:{}
//     })
//     } catch (error) {
//         res.status(500).json({
//             message:"couldnt find todo",
//             data:{},
//             sucess:false,
//             err:{error}
//         })
//     }
//   });