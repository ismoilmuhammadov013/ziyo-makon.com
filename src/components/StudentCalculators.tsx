import React, { useState } from 'react';
import { Calculator, Percent, Triangle, Plus, Trash2, Award } from 'lucide-react';

interface GradeRow {
  id: string;
  subject: string;
  grade: number;
}

export const StudentCalculators: React.FC = () => {
  const [calcTab, setCalcTab] = useState<'gpa' | 'pythagoras' | 'percent'>('gpa');

  // GPA Calculator State
  const [grades, setGrades] = useState<GradeRow[]>([
    { id: '1', subject: 'Matematika', grade: 5 },
    { id: '2', subject: 'Fizika', grade: 5 },
    { id: '3', subject: 'Ona tili', grade: 4 },
    { id: '4', subject: 'Ingliz tili', grade: 5 },
    { id: '5', subject: 'Tarix', grade: 4 },
  ]);

  const [newSubName, setNewSubName] = useState('');
  const [newSubGrade, setNewSubGrade] = useState<number>(5);

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    setGrades(prev => [
      ...prev,
      { id: Date.now().toString(), subject: newSubName.trim(), grade: newSubGrade }
    ]);
    setNewSubName('');
  };

  const handleRemoveGrade = (id: string) => {
    setGrades(prev => prev.filter(g => g.id !== id));
  };

  const averageGPA = grades.length > 0
    ? (grades.reduce((acc, curr) => acc + curr.grade, 0) / grades.length).toFixed(2)
    : '0.00';

  // Pythagoras State
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);

  const hypoC = Math.sqrt(sideA * sideA + sideB * sideB).toFixed(2);
  const triArea = ((sideA * sideB) / 2).toFixed(2);
  const triPerimeter = (sideA + sideB + Math.sqrt(sideA * sideA + sideB * sideB)).toFixed(2);

  // Percent State
  const [baseNumber, setBaseNumber] = useState<number>(200);
  const [percentRate, setPercentRate] = useState<number>(15);

  const calculatedPercent = ((baseNumber * percentRate) / 100).toFixed(2);
  const totalWithAdd = (baseNumber + (baseNumber * percentRate) / 100).toFixed(2);
  const totalWithDiscount = (baseNumber - (baseNumber * percentRate) / 100).toFixed(2);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            O‘quvchi Tezkor Kalkulyatorlari
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            O‘rtacha baho (GPA), Pifagor uchburchagi va foizlarni bir zumda hisoblang.
          </p>
        </div>

        {/* Clean Segmented Control Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setCalcTab('gpa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              calcTab === 'gpa'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            O‘rtacha Baho (GPA)
          </button>
          <button
            onClick={() => setCalcTab('pythagoras')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              calcTab === 'pythagoras'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pifagor Uchburchagi
          </button>
          <button
            onClick={() => setCalcTab('percent')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              calcTab === 'percent'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foiz & Chegirma
          </button>
        </div>
      </div>

      {/* --- GPA CALCULATOR --- */}
      {calcTab === 'gpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Fanlar va olingan baholarni kiriting:
            </h3>

            <div className="space-y-2">
              {grades.map(g => (
                <div
                  key={g.id}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs"
                >
                  <span className="font-semibold text-slate-800">{g.subject}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-emerald-800 text-sm">
                      {g.grade} ball
                    </span>
                    <button
                      onClick={() => handleRemoveGrade(g.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add row form */}
            <form onSubmit={handleAddGrade} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Yangi fan nomi..."
                value={newSubName}
                onChange={e => setNewSubName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
              />
              <select
                value={newSubGrade}
                onChange={e => setNewSubGrade(parseInt(e.target.value, 10))}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
              >
                <option value={5}>5 (A’lo)</option>
                <option value={4}>4 (Yaxshi)</option>
                <option value={3}>3 (Qoniqarli)</option>
                <option value={2}>2 (Qoniqarsiz)</option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Qo‘shish</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                O‘rtacha ko‘rsatkich
              </span>
              <div className="text-4xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
                {averageGPA}
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-950 font-medium">
              {Number(averageGPA) >= 4.5
                ? 'Tabriklaymiz! Siz a’lochi o‘quvchisiz (Qizil attestat / Grant nomzodi)!'
                : Number(averageGPA) >= 4.0
                ? 'Yaxshi natija! Bir oz tirishsangiz, a’lochi bo‘lasiz!'
                : 'Qoniqarli. Bo‘sh vaqtingizda ko‘proq takrorlash tavsiya etiladi.'}
            </div>
          </div>
        </div>
      )}

      {/* --- PYTHAGORAS CALCULATOR --- */}
      {calcTab === 'pythagoras' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Triangle className="w-4 h-4 text-emerald-600" />
              <span>To‘g‘ri Burchakli Uchburchak Parametrlari</span>
            </h3>
            <span className="font-mono text-xs font-semibold text-emerald-700">c² = a² + b²</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Katet a (sm)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={sideA}
                onChange={e => setSideA(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Katet b (sm)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={sideB}
                onChange={e => setSideB(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600 font-mono"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">Gipotenuza c</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {hypoC} sm
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">Yuzasi S</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
                {triArea} sm²
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">Perimetri P</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {triPerimeter} sm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- PERCENT CALCULATOR --- */}
      {calcTab === 'percent' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-600" />
              <span>Foiz va Chegirma Hisoblagich</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asosiy miqdor (son yoki narx)
              </label>
              <input
                type="number"
                value={baseNumber}
                onChange={e => setBaseNumber(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Foiz miqdori (%)
              </label>
              <input
                type="number"
                value={percentRate}
                onChange={e => setPercentRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">{percentRate}% miqdori</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
                {calculatedPercent}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">Foiz qo‘shilsa (+)</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {totalWithAdd}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-400">Chegirma qilinsa (-)</span>
              <div className="text-xl font-bold font-mono text-rose-700 mt-1 tabular-nums">
                {totalWithDiscount}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
