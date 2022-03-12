import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [randomPokeMon1, setRandomPokeMon1] = useState({});
  const [randomPokeMon2, setRandomPokeMon2] = useState({});
  const [randomPokeImage1, setRandomPokeImage1] = useState('');
  const [randomPokeImage2, setRandomPokeImage2] = useState('');

  useEffect(()=>{ //useEffect is just going to run whatever is inside of it.
    const random1 = Math.floor(Math.random() * 10);
    const random2 = Math.floor(Math.random() * 10);
    const pokeMonGetter = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`);
        const pokeData1 = res.data.results.filter((poke, index)=>index === random1 || index === random2);
        const [poke1, poke2] = pokeData1; //poke1 and poke2 can be named whatever here.
        const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke1.name}`);
        const res3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke2.name}`);
          setRandomPokeMon1(res2.data);
          setRandomPokeMon2(res3.data);
          setRandomPokeImage1(res2.data.sprites.other.dream_world.front_default);
          setRandomPokeImage2(res3.data.sprites.other.dream_world.front_default);
          // console.log(res2.data.sprites.other.dream_world.front_default);
      } catch (error) {
        console.log(error);
      }
    }
    pokeMonGetter(); // here we call the pokeMonGetter function.
  },[]); // '[]' means to just run the useEffect once.

  return (
    <div className="App">
      <h1>Pokemon! Gotta catch em' all</h1>
      <div className="container">
        <div className="poke-box">
          <img alt="Random Pokemon 1" src={randomPokeImage1} />
          <p>{randomPokeMon1.name}</p>
        </div>
        <div className="poke-box">
          <img alt="Random Pokemon 2" src={randomPokeImage2} />
          <p>{randomPokeMon2.name}</p>
        </div>
      </div>
    </div>
  );
}

export default App;