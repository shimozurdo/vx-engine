import Renderer from "./Renderer.js"
import { KeyControls } from "./Inputs.js"
import Debug from "./Debug.js"

class Game {

  step = 1 / 60
  MAX_FRAME = this.step * 5

  constructor(config) {
    this.w = config.w
    this.h = config.h
    this.renderer = this.createRenderer(config)
    this.scenes = []
    this.scene
    this.textures
    this.controls = new KeyControls()
    this.debug = new Debug()
    this.debug.active = config.debugMode
  }

  addScene(scene) {
    if (this.debug.active)
      scene.add(this.debug)

    if (!this.scene)
      this.scene = scene

    this.scenes.push(scene)
  }

  launchScene(sceneName) {
    this.scene = this.scenes.find(s => s.key === sceneName)
    this.scene.init()
  }

  run(gameUpdate = () => { }) {
    const { MAX_FRAME } = this
    let dt = 0
    let last = 0
    let fps = 0

    const mainloop = ms => {
      requestAnimationFrame(mainloop)
      // create delta
      const t = ms / 1000
      dt = Math.min(t - last, MAX_FRAME)
      last = t
      fps = Math.round(1 / dt)

      if (!this.scene && this.debug.active)
        return

      if (this.debug.active)
        this.scene.children.find(child => child instanceof Debug).children.find(c => c.name === "fps").text = 'fps: ' + fps

      this.scene.update(dt, t)
      gameUpdate(dt, t, this.controls)
      this.renderer.render(this.scene)

    }
    requestAnimationFrame(mainloop)
  }

  createRenderer(config) {
    const renderer = new Renderer(config)
    const parent = config.parent || "game"
    let el = document.querySelector(config.parent)
    if (!el) {
      document.body.innerHTML = '<div id="' + parent + '"></div>'
    }
    document.getElementById(parent).appendChild(renderer.view)
    return renderer;
  }
}

export default Game