const LIST_DOM = {
    list: document.querySelector("#list"),
    header: document.querySelector("header"),
    audio: document.querySelector("#listAudio"),
    video: document.querySelector("#listVideo")
};

var songs = new Array();

LIST_DOM.audio.addEventListener("click", audioClicked);
LIST_DOM.video.addEventListener("click", videoClicked);

loadLists();

function loadLists () {
    var left = document.createElement("section");
    left.classList.add("list");

    songs = new Array();

    //AUDIO LIST
    SONGS.forEach((song, index) => {
        var songInfo = document.createElement("div");
        songInfo.id = song.name;
        songInfo.classList.add("list-element");
        
        var songImg = document.createElement("div");
        songImg.classList.add("img");
        songImg.style.backgroundImage = "url(" + song.img + ")";

        var playing = document.createElement("i");
        playing.classList.add("playing");
        playing.classList.add("fa");
        playing.classList.add("fa-play");

        songImg.appendChild(playing);

        var songText = document.createElement("section");
        songText.classList.add("text");

        var songTitle = document.createElement("h3");
        songTitle.classList.add("title");
        songTitle.textContent = song.name;

        var songOwner = document.createElement("h4");
        songOwner.classList.add("owner");
        songOwner.textContent = song.owner;

        songText.appendChild(songTitle);
        songText.appendChild(songOwner);

        songInfo.appendChild(songImg);
        songInfo.appendChild(songText);

        if (index == 0) {
            songInfo.classList.add("active");
        }
        
        left.appendChild(songInfo);
        songInfo.addEventListener("click", ()=>{changeTrack(songInfo, songs)})

        songs.push(songInfo);
    });

    LIST_DOM.list.appendChild(left);

    //TODO VIDEO LIST
}

function changeTrack (element, tracks) {
    var index = tracks.indexOf(element);

    if (index != index_no) {
        // Different song
        index_no = index;
        clearList(index, tracks);
        pause();
        load_tracks(SONGS, index, AUDIO_DOM.imagenCancion);
    } else {
        justplay();
    }
}

function clearList (index, tracks) {
    tracks.forEach((element) => {element.classList.remove("active")});

    tracks[index].classList.add("active");
}

function playingStateChanged (index, tracks, playing) {
    if (playing) {
        tracks[index].firstChild.firstChild.classList.remove("fa-play");
        tracks[index].firstChild.firstChild.classList.add("fa-pause");
    } else {
        tracks[index].firstChild.firstChild.classList.remove("fa-pause");
        tracks[index].firstChild.firstChild.classList.add("fa-play");
    }
}

function audioClicked () {
    LIST_DOM.header.classList.add("left");
    LIST_DOM.header.classList.remove("right");

    LIST_DOM.audio.classList.add("active");
    LIST_DOM.video.classList.remove("active");
}

function videoClicked () {
    LIST_DOM.header.classList.remove("left");
    LIST_DOM.header.classList.add("right");
    
    LIST_DOM.audio.classList.remove("active");
    LIST_DOM.video.classList.add("active");
}
