// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

// API CALL
const getLyrics = (artist, song) => new Promise((resolve, reject) => {
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
  domString += `<form id="form" class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Artist</label>
  <input type="text" class="inpFrm form-control" id="artistInput" placeholder="Snoop Dogg">
  <label for="exampleFormControlInput1" class="form-label">Song Title</label>
  <input type="text" class="inpFrm form-control" id="songInput" placeholder="Drop Like It's Hot">
  <div id='button-div'>
  <input id='submit' class="subBtn btn btn-primary" type="submit" value="Submit">
  </div>
  </form>`;
  renderToDom('#form-container', domString);
};

const renderFooter = () => {
  const domString = '<footer>Brought to you by lyrics.ovh and Brett Hughes</footer>';
  renderToDom('#footer', domString);
};

const subEvent = () => {
  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const artist = document.querySelector('#artistInput').value;
    const song = document.querySelector('#songInput').value;
    getLyrics(artist, song).then((response) => {
      let domString = `<h2>${artist}</h2><h5>"${song}"</h5>`;
      domString += response.lyrics;
      renderToDom('#lyrics', domString);
    });
    document.getElementById('form').reset();
  });
};

const startApp = () => {
  renderForm();
  renderFooter();
  subEvent();
};

startApp();
