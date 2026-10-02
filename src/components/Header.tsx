import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Calendar, BookOpen, Clock, Activity, CheckSquare } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  pendingTasksCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, pendingTasksCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display style */}
        <button
          onClick={() => setActiveTab('overview')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors focus-visible:outline-none text-left"
        >
          ZiyoMakon
        </button>

        {/* Zone 2: 4–6 clean text navigation links with subtle underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'overview'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Asosiy
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'schedule'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Dars Jadvali
          </button>
          <button
            onClick={() => setActiveTab('simulators')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'simulators'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Ilmiy Laboratoriya
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'quizzes'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Testlar & DTM
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'formulas'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Formulalar & Lug‘at
          </button>
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`transition-colors hover:text-slate-900 pb-1 ${
              activeTab === 'pomodoro'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : ''
            }`}
          >
            Fokus Taymer
          </button>
        </nav>

        {/* Zone 3: 1–2 primary single-line action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('schedule')}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap"
            title="Uyga vazifalar"
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span className="tabular-nums font-mono">{pendingTasksCount}</span>
            <span>Vazifalar</span>
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Laboratoriyaga o‘tish</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'overview' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Asosiy
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'schedule' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Jadval & Vazifalar
        </button>
        <button
          onClick={() => setActiveTab('simulators')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'simulators' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Laboratoriya
        </button>
        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'quizzes' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Testlar
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'formulas' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Formulalar
        </button>
        <button
          onClick={() => setActiveTab('pomodoro')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'pomodoro' ? 'bg-white font-semibold text-emerald-700 shadow-xs' : 'text-slate-600'}`}
        >
          Taymer
        </button>
      </div>
    </header>
  );
};
