import karaoke, { setWheelSpeed } from "./karaoke";
import Space from "./Space";

const spaceEl = document.querySelector("#space");
const play = document.querySelector("#play");
const overlay = document.querySelector("#overlay");
const track = document.querySelector("#track");

function start() {
    overlay.style.display = "none";
    track.style.opacity = 1;

    new Space(spaceEl);
    setWheelSpeed();

    const audio = document.querySelector("#song");
    audio.volume = 0.5;
    audio.play();
    karaoke(audio);
}

spaceEl.width = window.innerWidth;
spaceEl.height = window.innerHeight;
play.addEventListener("click", start);
