const CONTROLLERS_DOM = {
    //BOTONES
    botonBack : document.querySelector("#previous"),
    botonPlay: document.querySelector("#play"),
    botonPause: document.querySelector("#pause"),
    botonNext: document.querySelector("#next"),
    botonVolume: document.querySelector("#volume"),
    botonVolumeIcon: document.querySelector("#volume i"),
    volumeRange: document.querySelector("#volume-range"),
    loop: document.querySelector("#loop"),

    //BARRA DURACION
    current: document.querySelector("#current_duration"),
    barraDuracion: document.querySelector("#durationSlider"),
    all: document.querySelector("#all_duration"),

    //DISPLAY
    title: document.getElementById("title"),
    artist: document.getElementById("artist")
};

CONTROLLERS_DOM.botonNext.addEventListener("click", next);
CONTROLLERS_DOM.botonBack.addEventListener("click", previous);
CONTROLLERS_DOM.botonPlay.addEventListener("click", justplay);
CONTROLLERS_DOM.barraDuracion.addEventListener("click", change_duration);
CONTROLLERS_DOM.botonVolume.addEventListener("click", mute_sound);
CONTROLLERS_DOM.volumeRange.addEventListener("change", volume_change);
CONTROLLERS_DOM.loop.addEventListener("click", loopUnloop);

let index_no = 0;
let playing = false;

let track = document.createElement("audio");

let lastVolume = 0.7;

var tracks;
var display;


function load_tracks (playlist, index_no, displayplace) {
    tracks = playlist;
    display = displayplace;

    reset_slider();
    track.src = playlist[index_no].path;
    CONTROLLERS_DOM.title.textContent= tracks[index_no].name;
    CONTROLLERS_DOM.artist.textContent = tracks[index_no].owner;
    display.style.backgroundImage = "url(" + tracks[index_no].img + ")";
    track.load();
    timer = setInterval(range_slider , 1000);
}


function reset_slider(){
    CONTROLLERS_DOM.barraDuracion.value = 0;
    CONTROLLERS_DOM.current.textContent = "00:00";
}


// JUSTPLAY
function justplay(){
    if (!track.ended) {
        if(playing == false)
        {
            play();
        }
        else
        {
            pause();
        }
    } else {
        next();
    }
}

function play(){
    track.play();
    playing = true;
    CONTROLLERS_DOM.botonPlay.innerHTML = '<i class="fa fa-pause"></i>';

    if (tracks == SONGS) {
        playingStateChanged(index_no, songs, true);
    } else {
        playingStateChanged(index_no, videos, true);
    }
}

function pause(){
    track.pause();
    playing = false;
    CONTROLLERS_DOM.botonPlay.innerHTML = '<i class="fa fa-play"></i>';

    if (tracks == SONGS) {
        playingStateChanged(index_no, songs, false);
    } else {
        playingStateChanged(index_no, videos, false);
    }
}

function next(){
    if(index_no < tracks.length-1)
    {
        index_no += 1;
        load_tracks(tracks, index_no, display);
        play();
    }
    else
    {
        index_no = 0;
        load_tracks(tracks, index_no, display);
        play();
    }
    
    if (tracks == SONGS) {
        clearList(index_no, songs);
    } else {
        clearList(index_no, videos);
    }
}

function previous(){
    if(index_no > 0)
    {
        index_no -= 1;
        load_tracks(tracks, index_no, display);
        play();
    }
    else
    {
        index_no = tracks.length - 1;
        load_tracks(tracks, index_no, display);
        play();
    }
    
    if (tracks == SONGS) {
        clearList(index_no, songs);
    } else {
        clearList(index_no, videos);
    }
}

function volume_change(){
    track.volume = CONTROLLERS_DOM.volumeRange.value / 100;

    if (track.volume > 0) {
        CONTROLLERS_DOM.botonVolumeIcon.classList.remove("fa-volume-mute");
        CONTROLLERS_DOM.botonVolumeIcon.classList.add("fa-volume-down");
    } else {
        CONTROLLERS_DOM.botonVolumeIcon.classList.remove("fa-volume-down");
        CONTROLLERS_DOM.botonVolumeIcon.classList.add("fa-volume-mute");
    }
}

function change_duration(){
    track.currentTime = track.duration * (CONTROLLERS_DOM.barraDuracion.value / 100);
}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 /  track.duration);
        CONTROLLERS_DOM.barraDuracion.value = position;

        CONTROLLERS_DOM.current.textContent = getTime(track.currentTime);
        CONTROLLERS_DOM.all.textContent = getTime(track.duration);
    }

    if  (track.ended) {
        CONTROLLERS_DOM.botonPlay.innerHTML = '<i class="fa fa-play"></i>';
    }

    handleInputChange(CONTROLLERS_DOM.barraDuracion);
}

function getTime (time) {
    var minutes = 0;
    var seconds = 0;
    time = Math.round(time);
    minutes = Math.floor(time/60);
    seconds = time - minutes * 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

function mute_sound(){
    if (track.volume == 0) {
        // UNMUTE
        track.volume = lastVolume;
        CONTROLLERS_DOM.botonVolumeIcon.classList.remove("fa-volume-mute");
        CONTROLLERS_DOM.botonVolumeIcon.classList.add("fa-volume-down");
    } else {
        // MUTE
        lastVolume = track.volume;
        track.volume = 0;
        CONTROLLERS_DOM.botonVolumeIcon.classList.remove("fa-volume-down");
        CONTROLLERS_DOM.botonVolumeIcon.classList.add("fa-volume-mute");
    }
    
    CONTROLLERS_DOM.volumeRange.value = track.volume * 100;
}

function loopUnloop () {
    track.loop = !track.loop;
    CONTROLLERS_DOM.loop.classList.toggle("active");
}
