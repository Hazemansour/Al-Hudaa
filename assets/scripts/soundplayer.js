const endpoint = "../assets/json/quran-chapters.json";
const request = new XMLHttpRequest();
const audio = new Audio();
const soundName = document.querySelector('.sound-name');
const audioTime = document.querySelector('.audio-time');
let audioDuration = 0;

request.open("GET", endpoint);
request.send();

// request and check request status
request.addEventListener("readystatechange", getSurahsInfo);

function getSurahsInfo() {
  // If data received
  if (request.readyState === 4 && request.status === 200) {
    setSurahsInfo(JSON.parse(request.responseText));
  }
  // If there is an error
  else if (request.readyState === 4 && request.status !== 200) {
    console.log("Somthing went wrong! => error " + request.status);
  }
}

// set all surahs data to the page
function setSurahsInfo(data) {
  // get all info containers
  const $List = document.querySelectorAll(".surah");
  // set the information for each surah
  $List.forEach((element, index) => {
    const span = document.createElement("span");
    span.className = "fas fa-play";
    element.innerHTML = `${data[index].name} - ${index + 1}`;
    element.appendChild(span);

    // play the surah on click on its name.
    element.addEventListener("click", () => {
      // set the name of surah
      soundName.innerText = data[index].name; 
    let id = index + 1;
    if (id < 10) {
      id = "00" + id;
    } else if (id >= 10 && id < 100) {
      id = "0" + id;
    } else if (id == 100 && id > 100) {
      id = id;
    }
  
    audio.src = `https://server${element.getAttribute('data-target')}.mp3quran.net/yasser/${id}.mp3`;
  
    audio.onloadedmetadata = () => {
      audio.play();
      audioDuration = audio.duration;
      // set the metadata
      let mints = Math.floor(audioDuration / 60);
      let seconds = audioDuration % 60;
      audioTime.innerText = mints + ":" + (Math.round(seconds) < 10 ? "0" + Math.round(seconds) : Math.round(seconds));
    };
    // change icon for play-pause button
    document.querySelector('#play-pause i').className = 'fas fa-pause';
    const icons = document.querySelectorAll('.surah span');
    icons.forEach((el) => {
      // change icon
     el.className = "fas fa-play";
     // add active class to icon parentElement
     el.parentElement.classList.remove('active');
     el.parentElement.classList.remove('playing');
    })
     // add active class to for all icon parentElement
    element.classList.add('active');
    // change icon
    element.querySelector("span").className = "fas fa-pause";
    element.classList.add('playing');
   }
    );
  });
}

// Get Sound Player Controls
const playButton = document.querySelector('#play-pause'),
 forwardButton = document.querySelector('#forword'),
 backwardButton = document.querySelector('#backword'),
 progress = document.querySelector('.progress-bar'),
 progressBar = document.querySelector('.progress-bar > div');

 let isPlaying = false;
playButton.addEventListener('click', playPauseSurah)

 function playPauseSurah() {
   if (isPlaying) {
      audio.play();
    playButton.querySelector('i').className = 'fas fa-pause';

    // change playing surah icon to pause
   document.querySelector('.playing span').classList.replace('fa-play', 'fa-pause');

      isPlaying = false;
   } else {
      audio.pause();
    playButton.querySelector('i').className = 'fas fa-play';
      //  change playing surah icon to play
   document.querySelector('.playing span').classList.replace('fa-pause', 'fa-play');

      isPlaying = true;
   }
 }

// if audio ended 
audio.addEventListener('ended', () => {
   // set isPlaying to true
   isPlaying = true;
   // change playButton icon to play
   playButton.querySelector('i').className = 'fas fa-play';
   // change playing surah icon to play
   document.querySelector('.playing span').classList.replace('fa-pause', 'fa-play');
})


// set audio timings
const currentAudioTime = document.querySelector('.current-audio-time');

audio.addEventListener('timeupdate', () => {

  let currentTime = audio.currentTime;
  let mints = Math.floor(audioDuration / 60);
  let seconds = audioDuration % 60;
  let currentMints = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  let currentWidth = 100 / audioDuration;

  progressBar.style.width = currentWidth * currentTime + "%"

  currentAudioTime.innerText = currentMints + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);
  


})

// 5 seconds forward
forwardButton.addEventListener('click', secondsForward)
function secondsForward() {
      if (audio.src !== "") {
        audio.currentTime += 5;
      }
}
// 5 seconds backwoard
backwardButton.addEventListener('click', decreaseSeconds)
function decreaseSeconds() {
      if (audio.src !== "") {
        audio.currentTime -= 5;
      }
}

