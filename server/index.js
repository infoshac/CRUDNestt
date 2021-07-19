const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql= require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'CRUDDataBase'

});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

//PROCESSO SELECT
app.get('/api/get', (req, res) => {
    const querySelect= "SELECT * FROM movie_reviews"
    db.query(querySelect, (err, result) => {
        //console.log(result);
        res.send(result);
    });
})

//PROCESSO INSERT 
app.post("/api/insert",(req, res)=> {
    //recebimento das variaveis passadas pelo front
    const movieName= req.body.movieName
    const movieReview= req.body.movieReview

    const sqlInsert="INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert,[movieName, movieReview ], (err, result)=>{
        //res.send("soldado carneiro");
        console.log(err);
    })

    
});


//PROCESSO DELETE
app.delete('/api/delete/:movieName',(req, res)=>{
    const name = req.params.movieName
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, name,(err, result) => {
        if(err) console.log(err);
    });
})


//PROCESSO UPDATE
app.put('/api/update',(req, res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name],(err, result) => {
        if(err) console.log(err);
    });
})


app.listen(3001, ()=> {
    console.log("running a port 3001");
});