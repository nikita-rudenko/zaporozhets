import state from "./state";

class Star {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;

        this.reset();
    }

    reset() {
        let distance = this.randBetween(0.1, 4);

        this.x = this.randBetween(0, window.innerWidth * 2);
        this.y = this.randBetween(0, window.innerHeight);
        this.vx = -0.75 * distance;
        this.vy = 0.2 * distance;
        this.radius = this.randBetween(0.2, 2);
        this.alpha = this.randBetween(0.1, 0.9);
    }

    randBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    update() {
        this.x += this.vx * state.speed;
        this.y += this.vy * state.speed;

        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }
}

export default Star;
