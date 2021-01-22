import Container from "./Container.js"
import Text from "./Text.js"
import Rect from "./Rect.js"
import { Graph } from "./Constants.js"

class Debug extends Container {
    constructor() {
        super()
        this.active = false
        const fpsTxt = new Text('fps: ')
        fpsTxt.name = 'fps'
        fpsTxt.pos = { x: 5, y: 15 }
        fpsTxt.style = { font: '16px Arial', fill: 'red', align: 'left' }
        this.add(fpsTxt)
    }

    addDebug(e) {
        e.children = e.children || []
        const i = new Rect(Graph.RECT_OUTLINE)
        i.w = e.tileW
        i.h = e.tileH
        i.style = { fill: 'cyan', lineWidth: 1 }
        e.children.push(i)
        if (e.hitBox) {
            const { x, y } = e.hitBox;
            const hb = new Rect(Graph.RECT_OUTLINE)
            hb.style = { fill: 'rgba(255, 0, 0, 0.5)' }
            hb.name = "hb"
            hb.w = i.w
            hb.h = i.h
            e.children.push(hb);
        }
    }
}

export default Debug