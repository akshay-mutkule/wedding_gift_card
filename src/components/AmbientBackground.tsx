import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: "rose-petal" | "sparkle" | "bokeh" | "heart" | "star";
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Helper to generate a single particle
    const createParticle = (initY = false): Particle => {
      const typeRand = Math.random();
      let type: Particle["type"] = "star";
      let color = "rgba(255, 255, 255, 0.4)";
      let size = Math.random() * 2 + 1;

      if (typeRand < 0.25) {
        type = "rose-petal";
        color = `rgba(${220 + Math.random() * 35}, ${100 + Math.random() * 50}, ${120 + Math.random() * 40}, ${0.4 + Math.random() * 0.4})`;
        size = Math.random() * 12 + 6;
      } else if (typeRand < 0.5) {
        type = "sparkle";
        color = `rgba(255, ${215 + Math.random() * 40}, ${120 + Math.random() * 100}, ${0.5 + Math.random() * 0.5})`;
        size = Math.random() * 4 + 2;
      } else if (typeRand < 0.7) {
        type = "bokeh";
        color = `rgba(${255}, ${220 + Math.random() * 35}, ${220 + Math.random() * 35}, ${0.05 + Math.random() * 0.1})`;
        size = Math.random() * 60 + 30;
      } else if (typeRand < 0.8) {
        type = "heart";
        color = `rgba(${230 + Math.random() * 25}, ${140 + Math.random() * 40}, ${160 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`;
        size = Math.random() * 10 + 5;
      }

      return {
        x: Math.random() * width,
        y: initY ? Math.random() * height : -20,
        size,
        speedX: type === "rose-petal" ? Math.random() * 1 - 0.5 + 0.2 : Math.random() * 0.6 - 0.3,
        speedY: type === "rose-petal" ? Math.random() * 1.2 + 0.8 : type === "bokeh" ? Math.random() * 0.3 + 0.1 : Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.8 + 0.2,
        color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      angle: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.fillStyle = color;
      c.beginPath();
      // Draw organic petal path
      c.moveTo(0, 0);
      c.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      c.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      c.fill();
      c.restore();
    };

    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      angle: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, -size / 4);
      c.bezierCurveTo(-size / 2, -size, -size, -size / 2, -size, 0);
      c.bezierCurveTo(-size, size / 2, -size / 4, size * 0.8, 0, size);
      c.bezierCurveTo(size / 4, size * 0.8, size, size / 2, size, 0);
      c.bezierCurveTo(size, -size / 2, size / 2, -size, 0, -size / 4);
      c.fill();
      c.restore();
    };

    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      angle: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.fillStyle = color;
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.rotate(Math.PI / 2);
        c.lineTo(0, -size);
        c.lineTo(size * 0.2, -size * 0.2);
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a luxury deep background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, "#1c0d12"); // deep warm plum/black
      bgGrad.addColorStop(0.5, "#0d0508"); // soft charcoal plum
      bgGrad.addColorStop(1, "#040102"); // ultra deep charcoal
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw mouse glow
      const mouse = mouseRef.current;
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          150
        );
        glowGrad.addColorStop(0, "rgba(220, 160, 170, 0.08)");
        glowGrad.addColorStop(0.5, "rgba(255, 215, 120, 0.02)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
        ctx.fill();

        // Spawn a trailing mouse sparkle occasionally
        if (Math.random() < 0.25) {
          particles.push({
            x: mouse.x + (Math.random() * 20 - 10),
            y: mouse.y + (Math.random() * 20 - 10),
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            opacity: 0.9,
            color: `rgba(255, ${200 + Math.random() * 55}, ${100 + Math.random() * 100}, 0.8)`,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            type: "sparkle",
          });
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Apply gentle wind to rose petals
        if (p.type === "rose-petal") {
          p.speedX += Math.sin(p.y * 0.01 + p.x * 0.005) * 0.02;
        }

        // Draw based on type
        if (p.type === "rose-petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.rotation);
        } else if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation);
        } else if (p.type === "sparkle") {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.rotation);
        } else if (p.type === "bokeh") {
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Standard star
          ctx.save();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.3 + 0.7 * Math.sin(Date.now() * 0.001 * p.speedY))})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();
        }

        // Fade out trailing sparkles
        if (p.opacity <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Recycle standard particles when offscreen
        const isOffscreen = p.y > height + 20 || p.x < -40 || p.x > width + 40;
        if (isOffscreen) {
          if (particles.length > maxParticles) {
            // Remove trail particles that are offscreen
            particles.splice(i, 1);
          } else {
            // Reset to top
            particles[i] = createParticle(false);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resizes
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="wedding-ambient-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
