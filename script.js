const express = require("express")
const app = express();
const cors = require('cors');
// const bodyParser = require("body-parser");
// app.use(bodyParser.json())
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
app.use(cors())
//  const dbUrl = "mongodb://localhost:27017"


const dbUrl="mongodb+srv://dbuser:dbuser@cluster0.ngq1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority?authSource=admin"
app.use(express.json())
let students = []
let mentors = []

console.log(dbUrl)
app.get("/students", async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        let students = await db.collection("students").find().toArray();
        client.close();
        res.json(students)
    } catch (error) {
        console.log(error)
        res.json({
            message: "Unable to get the data"
        })
    }
})

// app.get("/mentors",(req,res)=>{
//     res.json(mentors)
// })

app.post("/student", async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        await db.collection("students").insertOne({name: req.body.name })
        client.close();
        res.json(
            {
                message: "success"
            }
        )

    } catch (error) {
        console.log(error)
        res.json({
            message: "Something is wrong"
        })
    }


    //    let studentData = {
    //        name:req.body.name,
    //        id:students.length + 1
    //    }
    //    students.push(studentData)
    //    res.json({
    //        message: "success"
    //    })
})

app.get("/student/:id",  async (req, res) => {


    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        var id=mongodb.ObjectId(req.params.id)
       let student= await db.collection("students").findOne({ _id: id })
        client.close();
        res.json(student)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }


    //    if(students[req.params.id - 1]){
    //        res.json(students[req.params.id - 1])
    //    }else{
    //        res.json({
    //            message:"no record available"
    //        })
    //    }
})

app.put("/student/:id", async (req, res) => {

try {
    let client = await mongoClient.connect(dbUrl);
    let db = client.db("b19wd");
    var id=mongodb.ObjectId(req.params.id)
   let student= await db.collection("students").updateOne({ _id: id },{$set:{name:req.body.name}})
    client.close();
    res.json(student)    


} catch (error) {
    console.log(error)
    res.json(
        {
            message:" No Data Found"
        }
    )
    
}




    // if (students[req.params.id - 1]) {
    //     students[req.params.id - 1].name = req.body.name;
    //     res.json({
    //         message: "success"
    //     })
    // } else {
    //     res.json({
    //         message: "no record available"
    //     })
    // }
})

app.delete("/student/:id", async (req, res) => {

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        var id=mongodb.ObjectId(req.params.id)
       let student= await db.collection("students").deleteOne({ _id: id })
        client.close();
        res.json(student)    
    } catch (error) {
        console.log(error)
        res.json({
            "message":"No data found"
        })
    }





    // let studentData = students.find(student => student.id == req.params.id);
    // let index = students.indexOf(studentData)
    // // console.log(index)
    // students.splice(index, 1)
    // res.json({
    //     message: "record deleted"
    // })
})

let port = 8000
app.listen(port, () => {
    console.log(`port open ${port}`)
})

