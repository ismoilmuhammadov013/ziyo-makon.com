import React, { useState, useEffect } from 'react';
import { SUBJECT_QUIZZES } from '../data/quizzes';
import { SubjectQuiz, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  Zap,
  Globe,
  Landmark,
  Check
} from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<SubjectQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds

  // Timer effect
  useEffect(() => {
    if (!selectedQuiz || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedQuiz, isSubmitted]);

  const handleStartQuiz = (quiz: SubjectQuiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeLeft(600); // 10 min
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    if (!selectedQuiz) return;
    const correctCount = selectedQuiz.questions.reduce((acc, q) => {
      return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);

    const percentage = (correctCount / selectedQuiz.questions.length) * 100;
    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti optional
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'math':
        return <Calculator className="w-5 h-5 text-indigo-600" />;
      case 'physics':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'uzbek':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'english':
        return <Globe className="w-5 h-5 text-sky-600" />;
      case 'history':
        return <Landmark className="w-5 h-5 text-rose-600" />;
      default:
        return <GraduationCap className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Fan Testlari & DTM Trenajyori
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          O‘zbekiston maktab va oliygohlarga kirish fanlari bo‘yicha bilimlaringizni sinab ko‘ring.
        </p>
      </div>

      {/* QUIZ SELECTION VIEW */}
      {!selectedQuiz && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECT_QUIZZES.map(quiz => (
            <div
              key={quiz.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                    {getSubjectIcon(quiz.id)}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Daraja: {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  {quiz.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{quiz.questions.length} ta savol · 10 daqiqa</span>
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Boshlash →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVE QUIZ VIEW */}
      {selectedQuiz && !isSubmitted && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Top Bar with Timer and Progress */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                {selectedQuiz.title}
              </span>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                Savol {currentQuestionIndex + 1} / {selectedQuiz.questions.length}
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Text */}
          {(() => {
            const currentQ = selectedQuiz.questions[currentQuestionIndex];
            const isAnswered = userAnswers[currentQ.id] !== undefined;

            return (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isSelected = userAnswers[currentQ.id] === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 font-semibold text-emerald-950 ring-1 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center font-mono ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {optionLetter}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Oldingi savol</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {selectedQuiz.questions.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-7 h-7 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                          idx === currentQuestionIndex
                            ? 'bg-slate-900 text-white'
                            : userAnswers[q.id] !== undefined
                            ? 'bg-emerald-100 text-emerald-800 font-semibold'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Keyingi savol</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Testni yakunlash</span>
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* QUIZ RESULTS & FULL ANALYSIS VIEW */}
      {selectedQuiz && isSubmitted && (
        <div className="max-w-3xl mx-auto space-y-6">
          {(() => {
            const correctCount = selectedQuiz.questions.reduce((acc, q) => {
              return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
            }, 0);
            const total = selectedQuiz.questions.length;
            const percentage = Math.round((correctCount / total) * 100);

            return (
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
                {/* Result Summary */}
                <div className="text-center pb-6 border-b border-slate-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Test Sinovi Yakunlandi!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fan: {selectedQuiz.title}
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-6">
                    <div>
                      <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {percentage}%
                      </div>
                      <div className="text-xs text-slate-500">Umumiy ko‘rsatkich</div>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <div className="text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                        {correctCount} / {total}
                      </div>
                      <div className="text-xs text-slate-500">To‘g‘ri javoblar</div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleStartQuiz(selectedQuiz)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Qaytadan yechish</span>
                    </button>
                    <button
                      onClick={() => setSelectedQuiz(null)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Boshqa fan tanlash
                    </button>
                  </div>
                </div>

                {/* Detailed Analysis of Each Question */}
                <div className="mt-8 space-y-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Savollar tahlili va to‘g‘ri yechimlar:
                  </h4>

                  {selectedQuiz.questions.map((q, idx) => {
                    const selectedIdx = userAnswers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-sm space-y-3 ${
                          isCorrect
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-slate-800">
                              {idx + 1}.
                            </span>
                            <span className="font-semibold text-slate-900">
                              {q.question}
                            </span>
                          </div>
                          <span className="shrink-0 flex items-center gap-1 text-xs font-medium">
                            {isCorrect ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                <span>To‘g‘ri</span>
                              </span>
                            ) : (
                              <span className="text-rose-700 flex items-center gap-1">
                                <XCircle className="w-4 h-4" />
                                <span>Xato</span>
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Options preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, oIdx) => {
                            const isUserChoice = selectedIdx === oIdx;
                            const isRightAnswer = q.correctIndex === oIdx;

                            return (
                              <div
                                key={oIdx}
                                className={`p-2 rounded border ${
                                  isRightAnswer
                                    ? 'bg-emerald-100/70 border-emerald-300 font-semibold text-emerald-900'
                                    : isUserChoice
                                    ? 'bg-rose-100/70 border-rose-300 text-rose-900 line-through'
                                    : 'bg-white border-slate-200 text-slate-600'
                                }`}
                              >
                                <span className="font-mono font-bold mr-1.5">
                                  {String.fromCharCode(65 + oIdx)})
                                </span>
                                {opt}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                          <strong className="text-slate-900">Izoh: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
