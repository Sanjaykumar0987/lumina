import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBottleHeroProps {
  accentColor?: string;
  onClick?: () => void;
}

export const ThreeBottleHero: React.FC<ThreeBottleHeroProps> = ({
  accentColor = '#ff4d6d',
  onClick,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<string>(accentColor);

  useEffect(() => {
    colorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Primary rim lights
    const spotLight1 = new THREE.SpotLight(0xffffff, 2.2);
    spotLight1.position.set(6, 7, 6);
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0xffffff, 1.4);
    spotLight2.position.set(-6, -4, 4);
    scene.add(spotLight2);

    // Colored accent rim light matching active flavor
    const accentLight = new THREE.PointLight(new THREE.Color(colorRef.current), 3.0, 10);
    accentLight.position.set(0, 1, 3.5);
    scene.add(accentLight);

    // Bottle Group
    const bottleGroup = new THREE.Group();

    // Outer Glass Body
    const bodyGeo = new THREE.CylinderGeometry(0.78, 0.82, 2.6, 36, 1, false);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1c,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const body = new THREE.Mesh(bodyGeo, glassMat);
    bottleGroup.add(body);

    // Inner Liquid Core
    const liquidGeo = new THREE.CylinderGeometry(0.72, 0.74, 2.3, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorRef.current),
      roughness: 0.3,
      metalness: 0.2,
      emissive: new THREE.Color(colorRef.current),
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.1;
    bottleGroup.add(liquid);

    // Curved Shoulder / Neck
    const neckGeo = new THREE.SphereGeometry(0.78, 36, 36, 0, Math.PI * 2, 0, Math.PI / 2);
    const neck = new THREE.Mesh(neckGeo, glassMat);
    neck.position.y = 1.3;
    bottleGroup.add(neck);

    // Bottle Neck Collar
    const collarGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.45, 32);
    const collar = new THREE.Mesh(collarGeo, glassMat);
    collar.position.y = 1.7;
    bottleGroup.add(collar);

    // Sleek Noir Metal Cap
    const capGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.4, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x111112,
      metalness: 0.9,
      roughness: 0.25,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.95;
    bottleGroup.add(cap);

    // Minimal Brand Label Ring
    const labelGeo = new THREE.CylinderGeometry(0.79, 0.80, 0.9, 36, 1, true);
    const labelMat = new THREE.MeshBasicMaterial({
      color: 0x111112,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.y = -0.05;
    bottleGroup.add(label);

    bottleGroup.rotation.z = -0.06;
    bottleGroup.rotation.x = 0.08;
    scene.add(bottleGroup);

    // Floating botanical particles (ingredients)
    const ingredientCount = 20;
    const ingredients: THREE.Mesh[] = [];
    const ingredientGeo = new THREE.IcosahedronGeometry(0.09, 0);
    const ingredientMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorRef.current),
      roughness: 0.4,
      metalness: 0.3,
      emissive: new THREE.Color(colorRef.current),
      emissiveIntensity: 0.4,
    });

    for (let i = 0; i < ingredientCount; i++) {
      const p = new THREE.Mesh(ingredientGeo, ingredientMat);
      p.position.set(
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3.5
      );
      const scale = 0.6 + Math.random() * 0.8;
      p.scale.set(scale, scale, scale);
      scene.add(p);
      ingredients.push(p);
    }

    // Mouse tracking for parallax tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const delta = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;

      // Update dynamic colors
      const targetColor = new THREE.Color(colorRef.current);
      accentLight.color.lerp(targetColor, 0.05);
      liquidMat.color.lerp(targetColor, 0.05);
      liquidMat.emissive.lerp(targetColor, 0.05);
      ingredientMat.color.lerp(targetColor, 0.05);
      ingredientMat.emissive.lerp(targetColor, 0.05);

      // Bottle rotation and float
      bottleGroup.rotation.y += 0.007;
      bottleGroup.rotation.x = 0.08 + targetY * 0.4;
      bottleGroup.rotation.z = -0.06 + targetX * 0.4;
      bottleGroup.position.y = Math.sin(delta * 1.5) * 0.12;

      // Particles orbital wobble
      ingredients.forEach((p, idx) => {
        p.position.y += Math.sin(delta * 1.8 + idx) * 0.004;
        p.rotation.x += 0.012;
        p.rotation.y += 0.015;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeo.dispose();
      liquidGeo.dispose();
      neckGeo.dispose();
      collarGeo.dispose();
      capGeo.dispose();
      labelGeo.dispose();
      ingredientGeo.dispose();
      glassMat.dispose();
      liquidMat.dispose();
      capMat.dispose();
      labelMat.dispose();
      ingredientMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="w-full h-full cursor-pointer relative select-none flex items-center justify-center"
      title="Interactive 3D LUMINA Vessel — Click to explore flavor in lab"
    />
  );
};
