import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-white">ZiyoMakon</span>
            <p className="mt-3 text-sm text-slate-300 max-w-md leading-relaxed">
              O‘zbekiston maktab o‘quvchilari, abituriyentlari va talabalari uchun intellektual va qulay raqamli ta’lim maydoni. Ilm olishni oson, qiziqarli va tizimli qilamiz.
            </p>
            <p className="mt-4 text-xs text-slate-300 italic">
              «Beshikdan to qabrgacha ilm izla.»
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              O‘quv Asboblari
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="hover:text-white transition-colors"
                >
                  Dars Jadvali & Reja
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('simulators')}
                  className="hover:text-white transition-colors"
                >
                  Ilmiy Laboratoriya & Simulyator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className="hover:text-white transition-colors"
                >
                  Fan Testlari & DTM
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('formulas')}
                  className="hover:text-white transition-colors"
                >
                  Formulalar & Lug‘at
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pomodoro')}
                  className="hover:text-white transition-colors"
                >
                  Pomodoro Fokus Taymeri
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Afzalliklari
            </h4>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <p>✓ 100% O‘zbek tilida to‘liq moslashtirilgan</p>
              <p>✓ Ma’lumotlar shaxsiy brauzeringizda saqlanadi</p>
              <p>✓ Reklamasiz va mutlaqo bepul ta’lim muhiti</p>
              <p>✓ Mobil telefon va kompyuterga to‘liq mos</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} ZiyoMakon Ta’lim Loyihasi. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>O‘zbekiston o‘quvchilari uchun maxsus tayyorlandi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
