/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./Meme.css";
// import MemesData from "./MemesData.js";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
 

  function getMemeImage() {    
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme({...meme,topText:'',bottomText:'',randomImage: url});    
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme({...meme,
      [name]: value,
    });
    
  }

  return (
    <main>
      <div className="form">
        <input
          className="form-input"
          type="text"
          placeholder="Add top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Add bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a New Meme Image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
