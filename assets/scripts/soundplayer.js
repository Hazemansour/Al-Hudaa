const endpoint = 'http://api.alquran.cloud/v1/meta';
const request = new XMLHttpRequest();
const audio = new Audio();
const playPause = document.querySelector('#play-pause');
const playPauseIcon = document.querySelector('#play-pause > i');
let isPlaying = false;
let currentIndex = 0;

// get Surahs names and numbers from http://api.alquran.cloud/v1/meta endpoint.
request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
        const requestData = JSON.parse(request.response);
        console.log(requestData)
        // extract Quran reference
        const surahs = requestData.data.surahs.references
        const allSurahs = document.querySelectorAll('.surah');
        allSurahs.forEach((el, index )=> {
            // loop through html nodes and append surahs names and numbers. 
            el.innerHTML = surahs[index].name + " - " + surahs[index].number + `<i class="fas fa-play"></i>`;
            el.addEventListener('click', () => {
                allSurahs.forEach((el) => {
                    el.classList.remove('active');
                    el.querySelector('i').className = 'fas fa-play';
                })
                el.classList.add('active');
                el.querySelector('i').className = 'fas fa-pause';
                const server = el.getAttribute('data-target');
                let id = index + 1;
                if (id < 10) {
                    id = "00" + id   
                } else if ( id >= 10 && id < 100) {
                    id = "0" + id
                } 

                playSound(server, id, index, surahs);
        })
        })
        // console.log(surahs)
    }
})
const surahsIcon = document.querySelectorAll('surah > i');

// play and pause teh audio
playPause.addEventListener('click', () => {
    if (audio.src !== '') {
        if (isPlaying) {
        isPlaying = false;
        playPauseIcon.className = 'fas fa-play';
        audio.pause()
    } else {
        isPlaying = true;
        playPauseIcon.className = 'fas fa-pause';
        audio.play();
    }
    }
})
// Check if the audio ended
audio.addEventListener('ended', () => {
    playPauseIcon.className = 'fas fa-play';
    isPlaying = false;
})
// send request to the server
function playSound(server, surah, index, data) {
    audio.src = `https://server${server}.mp3quran.net/yasser/${surah}.mp3`;
    audio.play();
    playPauseIcon.className = 'fas fa-pause';
    isPlaying = true;
    setMetaData(index, data)
}

function setMetaData(index, data) {
    document.querySelector('.sound-name').innerText = data[index].name;
    audio.onloadedmetadata = () => {
       let  duration = audio.duration;
        let mints = duration / 60;
        let rSeconds = duration % 60;
        document.querySelector('.sound-time').innerHTML = Math.floor(mints) + ":" + Math.round(rSeconds);
    }
   
}

audio.addEventListener('timeupdate', () => {

    updateTime();
}
) 

function updateTime() {
        if (isPlaying) {
            let currentTime = audio.currentTime;
        let mints = Math.floor(currentTime / 60);
        let rSeconds = Math.round(currentTime % 60);
        let currentMints = (Math.floor(audio.duration / 60)) - mints;
        let currentSeconds = (Math.round(audio.duration % 60))- rSeconds; 
        document.querySelector('.current-time').innerText = mints + ":" + rSeconds;
        document.querySelector('.left-time').innerText = currentMints + ":" + currentSeconds;
        audio.onu
        }
}

request.open('GET', endpoint);
request.send();