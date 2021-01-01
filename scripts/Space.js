import Star from "./Star";

class Space {
    constructor(element) {
        this.canvas = element;
        this.ctx = this.canvas.getContext("2d");

        window.addEventListener("resize", () => this.onResize());
        this.onResize();
        this.updateBound = this.update.bind(this);
        requestAnimationFrame(this.updateBound);

        this.createStars();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createStars() {
        const stars = Math.max(window.innerWidth, window.innerHeight) / 2;
        this.stars = [];

        for (let i = 0; i < stars; i++) {
            this.stars.push(new Star());
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let star of this.stars) {
            star.update();

            this.ctx.save();
            this.ctx.fillStyle = "#fff";
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = star.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }
        requestAnimationFrame(this.updateBound);
    }
}

export default Space;
