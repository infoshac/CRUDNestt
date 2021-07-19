import React, {useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
function App() {
  //pegar os input e colocar numa variavel com onchange
  const[movieName, setMovieName] = useState('')
  const[review, setReview] = useState('')
  const[movieReviewList, setmovieList]= useState([])
  const [newReview, setNewReview] = useState("");

  //PREOCESSO CHAMA GET
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {

      setmovieList(response.data);  
      //console.log(response.data);
    });
  },[]);



  // fPROCESSO CHAMA POST
  const submitReview = ()=> {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      movieReview:review});
        //alert('Sucess');
        setmovieList(
          [...movieReviewList, {movieName: movieName, movieReview: review},
        ]);
     // })
  };

//PROCESSO CHAMA DELETE
const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
}
//PROCESSO CHAMA UPDATE
const updateReview = (movie) =>{
  Axios.put("http://localhost:3001/api/update", {
    movieName: movie, 
    movieReview:newReview
  });
  setNewReview("")
}


  return (
    <div className="App"><h1>Aplication CRUD</h1> 
      <div className="form">
        <label>Movie name</label>
         <input type="text" name="movieName" onChange={(e) => {
           setMovieName(e.target.value)
         }} />
         <label>Review</label>
         <input type="text" name="review" onChange={(e) => {
           setReview(e.target.value)
         }}  />
         <button className="button" onClick={submitReview}>Submit</button>

         {movieReviewList.map((val) => {
           return (
           <div className="card">
              <h1>Movie Name:{val.movieName} </h1>
              <p> Movie Review: {val.movieReview}</p>
              <button className="button" onClick={() =>{deleteReview(val.movieName)}}>
                  Delete
                </button>
              <input type="text" id="updateInput" onChange= {(e)=>{
                setNewReview(e.target.value)
              }}/>
              <button className="button" onClick={() => {updateReview(val.movieName)}}>Update</button>
           </div>
           );
           
         })}
      </div>
    </div>
    
  );
}

export default App;
