import React, { useEffect, useRef } from 'react';

interface BackgroundShaderProps {
  accentRgb?: [number, number, number];
}

export const BackgroundShader: React.FC<BackgroundShaderProps> = ({
  accentRgb = [0.35, 0.05, 0.12],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const accentRef = useRef<[number, number, number]>(accentRgb);

  useEffect(() => {
    accentRef.current = accentRgb;
  }, [accentRgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_accent;

      void main() {
        vec2 uv = v_texCoord;
        vec3 color = vec3(0.045, 0.045, 0.048); // Charcoal base

        // Smooth flowing liquid/smoke effect
        float noise = sin(uv.x * 2.8 + u_time * 0.45) * cos(uv.y * 2.2 - u_time * 0.28);
        noise += 0.5 * sin(uv.x * 9.0 + u_time * 1.1) * cos(uv.y * 7.5 + u_time * 0.7);

        // Dynamic accent glow based on selected flavor
        float glow = smoothstep(0.38, 0.82, noise + 0.5);
        color += u_accent * glow * 0.28;

        // Subtle vignette
        float dist = distance(uv, vec2(0.5));
        color *= (1.0 - dist * 0.48);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn('Shader compile failed', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Program link failed', gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uAccent = gl.getUniformLocation(prog, 'u_accent');

    // Smooth color interpolation for silky transitions between flavors
    let currentR = accentRef.current[0];
    let currentG = accentRef.current[1];
    let currentB = accentRef.current[2];

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const displayW = Math.floor(w * dpr);
      const displayH = Math.floor(h * dpr);

      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    let startTime = performance.now();

    const render = (now: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);

      const elapsed = (now - startTime) * 0.001;

      // Lerp accent color toward target
      const [targetR, targetG, targetB] = accentRef.current;
      currentR += (targetR - currentR) * 0.04;
      currentG += (targetG - currentG) * 0.04;
      currentB += (targetB - currentB) * 0.04;

      if (uTime) gl.uniform1f(uTime, elapsed);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uAccent) gl.uniform3f(uAccent, currentR, currentG, currentB);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Light gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-[#0e0e0e]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/30 to-[#0e0e0e]" />
    </div>
  );
};
