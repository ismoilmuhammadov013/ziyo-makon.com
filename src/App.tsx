/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, TaskItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { SchedulePlanner } from './components/SchedulePlanner';
import { ScientificSimulators } from './components/ScientificSimulators';
import { QuizCenter } from './components/QuizCenter';
import { PomodoroTimer } from './components/PomodoroTimer';
import { FormulaDirectory } from './components/FormulaDirectory';
import { StudentCalculators } from './components/StudentCalculators';

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 't1',
    title: 'Algebra: Kvadrat tenglamalar bo‘yicha 15 ta misol yechish (45-bet)',
    subject: 'Matematika',
    dueDate: 'Bugun',
    completed: false,
    priority: 'yuqori',
    notes: 'Viyet teoremasidan foydalanib tekshirish'
  },
  {
    id: 't2',
    title: 'Fizika: Nyutonning 2-qonuni amaliy masalalari va konspekt tayyorlash',
    subject: 'Fizika',
    dueDate: 'Ertaga',
    completed: false,
    priority: 'yuqori'
  },
  {
    id: 't3',
    title: 'Ingliz tili: 20 ta yangi akademik so‘zni yodlash va gap tuzish',
    subject: 'Ingliz tili',
    dueDate: 'Juma kunigacha',
    completed: true,
    priority: 'orta'
  },
  {
    id: 't4',
    title: 'Tarix: Amir Temur davlati xaritasi va ma’lumotlarini ko‘rib chiqish',
    subject: 'Tarix',
    dueDate: 'Shanba kunigacha',
    completed: false,
    priority: 'past'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('ziyomakon_tasks_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('ziyomakon_tasks_v1', JSON.stringify(tasks));
  }, [tasks]);

  const pendingTasksCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Contract Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingTasksCount={pendingTasksCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <HeroSection
            setActiveTab={setActiveTab}
            pendingTasksCount={pendingTasksCount}
          />
        )}

        {activeTab === 'schedule' && (
          <SchedulePlanner
            tasks={tasks}
            setTasks={setTasks}
          />
        )}

        {activeTab === 'simulators' && (
          <ScientificSimulators />
        )}

        {activeTab === 'quizzes' && (
          <QuizCenter />
        )}

        {activeTab === 'formulas' && (
          <FormulaDirectory />
        )}

        {activeTab === 'pomodoro' && (
          <PomodoroTimer />
        )}

        {activeTab === 'calculators' && (
          <StudentCalculators />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
