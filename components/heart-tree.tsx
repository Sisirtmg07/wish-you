"use client"

import { useEffect, useRef } from "react"

interface Heart {
  x: number
  y: number
  size: number
  color: string
  scale: number
  scaleSpeed: number
  opacity: number
  sparkleOffset: number
}

export function HeartTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let resizeTimeout: NodeJS.Timeout
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateSize, 100)
    }

    updateSize()
    window.addEventListener("resize", debouncedResize)

    const colors = [
      "#FF1493",
      "#FF69B4",
      "#FFC0CB",
      "#FF6B9D",
      "#FFB6C1",
      "#FF3366",
      "#FF8C00",
      "#FFA500",
      "#FFD700",
      "#FFFF00",
      "#FF69E1",
      "#E941FF",
      "#FF00FF",
      "#DA70D6",
      "#FF6347",
    ]

    const hearts: Heart[] = []

    const isMobile = window.innerWidth < 768
    const heartPoints: { x: number; y: number; wobble: number }[] = []
    const centerX = isMobile ? window.innerWidth / 2 : (window.innerWidth * 2) / 3
    const centerY = window.innerHeight / 2.5
    const scale = Math.min(window.innerWidth, window.innerHeight) / (isMobile ? 50 : 40)

    for (let t = 0; t < Math.PI * 2; t += 0.05) {
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      heartPoints.push({ x: centerX + x * scale, y: centerY - y * scale, wobble: Math.random() * 2 * Math.PI })
    }

    let growIndex = 0
    let time = 0
    let animationId: number

    const drawHeart = (x: number, y: number, size: number, color: string, scaleH = 1, sparkle = 0) => {
      ctx.save()
      ctx.translate(x, y - sparkle)
      ctx.scale(scaleH, scaleH)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, size * 0.3)
      ctx.bezierCurveTo(-size / 2, -size * 0.3, -size, size * 0.3, 0, size)
      ctx.bezierCurveTo(size, size * 0.3, size / 2, -size * 0.3, 0, size * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      time += 0.024

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
      gradient.addColorStop(0, "#ffdde1")
      gradient.addColorStop(1, "#ee9ca7")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      if (growIndex < heartPoints.length) {
        const p = heartPoints[growIndex]
        const heartCount = isMobile ? 1 : 2
        for (let i = 0; i < heartCount; i++) {
          hearts.push({
            x: p.x,
            y: p.y,
            size: Math.random() * 8 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            scale: 0,
            scaleSpeed: 0.05 + Math.random() * 0.05,
            opacity: 1,
            sparkleOffset: Math.random() * 5,
          })
        }
        growIndex += 1
      }

      // Draw hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i]

        h.scale += h.scaleSpeed
        h.opacity -= 0.001
        const sway = Math.sin(time * 2 + h.sparkleOffset) * 3
        const sparkle = Math.sin(time * 5 + h.sparkleOffset) * 3

        if (h.opacity <= 0) {
          hearts.splice(i, 1)
          continue
        }

        ctx.globalAlpha = h.opacity
        drawHeart(h.x + sway, h.y, h.size, h.color, h.scale, sparkle)
        ctx.globalAlpha = 1
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full gpu-accelerated" />
}
