import React, { useState, useEffect, useRef } from 'react';
import { ELEMENTS_DATA } from '../data/elements';
import { ChemicalElement } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Info, 
  Atom, 
  Compass, 
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

export const ScientificSimulators: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pendulum' | 'function' | 'periodic'>('pendulum');

  // --- 1. PENDULUM SIMULATOR STATE ---
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [length, setLength] = useState<number>(1.2); // meters
  const [mass, setMass] = useState<number>(1.0); // kg
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'moon' | 'mars' | 'jupiter'>('earth');
  const [customGravity, setCustomGravity] = useState<number>(9.8);
  const [initialAngle, setInitialAngle] = useState<number>(35); // degrees
  
  // Realtime physics values
  const angleRef = useRef<number>((35 * Math.PI) / 180);
  const angularVelocityRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [kineticRatio, setKineticRatio] = useState<number>(0);
  const [potentialRatio, setPotentialRatio] = useState<number>(1);
  const [periodT, setPeriodT] = useState<number>(2.2);

  // Update gravity according to preset
  useEffect(() => {
    let g = 9.8;
    if (gravityPreset === 'earth') g = 9.8;
    else if (gravityPreset === 'moon') g = 1.62;
    else if (gravityPreset === 'mars') g = 3.72;
    else if (gravityPreset === 'jupiter') g = 24.79;
    setCustomGravity(g);
    // Period T = 2 * pi * sqrt(L / g)
    const T = 2 * Math.PI * Math.sqrt(length / g);
    setPeriodT(Number(T.toFixed(2)));
  }, [gravityPreset, length]);

  // Reset pendulum angle
  const handleResetPendulum = () => {
    angleRef.current = (initialAngle * Math.PI) / 180;
    angularVelocityRef.current = 0;
  };

  // Canvas Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // cap delta time
      lastTime = currentTime;

      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = 40;

      // Physics integration (Euler-Cromer)
      if (isPlaying) {
        const angularAcceleration = -(customGravity / length) * Math.sin(angleRef.current);
        // Subtle air resistance damping (0.9992)
        angularVelocityRef.current = (angularVelocityRef.current + angularAcceleration * dt) * 0.9995;
        angleRef.current += angularVelocityRef.current * dt;
      }

      // Pixel scaling: 1m = 160px
      const pixelLength = length * 150;
      const bobX = originX + pixelLength * Math.sin(angleRef.current);
      const bobY = originY + pixelLength * Math.cos(angleRef.current);

      // Energy calculation
      const maxH = length * (1 - Math.cos((initialAngle * Math.PI) / 180));
      const currentH = length * (1 - Math.cos(angleRef.current));
      const pot = Math.max(0, currentH / (maxH || 0.001));
      const kin = Math.max(0, 1 - pot);

      setPotentialRatio(Math.min(1, pot));
      setKineticRatio(Math.min(1, kin));

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw subtle coordinate reference grid
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vertical equilibrium guide
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, originY + pixelLength + 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Pendulum Arm (String)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw Pivot Point
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(originX, originY, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Bob (Pendulum sphere)
      const bobRadius = 14 + mass * 4;
      const gradient = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, bobRadius);
      gradient.addColorStop(0, '#38BDF8');
      gradient.addColorStop(1, '#0284C7');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#0369A1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Live angle arc
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(originX, originY, 50, Math.PI / 2, Math.PI / 2 + angleRef.current, angleRef.current < 0);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, length, customGravity, mass, initialAngle]);

  // --- 2. FUNCTION PLOTTER STATE ---
  const [funcType, setFuncType] = useState<'quadratic' | 'linear' | 'sine'>('quadratic');
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-2);
  const [paramC, setParamC] = useState<number>(-3);
  const funcCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = funcCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 25; // 25px per 1 unit

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Axes (X and Y)
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1.5;
    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis numbers
    ctx.fillStyle = '#64748B';
    ctx.font = '10px JetBrains Mono, monospace';
    for (let x = -8; x <= 8; x += 2) {
      if (x !== 0) {
        ctx.fillText(x.toString(), originX + x * scale - 4, originY + 14);
      }
    }
    for (let y = -6; y <= 6; y += 2) {
      if (y !== 0) {
        ctx.fillText((-y).toString(), originX + 6, originY + y * scale + 3);
      }
    }

    // Plot Function Curve
    ctx.strokeStyle = '#059669'; // Emerald
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let started = false;
    for (let px = 0; px < width; px += 2) {
      const x = (px - originX) / scale;
      let y = 0;

      if (funcType === 'quadratic') {
        y = paramA * x * x + paramB * x + paramC;
      } else if (funcType === 'linear') {
        y = paramA * x + paramB;
      } else if (funcType === 'sine') {
        y = paramA * Math.sin(paramB * x);
      }

      const py = originY - y * scale;

      if (py >= -20 && py <= height + 20) {
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Draw Vertex & roots for quadratic
    if (funcType === 'quadratic' && paramA !== 0) {
      const vx = -paramB / (2 * paramA);
      const vy = paramA * vx * vx + paramB * vx + paramC;
      const vpx = originX + vx * scale;
      const vpy = originY - vy * scale;

      // Draw vertex dot
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(vpx, vpy, 4.5, 0, 2 * Math.PI);
      ctx.fill();

      // Real roots if D >= 0
      const D = paramB * paramB - 4 * paramA * paramC;
      if (D >= 0) {
        const x1 = (-paramB - Math.sqrt(D)) / (2 * paramA);
        const x2 = (-paramB + Math.sqrt(D)) / (2 * paramA);

        ctx.fillStyle = '#0284C7';
        [x1, x2].forEach(r => {
          const rpx = originX + r * scale;
          ctx.beginPath();
          ctx.arc(rpx, originY, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }, [funcType, paramA, paramB, paramC]);

  // Quadratic roots math
  const quadD = paramB * paramB - 4 * paramA * paramC;
  const quadVertexX = paramA !== 0 ? (-paramB / (2 * paramA)).toFixed(2) : '0';
  const quadVertexY = paramA !== 0 ? (paramA * Math.pow(-paramB / (2 * paramA), 2) + paramB * (-paramB / (2 * paramA)) + paramC).toFixed(2) : '0';

  // --- 3. PERIODIC TABLE STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(ELEMENTS_DATA[0]);
  const [elementSearch, setElementSearch] = useState<string>('');

  const filteredElements = ELEMENTS_DATA.filter(el => {
    const matchesCat = selectedCategory === 'all' || el.category === selectedCategory;
    const matchesQuery =
      el.name.toLowerCase().includes(elementSearch.toLowerCase()) ||
      el.symbol.toLowerCase().includes(elementSearch.toLowerCase()) ||
      el.number.toString().includes(elementSearch);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Subtab Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Ilmiy Laboratoriya & Interaktiv Modellar
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Fizika mayatnigi, matematik funksiya grafiki va kimyoviy elementlar bilan tajribalar o‘tkazing.
          </p>
        </div>

        {/* Clean Segmented Control Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('pendulum')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'pendulum'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fizika: Mayatnik
          </button>
          <button
            onClick={() => setActiveSubTab('function')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'function'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Matematika: Funksiya
          </button>
          <button
            onClick={() => setActiveSubTab('periodic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'periodic'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kimyo: Mendeleyev
          </button>
        </div>
      </div>

      {/* --- SUBTAB 1: PENDULUM SIMULATOR (Two-Zone Layout) --- */}
      {activeSubTab === 'pendulum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: Interactive Stage (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">
                Matematik Mayatnik Dinamikasi
              </span>
              <div className="flex items-center gap-2">
                <span>Davr: <strong className="text-slate-900 font-mono tabular-nums">{periodT} s</strong></span>
                <span aria-hidden="true">·</span>
                <span>Gravitatsiya: <strong className="text-slate-900 font-mono tabular-nums">{customGravity} m/s²</strong></span>
              </div>
            </div>

            {/* Canvas Stage */}
            <div className="relative w-full max-w-md h-[340px] my-2 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={400}
                height={340}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Real-time Energy Distribution Gauge */}
            <div className="w-full mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                  Kinetik Energiya (E_k): <span className="font-mono tabular-nums">{Math.round(kineticRatio * 100)}%</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Potensial Energiya (E_p): <span className="font-mono tabular-nums">{Math.round(potentialRatio * 100)}%</span>
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-sky-500 transition-all duration-75"
                  style={{ width: `${kineticRatio * 100}%` }}
                />
                <div
                  className="bg-emerald-500 transition-all duration-75"
                  style={{ width: `${potentialRatio * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Zone: Control & Concept Deck (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>Simulyatsiya Parametrlari</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mayatnik uzunligi, massasi va gravitatsiya muhitini o‘zgartiring.
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'To‘xtatish (Pause)' : 'Davom ettirish (Play)'}</span>
              </button>
              <button
                onClick={handleResetPendulum}
                className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Boshlang‘ich holatga qaytarish"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Slider 1: Length */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Ip uzunligi (L)</span>
                <span className="font-mono text-slate-900 tabular-nums">{length.toFixed(1)} metr</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={length}
                onChange={e => setLength(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5 m (Tez)</span>
                <span>2.0 m (Sekin)</span>
              </div>
            </div>

            {/* Slider 2: Mass */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Osilgan yuk massasi (m)</span>
                <span className="font-mono text-slate-900 tabular-nums">{mass.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={mass}
                onChange={e => setMass(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Slider 3: Initial Angle */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Og‘ish burchagi (θ)</span>
                <span className="font-mono text-slate-900 tabular-nums">{initialAngle}°</span>
              </div>
              <input
                type="range"
                min="10"
                max="75"
                step="5"
                value={initialAngle}
                onChange={e => {
                  const val = parseInt(e.target.value, 10);
                  setInitialAngle(val);
                  angleRef.current = (val * Math.PI) / 180;
                  angularVelocityRef.current = 0;
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Celestial Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Sayyora Gravitatsiyasi (Erkin tushish tezlanishi g)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGravityPreset('earth')}
                  className={`p-2 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    gravityPreset === 'earth'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Yer (g = 9.8 m/s²)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Standart muhit</div>
                </button>
                <button
                  onClick={() => setGravityPreset('moon')}
                  className={`p-2 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    gravityPreset === 'moon'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Oy (g = 1.62 m/s²)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Past tortishish</div>
                </button>
                <button
                  onClick={() => setGravityPreset('mars')}
                  className={`p-2 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    gravityPreset === 'mars'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Mars (g = 3.72 m/s²)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Qizil sayyora</div>
                </button>
                <button
                  onClick={() => setGravityPreset('jupiter')}
                  className={`p-2 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    gravityPreset === 'jupiter'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Yupiter (g = 24.8 m/s²)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Kuchli tortishish</div>
                </button>
              </div>
            </div>

            {/* Scientific Explanation Callout */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hyuigens Formulasi:</span>
              </div>
              <p className="font-mono text-emerald-800 font-semibold text-sm">
                T = 2π · √(L / g)
              </p>
              <p className="text-[11px] text-slate-500">
                E’tibor bering: mayatnikning tebranish davri (T) osilgan yuk massasiga bog‘liq emas! Faqat ip uzunligi (L) va erkin tushish tezlanishiga (g) bog‘liq.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB 2: MATHEMATICAL FUNCTION PLOTTER --- */}
      {activeSubTab === 'function' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Plotter Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Dekart Koordinatalar Tekisligi
              </span>
              <span className="font-mono text-emerald-700 font-bold text-sm">
                {funcType === 'quadratic' && `y = ${paramA}x² ${paramB >= 0 ? '+ ' + paramB : paramB}x ${paramC >= 0 ? '+ ' + paramC : paramC}`}
                {funcType === 'linear' && `y = ${paramA}x ${paramB >= 0 ? '+ ' + paramB : paramB}`}
                {funcType === 'sine' && `y = ${paramA} · sin(${paramB}x)`}
              </span>
            </div>

            <div className="relative w-full max-w-md h-[360px] my-3 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden">
              <canvas
                ref={funcCanvasRef}
                width={420}
                height={360}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Quadratic Analysis Badges */}
            {funcType === 'quadratic' && (
              <div className="w-full grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-100 text-xs text-center">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Diskriminant (D)</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5 tabular-nums">
                    D = {quadD}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Parabola cho‘qqisi</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5 tabular-nums">
                    ({quadVertexX}; {quadVertexY})
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Ildizlar soni</div>
                  <div className="font-mono font-bold text-emerald-700 mt-0.5">
                    {quadD > 0 ? '2 ta haqiqiy' : quadD === 0 ? '1 ta karrali' : 'Ildizga ega emas'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plotter Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Funksiya Turini Tanlang
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Koeffitsiyentlarni o‘zgartirib grafikning qanday siljishini kuzating.
              </p>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFuncType('quadratic')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  funcType === 'quadratic'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Parabola
              </button>
              <button
                onClick={() => setFuncType('linear')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  funcType === 'linear'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Chiziqli
              </button>
              <button
                onClick={() => setFuncType('sine')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  funcType === 'sine'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Sinusoidal
              </button>
            </div>

            {/* Parameter A */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Parametr a</span>
                <span className="font-mono text-slate-900 tabular-nums">{paramA}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={paramA}
                onChange={e => setParamA(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="text-[10px] text-slate-400">
                {funcType === 'quadratic'
                  ? paramA > 0
                    ? 'a > 0: Shoxlari yuqoriga qaragan'
                    : paramA < 0
                    ? 'a < 0: Shoxlari pastga qaragan'
                    : 'a = 0: Chiziqli funksiyaga aylanadi'
                  : 'Balandlik / qiyalik koeffitsiyenti'}
              </div>
            </div>

            {/* Parameter B */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Parametr b</span>
                <span className="font-mono text-slate-900 tabular-nums">{paramB}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={paramB}
                onChange={e => setParamB(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Parameter C (for quadratic) */}
            {funcType === 'quadratic' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Parametr c (Ozod had)</span>
                  <span className="font-mono text-slate-900 tabular-nums">{paramC}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={paramC}
                  onChange={e => setParamC(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="text-[10px] text-slate-400">
                  Grafik Y o‘qini (0; {paramC}) nuqtada kesib o‘tadi
                </div>
              </div>
            )}

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-900 leading-relaxed">
              <strong>Mantiqiy xulosa:</strong> Slayderlarni surish orqali formuladagi o‘zgaruvchilar grafik geometriyasiga qanday ta’sir qilishini vizual eslab qolish juda oson!
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB 3: INTERACTIVE MENDELEYEV PERIODIC TABLE --- */}
      {activeSubTab === 'periodic' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-slate-400 shrink-0">Toifa:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Barchasi ({ELEMENTS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedCategory('nometall')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === 'nometall'
                    ? 'bg-emerald-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Nometallar
              </button>
              <button
                onClick={() => setSelectedCategory('metall')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === 'metall'
                    ? 'bg-blue-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Metallar
              </button>
              <button
                onClick={() => setSelectedCategory('otish')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === 'otish'
                    ? 'bg-purple-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                O‘tish metallari
              </button>
              <button
                onClick={() => setSelectedCategory('inert')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === 'inert'
                    ? 'bg-amber-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Inert gazlar
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Element nomi yoki ramzi (H, Fe, Oltin)..."
                value={elementSearch}
                onChange={e => setElementSearch(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Elements Grid (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Elementni tanlang va batafsil xususiyatlarini o‘rganing:
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
                {filteredElements.map(el => (
                  <button
                    key={el.number}
                    onClick={() => setSelectedElement(el)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-between h-20 ${
                      selectedElement?.number === el.number
                        ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>{el.number}</span>
                      <span>{el.period}-d</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 font-mono">
                      {el.symbol}
                    </div>
                    <div className="text-[10px] text-slate-600 truncate w-full font-medium">
                      {el.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Element Card (4 cols) */}
            {selectedElement && (
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs sticky top-20">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-mono shadow-xs">
                      <span className="text-[10px] opacity-75">{selectedElement.number}</span>
                      <span className="text-lg font-bold leading-none">{selectedElement.symbol}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {selectedElement.name}
                      </h4>
                      <p className="text-xs text-slate-500 capitalize">
                        Toifa: {selectedElement.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Atom massasi:</span>
                    <span className="font-mono font-semibold text-slate-800 tabular-nums">
                      {selectedElement.mass} a.m.b
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Elektron konfiguratsiya:</span>
                    <span className="font-mono font-semibold text-emerald-700">
                      {selectedElement.electronConfig}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Davriy jadvaldagi o‘rni:</span>
                    <span className="font-mono text-slate-800">
                      {selectedElement.period}-davr, {selectedElement.group}-guruh
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-500 font-semibold block mb-1">
                      Xususiyati va qo‘llanilishi:
                    </span>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {selectedElement.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
