const DOM = {

    //BOTONES
    botonBack : document.getElementById("previous"),
    botonPlay: document.getElementById("play"),
    botonPause: document.getElementById("pause"),
    botonNext: document.getElementById("next"),
    botonVolume: document.getElementById("volume-icon"),
    volumeRange: document.getElementById("volume-range"),

    //BARRA DURACION
    barraDuracion: document.getElementById("duration_slider"),

    //IMAGEN CANCION
    title: document.getElementById("title"),
    artist: document.getElementById("artist"),
    imagenCancion: document.querySelector("#content img"),
};

let index_no = 0;
let playing_song = false;

let track = document.createElement("audio");

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
        img: "./assets/img/Cruz_cafune - copia.jpg",
        singer:"Cruz Cafune",
    }
];


function load_track(index_no){
    // clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    DOM.title.textContent= All_song[index_no].name;
    DOM.imagenCancion.src = All_song[index_no].img;
    DOM.artist.textContent = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);


function reset_slider(){
    DOM.barraDuracion.value = 0;
}

if(track.ended){
    play.innerHTML = '<i class="fa fa-play"></i>';
    if (autoplay == 1)
    {
        index_no +=1;
        load_track(index_no);
        playsong();
    }
}

// JUSTPLAY
function justplay(){
    if(playing_song == false)
    {
        playsong();
    }
    else
    {
        pausesong();
    }
}

// FUNCIÓN IIFE
(function(){
    DOM.botonNext.addEventListener("click", next_song);
    DOM.botonBack.addEventListener("click", previous_song);
    DOM.botonPlay.addEventListener("click", justplay);
    DOM.barraDuracion.addEventListener("click", change_duration);
    DOM.botonVolume.addEventListener("click", mute_sound);
    DOM.volumeRange.addEventListener("change", volume_change);
})()

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
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

function volume_change(){
    volume_show.innerHTML = recent.volume.value;
    track.volume = recent_volume.value / 100;
}

function change_duration(){
    DOM.volumeRange = track.duration * (DOM.barraDuracion.value / 100);
    track.currentTime = DOM.volumeRange;
}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 /  track.duration);
        slider.value = position;
    }
}

function mute_sound(){
    track.volume = 0;
    volume.volume = 0;
}