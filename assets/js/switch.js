const SWITCH_DOM = {
    //DISPLAY
    botonAudio_video : document.querySelector("#switch"),
    contSwitch: document.querySelector("#contSwitch"),
};

SWITCH_DOM.contSwitch.addEventListener('click',moverSwitch);

function moverSwitch(){
    botonColor.classList.toggle("mover");
}
