// src/components/ParticleCanvas.jsx
// Ambient floating particle background drawn on a <canvas>.
// Tweak particle count, colors, or speed here.

import { useRef, useEffect } from 'react'

const PARTICLE_COUNT = 80
const COLORS = ['125,184,122', '201,169,110']

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }
  reset() {
    this.x     = Math.random() * this.canvas.width
    this.y     = Math.random() * this.canvas.height
    this.size  = Math.random() * 1.5 + 0.3
    this.sx    = (Math.random() - 0.5) * 0.3
    this.sy    = -Math.random() * 0.4 - 0.1
    this.alpha = Math.random() * 0.5 + 0.1
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.fillStyle   = `rgb(${this.color})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  update() {
    this.x     += this.sx
    this.y     += this.sy
    this.alpha -= 0.0008
    if (this.alpha <= 0 || this.y < -10) this.reset()
  }
}

export default function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas))

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw(ctx) })
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="presence-canvas" />
}
