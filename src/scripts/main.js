// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

// API CALL
const getLyrics = (artist, song) => ((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const renderToDom = (divId, textToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToRender;
};

const renderForm = () => {
  let domString = '<h1>FIND YOUR SONG LYRICS</H1>';
  domString += `<div id="form" class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Artist</label>
  <input type="email" class="form-control" id="artistInput" placeholder="Snoop Dogg">
  <label for="exampleFormControlInput1" class="form-label">Song Title</label>
  <input type="email" class="form-control" id="songInput" placeholder="Drop Like It's Hot">
  <input id='submit' class="btn btn-primary" type="submit" value="Submit">
  </div>`;
  renderToDom('#form-container', domString);
};

const subEvent = () => {
  const artistInput = document.getElementById('artistInput');
  const songInput = document.getElementById('songInput');
  document.querySelector('#form').addEventListener('submit', (e) => {
    if (e.target.id === 'submit') {
      console.error('button clicked');
      const artist = artistInput.value;
      const song = songInput.value;
      getLyrics(artist, song).then((response) => {
        renderToDom('#lyrics', response);
      });
    }
  });
};

const startApp = () => {
  renderForm();
  subEvent();
};

startApp();
