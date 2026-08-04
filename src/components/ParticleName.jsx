import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PEARL_TINTS = [
  [1.0, 0.98, 0.94],   // warm cream
  [1.0, 0.93, 0.95],   // blush pink
  [0.93, 0.96, 1.0],   // pale blue
  [0.96, 0.93, 1.0],   // lavender
  [1.0, 0.97, 0.85],   // pale gold
  [1.0, 1.0, 1.0],     // white
]

function createPearlTexture(size = 128) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const cx = size / 2
  const cy = size / 2
  const r = size / 2

  const body = ctx.createRadialGradient(
    cx - r * 0.3, cy - r * 0.3, r * 0.05,
    cx, cy, r
  )
  body.addColorStop(0, 'rgba(255,255,255,1)')
  body.addColorStop(0.35, 'rgba(255,250,247,0.95)')
  body.addColorStop(0.6, 'rgba(232,225,222,0.8)')
  body.addColorStop(0.85, 'rgba(190,182,185,0.4)')
  body.addColorStop(1, 'rgba(190,182,185,0)')
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()

  const highlight = ctx.createRadialGradient(
    cx - r * 0.38, cy - r * 0.42, 0,
    cx - r * 0.38, cy - r * 0.42, r * 0.3
  )
  highlight.addColorStop(0, 'rgba(255,255,255,0.95)')
  highlight.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = highlight
  ctx.beginPath()
  ctx.arc(cx - r * 0.38, cy - r * 0.42, r * 0.3, 0, Math.PI * 2)
  ctx.fill()

  return canvas
}

const SOUND_SRC = '/sounds/pearls-rubbing.mp3'
const MAX_VOLUME = 0.35

const VERTEX_SHADER = `
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;
  uniform float uSize;
  uniform float uPixelScale;
  uniform float uTime;
  varying vec3 vColor;
  varying float vShimmer;
  void main() {
    vColor = aColor;
    vShimmer = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase * 3.0);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * aScale * (uPixelScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = `
  uniform sampler2D map;
  uniform vec3 uTint;
  varying vec3 vColor;
  varying float vShimmer;
  void main() {
    vec4 tex = texture2D(map, gl_PointCoord);
    if (tex.a < 0.02) discard;
    vec3 rgb = tex.rgb * vColor * uTint * vShimmer;
    gl_FragColor = vec4(rgb, tex.a);
  }
`

export default function ParticleName({
  text = 'anah lewi',
  particleSize = 5,
  displacement = 4,
  speed = 1,
  color = '#ffffff',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = document.createElement('canvas')
    container.appendChild(canvas)

    let width = container.clientWidth
    let height = container.clientHeight

    const scene = new THREE.Scene()
    const fov = 50
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    const texW = 1024
    const texH = 256
    const off = document.createElement('canvas')
    off.width = texW
    off.height = texH
    const c = off.getContext('2d')
    c.fillStyle = '#000'
    c.fillRect(0, 0, texW, texH)
    c.fillStyle = '#fff'
    c.font = 'bold 180px monospace'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.imageSmoothingEnabled = false
    c.fillText(text, texW / 2, texH / 2)

    const img = c.getImageData(0, 0, texW, texH)
    const step = 4
    const positions = []
    for (let y = 0; y < texH; y += step) {
      for (let x = 0; x < texW; x += step) {
        const idx = (y * texW + x) * 4
        if (img.data[idx] > 128) {
          const wx = (x - texW / 2) * 0.02
          const wy = -(y - texH / 2) * 0.02
          positions.push(wx, wy, 0)
        }
      }
    }

    const count = positions.length / 3
    const basePositions = new Float32Array(positions)
    const offsets = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      offsets[i * 3] = Math.random() * Math.PI * 2
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2
      offsets[i * 3 + 2] = Math.random() * Math.PI * 2

      const tint = PEARL_TINTS[(Math.random() * PEARL_TINTS.length) | 0]
      const jitter = 0.9 + Math.random() * 0.1
      colors[i * 3] = tint[0] * jitter
      colors[i * 3 + 1] = tint[1] * jitter
      colors[i * 3 + 2] = tint[2] * jitter

      scales[i] = 0.75 + Math.random() * 0.6
      phases[i] = Math.random() * Math.PI * 2
    }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (let i = 0; i < count; i++) {
      const x = basePositions[i * 3]
      const y = basePositions[i * 3 + 1]
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
    const wobble = displacement * 0.02
    const textHalfWidth = (maxX - minX) / 2 + wobble
    const textHalfHeight = (maxY - minY) / 2 + wobble * 2
    const padding = 1.25

    const fitCamera = () => {
      const vHalf = Math.tan((fov / 2) * (Math.PI / 180))
      const zForHeight = (textHalfHeight * padding) / vHalf
      const zForWidth = (textHalfWidth * padding) / (vHalf * camera.aspect)
      camera.position.z = Math.max(zForHeight, zForWidth)
    }
    fitCamera()

    const posAttr = new Float32Array(basePositions.length)
    posAttr.set(basePositions)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(posAttr, 3))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const pearlTexture = new THREE.CanvasTexture(createPearlTexture())
    pearlTexture.minFilter = THREE.LinearFilter
    pearlTexture.magFilter = THREE.LinearFilter

    const baseColor = new THREE.Color(color)

    const updatePixelScale = () => {
      material.uniforms.uPixelScale.value = height * 0.5
    }

    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: pearlTexture },
        uSize: { value: particleSize * 0.045 },
        uPixelScale: { value: 1 },
        uTime: { value: 0 },
        uTint: { value: baseColor },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
    updatePixelScale()

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const audio = new Audio(SOUND_SRC)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    let currentVolume = 0
    let audioStarted = false

    let mouseX = width / 2
    let mouseY = height / 2
    let mouseActive = false
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseActive = true
    }
    const handleMouseLeave = () => {
      mouseActive = false
    }
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    const getMouseWorld = () => {
      const ndcX = (mouseX / width) * 2 - 1
      const ndcY = -((mouseY / height) * 2 - 1)
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      return camera.position.clone().add(dir.multiplyScalar(distance))
    }

    let time = 0
    let lastTimestamp = performance.now()
    let rafId

    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      const dt = now - lastTimestamp
      lastTimestamp = now
      time += dt * 0.001 * speed

      material.uniforms.uTime.value = time

      const pos = geometry.attributes.position.array
      const disp = displacement * 0.02
      const mouseWorld = getMouseWorld()
      const repelRadius = 1.4
      const repelStrength = 2.5
      const t = time
      let engagedCount = 0

      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const ox = offsets[i3]
        const oy = offsets[i3 + 1]
        const oz = offsets[i3 + 2]
        let px = basePositions[i3] + Math.sin(time * 1.3 + ox) * disp
        let py = basePositions[i3 + 1] + Math.cos(time * 1.1 + oy) * disp
        let pz = basePositions[i3 + 2] + Math.sin(time * 1.7 + oz) * disp * 2

        const dx = px - mouseWorld.x
        const dy = py - mouseWorld.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (mouseActive && dist < repelRadius * 1.5 && dist > 0.0001) {
          const angle = Math.atan2(dy, dx)
          const noise =
            Math.sin(angle * 3 + ox * 2 + t * 0.7) * 0.35 +
            Math.sin(angle * 5 - oy + t * 1.1) * 0.2 +
            Math.cos(angle * 2 + oz + t * 0.5) * 0.25
          const effectiveRadius = repelRadius * (1 + noise)

          if (dist < effectiveRadius) {
            engagedCount++
            const n = 1 - dist / effectiveRadius
            const falloff = n * n
            const strength = repelStrength * (0.7 + 0.6 * Math.sin(ox + oy))
            const force = falloff * strength

            const swirl = 0.35 * Math.sin(ox * 3 + t)
            const nxRad = dx / dist
            const nyRad = dy / dist
            const nxTan = -nyRad
            const nyTan = nxRad

            px += (nxRad + nxTan * swirl) * force
            py += (nyRad + nyTan * swirl) * force
            pz += force * (0.4 + 0.6 * Math.sin(oz + t * 1.3))
          }
        }

        pos[i3] = px
        pos[i3 + 1] = py
        pos[i3 + 2] = pz
      }
      geometry.attributes.position.needsUpdate = true

      if (Math.random() < 0.02) console.log('DEBUG', { count, engagedCount, currentVolume })
      const targetVolume = (engagedCount / Math.max(count * 0.12, 1)) * MAX_VOLUME
      const clampedTarget = Math.min(targetVolume, MAX_VOLUME)
      const smoothing = 1 - Math.exp(-dt * 0.006)
      currentVolume += (clampedTarget - currentVolume) * smoothing
      if (currentVolume > 0.002) {
        if (!audioStarted) {
          audioStarted = true
          audio.play().catch(() => {})
        }
        audio.volume = Math.min(currentVolume, 1)
      } else if (audioStarted) {
        audio.volume = 0
      }

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(animate)

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      fitCamera()
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      updatePixelScale()
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      audio.pause()
      audio.src = ''
      geometry.dispose()
      material.dispose()
      pearlTexture.dispose()
      renderer.dispose()
      container.removeChild(canvas)
    }
  }, [text, particleSize, displacement, speed, color])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
