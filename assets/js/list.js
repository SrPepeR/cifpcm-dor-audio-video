const LIST_DOM = {
    list: document.querySelector("#list"),
    audioList: document.querySelector("#audioList"),
    videoList: document.querySelector("#videoList")
};

loadLists();

function loadLists () {
    //AUDIO LIST
    SONGS.forEach(song => {
        var songInfo = document.createElement("div");
        songInfo.id = song.name;
        songInfo.classList.add("list-element");
        
        var songImg = document.createElement("img");
        songImg.classList.add("img");
        songImg.src = song.img;

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
        
        LIST_DOM.audioList.appendChild(songInfo);
    });

    //TODO VIDEO LIST
}
