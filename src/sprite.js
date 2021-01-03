import GameObject from "./game.object.js"
// import { Vector2 } from "./utils.js"

class Sprite {
    constructor(texture, pos, url = null) {
        this.pos = pos
        this.scale = { x: 1, y: 1 }
        this.anchor = { x: 0, y: 0 }
        this.pivot = { x: 0, y: 0 }
        this.rotation = 0
        this.texture = texture
        this.scale = { x: 1, y: 1 }
    }
}

export default Sprite