import React, { useState } from 'react';
import { FORMULAS_DATA } from '../data/formulas';
import { FLASHCARDS_DATA } from '../data/flashcards';
import { FormulaItem, Flashcard } from '../types';
import { 
  BookMarked, 
  Search, 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Volume2,
  Sparkles,
  Check
} from 'lucide-react';

export const FormulaDirectory: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'formulas' | 'flashcards'>('formulas');

  // Formula state
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [learnedCardIds, setLearnedCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ziyomakon_learned_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const filteredFormulas = FORMULAS_DATA.filter(item => {
    const matchesSub = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % FLASHCARDS_DATA.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length);
  };

  const handleToggleLearned = (id: string) => {
    setLearnedCardIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('ziyomakon_learned_cards', JSON.stringify(updated));
      return updated;
    });
  };

  const currentFlashcard = FLASHCARDS_DATA[currentCardIndex];
  const isCurrentLearned = learnedCardIds.includes(currentFlashcard.id);

  return (
    <div className="space-y-8">
      {/* Subtab Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Formulalar & Flesh-kartalar
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Barcha fanlar formulalari shpargalkasi va ingliz tili lug‘at kartochkalari.
          </p>
        </div>

        {/* Clean Segmented Control Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('formulas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'formulas'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Formulalar Shpargalkasi
          </button>
          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'flashcards'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ingliz Tili Flesh-kartalari
          </button>
        </div>
      </div>

      {/* --- SUBTAB 1: FORMULAS REPOSITORY --- */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-slate-400 shrink-0">Fan:</span>
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubject === 'all'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Barchasi ({FORMULAS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedSubject('Matematika')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubject === 'Matematika'
                    ? 'bg-emerald-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Matematika
              </button>
              <button
                onClick={() => setSelectedSubject('Geometriya')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubject === 'Geometriya'
                    ? 'bg-sky-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Geometriya
              </button>
              <button
                onClick={() => setSelectedSubject('Fizika')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubject === 'Fizika'
                    ? 'bg-amber-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Fizika
              </button>
              <button
                onClick={() => setSelectedSubject('Kimyo')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubject === 'Kimyo'
                    ? 'bg-rose-700 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Kimyo
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Formula yoki mavzu qidirish (Pifagor, Ohm, Diskriminant)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 px-3.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Formulas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFormulas.map(item => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-emerald-800">
                      {item.subject}
                    </span>
                    <span className="text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>

                  {/* Math Formula Display Box */}
                  <div className="my-3 p-3 bg-slate-50 border border-slate-100 rounded-lg text-center font-mono font-semibold text-base text-slate-900">
                    {item.formula}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-800">Belgilanishlar: </strong>
                      {item.variables}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <strong className="text-slate-700">Amaliy misol: </strong>
                  <span className="font-mono text-emerald-900 font-medium">
                    {item.example}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SUBTAB 2: ENGLISH FLASHCARDS --- */}
      {activeSubTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Kartochka <strong className="text-slate-900 font-mono">{currentCardIndex + 1}</strong> / {FLASHCARDS_DATA.length}
            </span>
            <span>
              Yodlanganlar: <strong className="text-emerald-700 font-mono">{learnedCardIds.length}</strong> / {FLASHCARDS_DATA.length}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between text-center relative select-none"
          >
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="capitalize">{currentFlashcard.partOfSpeech}</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <RotateCw className="w-3 h-3" />
                <span>O‘girish uchun bosing</span>
              </span>
            </div>

            {/* Front & Back Content */}
            {!isFlipped ? (
              <div className="my-auto py-6">
                <h3 className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {currentFlashcard.word}
                </h3>
                <p className="mt-2 text-sm text-slate-400 font-mono">
                  {currentFlashcard.transcription}
                </p>
                <p className="mt-4 text-xs text-slate-500 italic">
                  "{currentFlashcard.example}"
                </p>
              </div>
            ) : (
              <div className="my-auto py-6 space-y-3">
                <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">
                  O‘zbekcha tarjimasi:
                </div>
                <h4 className="text-2xl font-bold text-slate-900">
                  {currentFlashcard.translation}
                </h4>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 max-w-sm mx-auto">
                  <p className="italic">"{currentFlashcard.exampleUz}"</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLearned(currentFlashcard.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isCurrentLearned
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isCurrentLearned ? 'Yodlab olindi ✓' : 'Yodlandiga qo‘shish'}</span>
              </button>

              <span className="text-[11px] text-slate-400">
                {isFlipped ? 'Orqasi' : 'Old tomoni'}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Oldingisi</span>
            </button>

            <button
              onClick={handleNextCard}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span>Keyingisi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
