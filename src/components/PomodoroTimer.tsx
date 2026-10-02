import React, { useState, useEffect } from 'react';
import { playAmbientSound, stopAmbientSound, playTimerChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Coffee, 
  BookOpen, 
  Sparkles, 
  CheckCircle,
  Flame,
  CloudRain,
  Waves,
  Radio,
  Wind
} from 'lucide-react';

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeSound, setActiveSound] = useState<'off' | 'rain' | 'stream' | 'whitenoise' | 'binaural'>('off');
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    return parseInt(localStorage.getItem('ziyomakon_pomo_streak') || '0', 10);
  });

  // Switch modes
  const handleSetMode = (newMode: 'study' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'study') setSecondsLeft(25 * 60);
    else if (newMode === 'shortBreak') setSecondsLeft(5 * 60);
    else if (newMode === 'longBreak') setSecondsLeft(15 * 60);
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playTimerChime();

      if (mode === 'study') {
        const nextStreak = completedSessions + 1;
        setCompletedSessions(nextStreak);
        localStorage.setItem('ziyomakon_pomo_streak', nextStreak.toString());
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, mode, completedSessions]);

  // Audio control
  const handleToggleSound = (type: 'rain' | 'stream' | 'whitenoise' | 'binaural') => {
    if (activeSound === type) {
      stopAmbientSound();
      setActiveSound('off');
    } else {
      playAmbientSound(type);
      setActiveSound(type);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const totalTimeForMode = mode === 'study' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const progressPercent = ((totalTimeForMode - secondsLeft) / totalTimeForMode) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Pomodoro Fokus & Diqqat Markazi
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          25 daqiqa to‘liq chalg‘imasdan dars qiling, so‘ngra 5 daqiqa miyangizga dam bering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Timer Display (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs flex flex-col items-center">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold mb-8">
            <button
              onClick={() => handleSetMode('study')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'study'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dars vaqti (25 min)
            </button>
            <button
              onClick={() => handleSetMode('shortBreak')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'shortBreak'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Qisqa tanaffus (5 min)
            </button>
            <button
              onClick={() => handleSetMode('longBreak')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'longBreak'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Katta tanaffus (15 min)
            </button>
          </div>

          {/* Circular Visual Progress & Time Display */}
          <div className="relative w-64 h-64 flex flex-col items-center justify-center my-4">
            {/* SVG Circle Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-slate-100"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-emerald-600 transition-all duration-500 ease-linear"
                strokeWidth="5"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Time Digits */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold font-mono tracking-tight text-slate-900 tabular-nums">
                {timeFormatted}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                {mode === 'study' ? 'Chuqur diqqat' : 'Dam olish'}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pauza' : 'Boshlash'}</span>
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                handleSetMode(mode);
              }}
              className="p-2.5 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Qayta boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Session completed streak */}
          <div className="mt-8 pt-6 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Flame className="w-4 h-4 text-amber-500" />
              Bugungi tugatilgan sessiyalar:
            </span>
            <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
              {completedSessions} ta sessiya
            </span>
          </div>
        </div>

        {/* Ambient Soundscapes & Study Guide (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Soundscapes Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>O‘qish Fon Tovushlari (Web Audio)</span>
              </h3>
              {activeSound !== 'off' && (
                <button
                  onClick={() => {
                    stopAmbientSound();
                    setActiveSound('off');
                  }}
                  className="text-xs text-rose-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>O‘chirish</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
              Tashqi chalg‘ituvchi shovqinlarni bartaraf etish va miya faoliyatini jamlash uchun tinchlantiruvchi sintetik audio:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleToggleSound('rain')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer flex flex-col justify-between h-20 ${
                  activeSound === 'rain'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CloudRain className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="font-semibold">Yomg‘ir sadosi</div>
                  <div className="text-[10px] text-slate-500 font-normal">Pushti shovqin</div>
                </div>
              </button>

              <button
                onClick={() => handleToggleSound('stream')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer flex flex-col justify-between h-20 ${
                  activeSound === 'stream'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Waves className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-semibold">Oqim & Shovullash</div>
                  <div className="text-[10px] text-slate-500 font-normal">Tog‘ bulog‘i</div>
                </div>
              </button>

              <button
                onClick={() => handleToggleSound('whitenoise')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer flex flex-col justify-between h-20 ${
                  activeSound === 'whitenoise'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Wind className="w-4 h-4 text-slate-600" />
                <div>
                  <div className="font-semibold">Oq Shovqin</div>
                  <div className="text-[10px] text-slate-500 font-normal">Kitobxon fokus</div>
                </div>
              </button>

              <button
                onClick={() => handleToggleSound('binaural')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer flex flex-col justify-between h-20 ${
                  activeSound === 'binaural'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Radio className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="font-semibold">432 Hz Alfa To‘lqin</div>
                  <div className="text-[10px] text-slate-500 font-normal">Binaural garmoniya</div>
                </div>
              </button>
            </div>
          </div>

          {/* Aesthetic Focus Illustration Card */}
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white relative shadow-xs">
            <img
              src="/src/assets/images/library_focus_study_1790934838176.jpg"
              alt="O‘quv stoli"
              className="w-full h-44 object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 flex flex-col justify-end">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Oltin Qoida
              </span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                «Kichik, ammo muntazam qadamlar — yirik g‘alabalarga olib boradi. Har kuni 4 ta pomodoro bloki sizni sinfning eng a’lochisi qiladi.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
