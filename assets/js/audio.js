const DOM = {
    //BOTONES
    botonBack : document.querySelector("#previous"),
    botonPlay: document.querySelector("#play"),
    botonPause: document.querySelector("#pause"),
    botonNext: document.querySelector("#next"),
    botonVolume: document.querySelector("#volume"),
    botonVolumeIcon: document.querySelector("#volume i"),
    volumeRange: document.querySelector("#volume-range"),

    //BARRA DURACION
    current: document.querySelector("#current_duration"),
    barraDuracion: document.querySelector("#durationSlider"),
    all: document.querySelector("#all_duration"),

    //IMAGEN CANCION
    title: document.getElementById("title"),
    artist: document.getElementById("artist"),
    imagenCancion: document.querySelector(".image")
};

let index_no = 0;
let playing_song = false;

let track = document.createElement("audio");

let lastVolume = 0.9;

let All_song =[
    {
        name: "La trompeta",
        path: "./assets/audio/El_Dandy_De_Barcelona.mp3",
        img: "./assets/img/Dandy_de_Barcelona.jpg",
        singer:"El Dandy de Barcelona",
    },
    {
        name: "El ciclista",
        path: "./assets/audio/Que_te_avian.mp3",
        img: "./assets/img/Que_te_avian.jpg",
        singer:"Que te avian",
    },
    {
        name: "Tokyo Drift",
        path: "./assets/audio/CRUZ_CAFUNÉ_TOKYO_DRIFT_AUDIO.mp3",
        img: "./assets/img/Cruz_cafune.png",
        singer:"Cruz Cafune",
    }
];


function load_track(index_no){
    // clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    DOM.title.textContent= All_song[index_no].name;
    DOM.imagenCancion.style.backgroundImage = "url(" + All_song[index_no].img + ")";
    DOM.artist.textContent = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider , 1000);
}


function reset_slider(){
    DOM.barraDuracion.value = 0;
    DOM.current.textContent = "00:00";
}

// JUSTPLAY
function justplay(){
    if (!track.ended) {
        if(playing_song == false)
        {
            playsong();
        }
        else
        {
            pausesong();
        }
    } else {
        next_song();
    }
}

function playsong(){
    track.play();
    playing_song = true;
    DOM.botonPlay.innerHTML = '<i class="fa fa-pause"></i>';
}

function pausesong(){
    track.pause();
    playing_song = false;
    DOM.botonPlay.innerHTML = '<i class="fa fa-play"></i>';
}

function next_song(){
    if(index_no < All_song.length-1)
    {
        index_no += 1;
        load_track(index_no);
        playsong();
    }
    else
    {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

function previous_song(){
    if(index_no > 0)
    {
        index_no -= 1;
        load_track(index_no);
        playsong();
    }
    else
    {
        index_no = All_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

function volume_change(){
    track.volume = DOM.volumeRange.value / 100;
}

function change_duration(){
    DOM.volumeRange = track.duration * (DOM.barraDuracion.value / 100);
    track.currentTime = DOM.volumeRange;
}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 /  track.duration);
        DOM.barraDuracion.value = position;

        DOM.current.textContent = getTime(track.currentTime);
        DOM.all.textContent = getTime(track.duration);
    }

    if  (track.ended) {
        DOM.botonPlay.innerHTML = '<i class="fa fa-play"></i>';
    }
}

function getTime (time) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    time = Math.round(time);

    hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    minutes = Math.floor(time/60);
    seconds = time - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
}

function mute_sound(){
    if (track.volume == 0) {
        // UNMUTE
        track.volume = lastVolume;
        DOM.botonVolumeIcon.classList.remove("fa-volume-mute");
        DOM.botonVolumeIcon.classList.add("fa-volume-down");
    } else {
        // MUTE
        lastVolume = track.volume;
        track.volume = 0;
        DOM.botonVolumeIcon.classList.remove("fa-volume-down");
        DOM.botonVolumeIcon.classList.add("fa-volume-mute");
    }
    
    DOM.volumeRange.value = track.volume * 100;
}


// FUNCIÓN IIFE
// (function(){
    DOM.botonNext.addEventListener("click", next_song);
    DOM.botonBack.addEventListener("click", previous_song);
    DOM.botonPlay.addEventListener("click", justplay);
    DOM.barraDuracion.addEventListener("click", change_duration);
    DOM.botonVolume.addEventListener("click", mute_sound);
    DOM.volumeRange.addEventListener("change", volume_change);

    load_track(index_no);
// })()
