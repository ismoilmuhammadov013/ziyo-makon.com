import React from 'react';
import { ActiveTab } from '../types';
import { 
  Calendar, 
  Activity, 
  CheckCircle2, 
  BookMarked, 
  Clock, 
  Calculator, 
  Sparkles, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  pendingTasksCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, pendingTasksCount }) => {
  return (
    <div className="space-y-12">
      {/* Editorial Hero Visual Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white min-h-[380px] sm:min-h-[440px] flex items-end shadow-lg">
        {/* Background Image with Fallback */}
        <img
          src="/src/assets/images/hero_ziyomakon_banner_1790934821622.jpg"
          alt="ZiyoMakon o‘quv maydoni"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity filter brightness-95"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        
        {/* Measured Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          {/* Metadata strictly unboxed with typographic dots */}
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium tracking-wide mb-3">
            <span>Intellektual Ta’lim Maydoni</span>
            <span aria-hidden="true">·</span>
            <span>Maktab & Kollej & Universitet</span>
            <span aria-hidden="true">·</span>
            <span>2026/2027 O‘quv Yili</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Bilim sari qadam qo‘yish — bugundan boshlanadi.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Dars jadvalingizni tartibga soling, murakkab fizika va matematika qonunlarini jonli simulyatorda sinab ko‘ring, DTM testlariga tayyorlaning va vaqtingizni unumli boshqaring.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('simulators')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Ilmiy Simulyatorlarni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-emerald-300" />
              <span>Test sinovidan o‘tish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quantitative Rigor Metrics Adjacent to Claim */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y border-slate-200 text-slate-700">
        <div className="px-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">100% Bepul</div>
          <div className="text-xs text-slate-500 mt-0.5">Reklamasiz, barcha o‘quvchilarga</div>
        </div>
        <div className="px-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">40+ Element</div>
          <div className="text-xs text-slate-500 mt-0.5">Interaktiv Mendeleyev jadvali</div>
        </div>
        <div className="px-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">6 Ta Fan</div>
          <div className="text-xs text-slate-500 mt-0.5">DTM va maktab testlar bazasi</div>
        </div>
        <div className="px-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">Mahalliy Saqlash</div>
          <div className="text-xs text-slate-500 mt-0.5">Jadval va vazifalar xotirada qoladi</div>
        </div>
      </div>

      {/* Primary Feature Sections Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              O‘quv Asboblari & Bo‘limlar
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              O‘zingizga kerakli bo‘limni tanlang va bilim olishni boshlang
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Dars Jadvali */}
          <div
            onClick={() => setActiveTab('schedule')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Dars Jadvali & Vazifalar
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Haftalik maktab darslarini rejalashtiring, uy vazifalarini kiriting va topshirish muddatini nazorat qiling.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{pendingTasksCount > 0 ? `${pendingTasksCount} ta bajarilmagan vazifa` : 'Barcha vazifalar bajarilgan'}</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ochish →
              </span>
            </div>
          </div>

          {/* Card 2: Ilmiy Simulyatorlar */}
          <div
            onClick={() => setActiveTab('simulators')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                Ilmiy Laboratoriya & Modellar
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Fizika mayatnigi, matematik parabola grafigi va interaktiv kimyoviy elementlar jadvali bilan jonli tajribalar o‘tkazing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Mayatnik · Funksiya · Mendeleyev</span>
              <span className="font-semibold text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Tajriba qilish →
              </span>
            </div>
          </div>

          {/* Card 3: Testlar & DTM */}
          <div
            onClick={() => setActiveTab('quizzes')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                Test Sinovlari & DTM Trenajyori
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Matematika, Fizika, Ona tili, Ingliz tili va Tarix fanlaridan o‘z bilimingizni sinab ko‘ring, tahlillarni o‘rganing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Haqiqiy testlar · Tahlil</span>
              <span className="font-semibold text-purple-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Sinovni boshlash →
              </span>
            </div>
          </div>

          {/* Card 4: Formulalar & Lug'at */}
          <div
            onClick={() => setActiveTab('formulas')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">
                Formulalar & Flesh-kartalar
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Algebra, Geometriya va Fizika fanlari bo‘yicha kerakli barcha formulalar to‘plami hamda Ingliz tili so‘z boyligini oshirish kartalari.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>80+ Formula · Lug‘at</span>
              <span className="font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ko‘rish →
              </span>
            </div>
          </div>

          {/* Card 5: Pomodoro Taymer */}
          <div
            onClick={() => setActiveTab('pomodoro')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-rose-700 transition-colors">
                Pomodoro Fokus & O‘quv Audio
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                25 daqiqalik to‘liq diqqat bloklari, yomg‘ir va tabiat fon tovushlari bilan darslarni chalg‘imasdan samarali o‘zlashtiring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>25 min dars · 5 min dam</span>
              <span className="font-semibold text-rose-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Taymerni yoqish →
              </span>
            </div>
          </div>

          {/* Card 6: O'quvchi Kalkulyatorlari */}
          <div
            onClick={() => setActiveTab('calculators')}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                O‘quvchi Tezkor Kalkulyatorlari
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Choraklik va semestrlik o‘rtacha bahoni hisoblash (GPA), Pifagor uchburchagi parametrlari va foiz hisoblagich.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>GPA · Foiz · Geometriya</span>
              <span className="font-semibold text-indigo-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Hisoblash →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Secondary Feature Showcase with Generated Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="order-2 md:order-1">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            Ilm-fan va amaliyot uyg‘unligi
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Nega aynan ZiyoMakon?
          </h3>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Ko‘pincha o‘quvchilar formulalarni yodlaydi, ammo ularning amaldagi ma’nosini ko‘ra olmaydi. Bizning simulyatorlarimiz orqali siz Nyuton qonunlari koinotda qanday ishlashini, erkin tushish tezlanishi Oyda va Marsda qanday o‘zgarishini o‘z qo‘llaringiz bilan boshqarib his qilasiz.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Har bir fan uchun eng zarur vositalar jamlanmasi</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Internet trafigini tejovchi yengil va tezkor arxitektura</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Testlar yakunida to‘liq tahlil va xatolar ustida ishlash imkoniyati</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('simulators')}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Simulyatorlarni sinab ko‘ring
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 rounded-xl overflow-hidden border border-slate-200 shadow-xs aspect-4/3 relative bg-slate-100">
          <img
            src="/src/assets/images/science_lab_preview_1790934852646.jpg"
            alt="Ilmiy laboratoriya"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
