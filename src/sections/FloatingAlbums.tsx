import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform float uTime;
  uniform float uScrollSpeed;
  uniform float uAmplitude;
  varying vec2 vUv;
  #define PI 3.141592653

  mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(
      oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                                 0.0,                                 0.0,                                 1.0
    );
  }

  vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
  }

  void main() {
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    float yDisp = uAmplitude * sin(worldPosition.x + uTime);
    pos.y += yDisp;

    float xDisp = uAmplitude * cos(worldPosition.y + uTime);
    pos.x += xDisp;

    float twist = uScrollSpeed * position.y;
    pos = rotate(pos, vec3(0.0, 0.0, 1.0), twist);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform sampler2D uCoverTexture;
  uniform float uIndex;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float bookWidth = 0.5;
    float isCover = step(uIndex * bookWidth, uv.x) * step(uv.x, (uIndex + 1.0) * bookWidth);

    vec4 coverColor = texture2D(uCoverTexture, uv);
    vec4 pageColor = texture2D(uTexture, uv);
    vec4 finalColor = mix(pageColor, coverColor, isCover);

    finalColor.r += 0.05 * sin(uTime * 0.5);
    finalColor.b += 0.05 * cos(uTime * 0.5);

    gl_FragColor = finalColor;
  }
`;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface BookData {
  texture: string;
  index: number;
  xOffset: number;
  verticalOffset: number;
  multiplier: number;
}

const books: BookData[] = [
  { texture: '/images/album_cover_1.jpg', index: 0, xOffset: -2.5, verticalOffset: 0, multiplier: 0.8 },
  { texture: '/images/album_cover_2.jpg', index: 1, xOffset: 0, verticalOffset: -0.5, multiplier: 1.0 },
  { texture: '/images/album_cover_3.jpg', index: 2, xOffset: 2.5, verticalOffset: 0.3, multiplier: 1.2 },
];

export default function FloatingAlbums() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bookMeshesRef = useRef<Array<{
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    group: THREE.Group;
    scroll: { current: number };
    multiplier: number;
    verticalOffset: number;
    update: (scroll: number) => void;
  }>>([]);
  const scrollRef = useRef({ current: 0, target: 0 });
  const rafRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());

  const initThree = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;
    cameraRef.current = camera;

    // Load textures
    const loader = new THREE.TextureLoader();
    const pageTexture = loader.load('/images/album_cover_2.jpg');

    books.forEach((bookData) => {
      const coverTexture = loader.load(bookData.texture);

      const geometry = new THREE.BoxGeometry(1.8, 2.4, 0.3, 30, 30, 1);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollSpeed: { value: 0 },
          uAmplitude: { value: 0.05 },
          uTexture: { value: pageTexture },
          uCoverTexture: { value: coverTexture },
          uIndex: { value: bookData.index },
        },
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const group = new THREE.Group();
      group.add(mesh);

      group.position.x = bookData.xOffset;
      group.rotation.y = bookData.index === 0 ? 0.2 : bookData.index === 2 ? -0.2 : 0;

      scene.add(group);

      const scrollObj = { current: 0 };

      bookMeshesRef.current.push({
        mesh,
        material,
        group,
        scroll: scrollObj,
        multiplier: bookData.multiplier,
        verticalOffset: bookData.verticalOffset,
        update: (scroll: number) => {
          scrollObj.current = lerp(scrollObj.current, scroll, 0.1);
          group.position.y = scrollObj.current * bookData.multiplier * 0.02 + bookData.verticalOffset;
        },
      });
    });
  }, []);

  useEffect(() => {
    initThree();

    const container = containerRef.current;
    if (!container) return;

    // ScrollTrigger for the section
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current.target = self.progress * 3 - 1.5;
      },
    });

    // Animation loop
    const animate = () => {
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!renderer || !scene || !camera) return;

      const elapsedTime = clockRef.current.getElapsedTime();
      const scroll = scrollRef.current;

      scroll.current = lerp(scroll.current, scroll.target, 0.1);
      const speed = (scroll.target - scroll.current) * 0.001;

      bookMeshesRef.current.forEach((book) => {
        book.material.uniforms.uTime.value = elapsedTime;
        book.material.uniforms.uScrollSpeed.value = speed;

        // Gentle floating rotation
        book.group.rotation.x = Math.sin(elapsedTime * 0.5 + book.multiplier) * 0.05;
        book.group.rotation.z = Math.cos(elapsedTime * 0.3 + book.multiplier) * 0.03;

        book.update(scroll.current);
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;

      const width = container.offsetWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      st.kill();
      window.removeEventListener('resize', handleResize);
      rendererRef.current?.dispose();
      bookMeshesRef.current = [];
    };
  }, [initThree]);

  return (
    <section id="portfolio" className="relative bg-[#090909]" style={{ height: '300vh' }}>
      <div
        ref={containerRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Section title overlay */}
        <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 z-10 pointer-events-none">
          <p
            className="text-champagne-gold text-lg mb-3"
            style={{ fontFamily: '"Allura", cursive' }}
          >
            Featured Work
          </p>
          <h2
            className="text-warm-ivory text-3xl md:text-5xl font-medium leading-tight max-w-sm"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            A Visual Style That Feels Clean, Premium &amp; Timeless
          </h2>
          <p className="text-soft-beige/60 text-xs uppercase tracking-[0.15em] mt-6 font-body">
            Scroll to explore
          </p>
          <a
            href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-champagne-gold text-[10px] uppercase tracking-[0.15em] font-body hover:text-warm-ivory transition-colors duration-300"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Book a session
          </a>
        </div>
      </div>
    </section>
  );
}
