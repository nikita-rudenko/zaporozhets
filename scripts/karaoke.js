import state from "./state";
import lyrics from "./lyrics";

const wheels = [...document.querySelectorAll(".wheel")];
const primaryL = document.querySelector("#lyrics #primary");
const secondaryL = document.querySelector("#lyrics #secondary");

const wheelsDuration = 0.8;
export function setWheelSpeed() {
    wheels.forEach((w) => {
        w.setAttribute(
            "style",
            `animation-duration: ${wheelsDuration / state.speed}s`
        );
    });
}

function karaoke(audio) {
    function insertNewLine() {
        primaryL.innerText = lyrics[state.lineIndex].original;
        secondaryL.innerText = lyrics[state.lineIndex].translation;
    }

    function changeLine(timestamp) {
        if (state.lineIndex === 0) insertNewLine();

        if (lyrics[state.lineIndex].speedModifier) {
            const { speedModifier } = lyrics[state.lineIndex];

            state.speed =
                speedModifier > 0
                    ? Math.min(state.maxSpeed, state.speed + speedModifier)
                    : Math.max(state.minSpeed, state.speed + speedModifier);

            setWheelSpeed();
        }

        if (state.lineIndex + 1 === lyrics.length) {
            return;
        }

        if (
            Math.floor(timestamp * 1000) >=
            +lyrics[state.lineIndex + 1].timestamp
        ) {
            state.lineIndex = state.lineIndex + 1;
            insertNewLine();
        }
    }

    const t = setTimeout(() => {
        state.currentTime = audio.currentTime;

        if (!audio.ended) {
            changeLine(state.currentTime);
            clearTimeout(t);
            karaoke(audio);
        } else {
            clearTimeout(t);
            state.currentTime = 0;
            state.lineIndex = 0;
            audio.play();
            karaoke(audio);
        }
    }, 250);
}

export default karaoke;
