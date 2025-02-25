import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const Titlecards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsRef= useRef();
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWZmYjRiMTIwNjJlNzZkZGY2ZjMzZDE4MTg0M2Q3NiIsIm5iZiI6MTc0MDM3NzI1Ny42OTIsInN1YiI6IjY3YmMwY2E5ZWZmZWI5NmU5ZTBhYzY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3XivZyLxgnrBU1mZ3gKfbXrYUHgjZ6pcJyUz2slCxlU'
    }
  };
  
  

const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);},[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards
