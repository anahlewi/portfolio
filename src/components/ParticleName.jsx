import { useEffect, useRef } from 'react'
import * as THREE from 'three'

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
    for (let i = 0; i < count; i++) {
      offsets[i * 3] = Math.random() * Math.PI * 2
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2
      offsets[i * 3 + 2] = Math.random() * Math.PI * 2
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

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: particleSize * 0.03,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = width / 2
    let mouseY = height / 2
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    container.addEventListener('mousemove', handleMouseMove)

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

      const pos = geometry.attributes.position.array
      const disp = displacement * 0.02
      const mouseWorld = getMouseWorld()
      const repelRadius = 2.5
      const repelStrength = 2.5
      const t = time

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

        if (dist < repelRadius * 1.5 && dist > 0.0001) {
          const angle = Math.atan2(dy, dx)
          const noise =
            Math.sin(angle * 3 + ox * 2 + t * 0.7) * 0.35 +
            Math.sin(angle * 5 - oy + t * 1.1) * 0.2 +
            Math.cos(angle * 2 + oz + t * 0.5) * 0.25
          const effectiveRadius = repelRadius * (1 + noise)

          if (dist < effectiveRadius) {
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
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(canvas)
    }
  }, [text, particleSize, displacement, speed, color])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
