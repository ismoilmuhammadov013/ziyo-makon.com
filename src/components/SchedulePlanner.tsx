import React, { useState, useEffect } from 'react';
import { TaskItem, ScheduleDay } from '../types';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  MapPin, 
  AlertCircle,
  Filter,
  Check
} from 'lucide-react';

const INITIAL_SCHEDULE: ScheduleDay[] = [
  {
    day: 'Dushanba',
    lessons: [
      { id: 'l1', subject: 'Algebra & Matematika', time: '08:30 - 09:15', room: '204-xona', teacher: 'Karimov A.' },
      { id: 'l2', subject: 'Ona tili va Adabiyot', time: '09:25 - 10:10', room: '108-xona', teacher: 'Rahimova N.' },
      { id: 'l3', subject: 'Fizika', time: '10:30 - 11:15', room: 'Fizika lab.', teacher: 'Saidov D.' },
      { id: 'l4', subject: 'Ingliz tili', time: '11:25 - 12:10', room: '302-xona', teacher: 'Smith J.' },
    ]
  },
  {
    day: 'Seshanba',
    lessons: [
      { id: 'l5', subject: 'Geometriya', time: '08:30 - 09:15', room: '204-xona', teacher: 'Karimov A.' },
      { id: 'l6', subject: 'Kimyo', time: '09:25 - 10:10', room: 'Kimyo lab.', teacher: 'Azizova M.' },
      { id: 'l7', subject: 'O‘zbekiston tarixi', time: '10:30 - 11:15', room: '115-xona', teacher: 'Yuldashev O.' },
      { id: 'l8', subject: 'Informatika & IT', time: '11:25 - 12:10', room: 'Kompyuter xonasi', teacher: 'Tursunov B.' },
    ]
  },
  {
    day: 'Chorshanba',
    lessons: [
      { id: 'l9', subject: 'Biologiya', time: '08:30 - 09:15', room: '210-xona', teacher: 'Qosimova D.' },
      { id: 'l10', subject: 'Algebra & Matematika', time: '09:25 - 10:10', room: '204-xona', teacher: 'Karimov A.' },
      { id: 'l11', subject: 'Ingliz tili', time: '10:30 - 11:15', room: '302-xona', teacher: 'Smith J.' },
      { id: 'l12', subject: 'Jismoniy tarbiya', time: '11:25 - 12:10', room: 'Sport zal', teacher: 'Ergashev Sh.' },
    ]
  },
  {
    day: 'Payshanba',
    lessons: [
      { id: 'l13', subject: 'Fizika (Amaliyot)', time: '08:30 - 09:15', room: 'Fizika lab.', teacher: 'Saidov D.' },
      { id: 'l14', subject: 'Ona tili', time: '09:25 - 10:10', room: '108-xona', teacher: 'Rahimova N.' },
      { id: 'l15', subject: 'Jahon tarixi', time: '10:30 - 11:15', room: '115-xona', teacher: 'Yuldashev O.' },
      { id: 'l16', subject: 'Geografiya', time: '11:25 - 12:10', room: '206-xona', teacher: 'Sobirov K.' },
    ]
  },
  {
    day: 'Juma',
    lessons: [
      { id: 'l17', subject: 'Algebra & Geometriya', time: '08:30 - 09:15', room: '204-xona', teacher: 'Karimov A.' },
      { id: 'l18', subject: 'Kimyo', time: '09:25 - 10:10', room: 'Kimyo lab.', teacher: 'Azizova M.' },
      { id: 'l19', subject: 'Adabiyot (Insho tahlili)', time: '10:30 - 11:15', room: '108-xona', teacher: 'Rahimova N.' },
      { id: 'l20', subject: 'Tarbiya & Ma’naviyat', time: '11:25 - 12:10', room: 'Faollar zali', teacher: 'Madumarov E.' },
    ]
  },
  {
    day: 'Shanba',
    lessons: [
      { id: 'l21', subject: 'Ingliz tili (Speaking & Debate)', time: '08:30 - 09:15', room: '302-xona', teacher: 'Smith J.' },
      { id: 'l22', subject: 'Informatika (Dasturlash)', time: '09:25 - 10:10', room: 'Kompyuter xonasi', teacher: 'Tursunov B.' },
      { id: 'l23', subject: 'DTM Test Sinovi / Fakultativ', time: '10:30 - 11:45', room: 'Katta auditoriya', teacher: 'Ustozlar kengashi' },
    ]
  }
];

const INITIAL_TASKS: TaskItem[] = [
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

interface SchedulePlannerProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

export const SchedulePlanner: React.FC<SchedulePlannerProps> = ({ tasks, setTasks }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Dushanba');
  const [schedule, setSchedule] = useState<ScheduleDay[]>(() => {
    const saved = localStorage.getItem('ziyomakon_schedule_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SCHEDULE;
      }
    }
    return INITIAL_SCHEDULE;
  });

  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // New Task form state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('Matematika');
  const [newTaskDue, setNewTaskDue] = useState('Bugun');
  const [newTaskPriority, setNewTaskPriority] = useState<'yuqori' | 'orta' | 'past'>('orta');
  const [newTaskNotes, setNewTaskNotes] = useState('');

  // New Lesson form state
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [newLessonSubject, setNewLessonSubject] = useState('');
  const [newLessonTime, setNewLessonTime] = useState('08:30 - 09:15');
  const [newLessonRoom, setNewLessonRoom] = useState('');
  const [newLessonTeacher, setNewLessonTeacher] = useState('');

  useEffect(() => {
    localStorage.setItem('ziyomakon_schedule_v1', JSON.stringify(schedule));
  }, [schedule]);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      dueDate: newTaskDue,
      completed: false,
      priority: newTaskPriority,
      notes: newTaskNotes.trim() || undefined
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setNewTaskNotes('');
    setShowTaskModal(false);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonSubject.trim()) return;

    setSchedule(prev =>
      prev.map(dayObj => {
        if (dayObj.day === selectedDay) {
          return {
            ...dayObj,
            lessons: [
              ...dayObj.lessons,
              {
                id: Date.now().toString(),
                subject: newLessonSubject.trim(),
                time: newLessonTime.trim(),
                room: newLessonRoom.trim() || 'Auditoriya',
                teacher: newLessonTeacher.trim() || 'O‘qituvchi'
              }
            ]
          };
        }
        return dayObj;
      })
    );

    setNewLessonSubject('');
    setNewLessonRoom('');
    setNewLessonTeacher('');
    setShowLessonModal(false);
  };

  const handleDeleteLesson = (lessonId: string) => {
    setSchedule(prev =>
      prev.map(dayObj => {
        if (dayObj.day === selectedDay) {
          return {
            ...dayObj,
            lessons: dayObj.lessons.filter(l => l.id !== lessonId)
          };
        }
        return dayObj;
      })
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'pending') return !task.completed;
    if (taskFilter === 'completed') return task.completed;
    return true;
  });

  const currentDayLessons = schedule.find(d => d.day === selectedDay)?.lessons || [];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Dars Jadvali & Uyga Vazifalar
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Haftalik darslaringizni kuzatib boring va topshiriqlarni o‘z vaqtida yakunlang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Weekly Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Haftalik Darslar Jadvali</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dars vaqtlari, xonalar va ustozlar ro‘yxati
              </p>
            </div>

            <button
              onClick={() => setShowLessonModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Dars qo‘shish</span>
            </button>
          </div>

          {/* Day selection tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
            {schedule.map(d => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDay === d.day
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>

          {/* Lessons List for Selected Day */}
          <div className="mt-4 space-y-3">
            {currentDayLessons.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                Ushbu kunga darslar belgilanmagan.
              </div>
            ) : (
              currentDayLessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {lesson.subject}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-mono tabular-nums">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lesson.time}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {lesson.room}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          {lesson.teacher}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-white"
                    title="Darsni o‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Homework & Tasks Planner (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Uyga Vazifalar & Topshiriqlar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Topshirish muddati va bajarilish holati
              </p>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi vazifa</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 py-3 text-xs">
            <span className="text-slate-400">Holat:</span>
            <button
              onClick={() => setTaskFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                taskFilter === 'all'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Barchasi ({tasks.length})
            </button>
            <button
              onClick={() => setTaskFilter('pending')}
              className={`px-2.5 py-1 rounded transition-colors ${
                taskFilter === 'pending'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Kutilayotgan ({tasks.filter(t => !t.completed).length})
            </button>
            <button
              onClick={() => setTaskFilter('completed')}
              className={`px-2.5 py-1 rounded transition-colors ${
                taskFilter === 'completed'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Bajarilgan ({tasks.filter(t => t.completed).length})
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3 mt-1">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                Vazifalar mavjud emas.
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-100 opacity-60'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        task.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 hover:border-emerald-600 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-emerald-800">
                          {task.subject}
                        </span>
                        
                        {/* Priority with explicit text and symbol for accessibility */}
                        <span className="text-xs text-slate-500 font-mono">
                          {task.priority === 'yuqori' && (
                            <span className="text-rose-600 font-medium">● Yuqori</span>
                          )}
                          {task.priority === 'orta' && (
                            <span className="text-amber-600 font-medium">● O‘rta</span>
                          )}
                          {task.priority === 'past' && (
                            <span className="text-slate-500 font-medium">● Past</span>
                          )}
                        </span>
                      </div>

                      <p
                        className={`text-sm mt-1 leading-snug ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 font-medium'
                        }`}
                      >
                        {task.title}
                      </p>

                      {task.notes && (
                        <p className="text-xs text-slate-500 mt-1 italic">
                          Izoh: {task.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Muddat: {task.dueDate}</span>
                        </span>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="hover:text-rose-600 transition-colors p-1"
                          title="Vazifani o‘chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal: Yangi vazifa qo'shish */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Yangi Uy Vazifasi Qo‘shish
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fan nomi
                </label>
                <select
                  value={newTaskSubject}
                  onChange={e => setNewTaskSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                >
                  <option value="Matematika">Matematika / Algebra</option>
                  <option value="Geometriya">Geometriya</option>
                  <option value="Fizika">Fizika</option>
                  <option value="Kimyo">Kimyo</option>
                  <option value="Biologiya">Biologiya</option>
                  <option value="Ona tili">Ona tili va Adabiyot</option>
                  <option value="Ingliz tili">Ingliz tili</option>
                  <option value="Tarix">Tarix</option>
                  <option value="Informatika">Informatika</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vazifa mazmuni
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 45-betdagi 1-5 misollarni yechish"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topshirish muddati
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Ertaga, Juma"
                    value={newTaskDue}
                    onChange={e => setNewTaskDue(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Muhimlik darajasi
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as 'yuqori' | 'orta' | 'past')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                  >
                    <option value="yuqori">● Yuqori (Shoshilinch)</option>
                    <option value="orta">● O‘rta</option>
                    <option value="past">● Past</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Qo‘shimcha eslatma (ixtiyoriy)
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Lug‘at daftarga yozish kerak"
                  value={newTaskNotes}
                  onChange={e => setNewTaskNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg"
                >
                  Vazifani saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Yangi dars qo'shish */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {selectedDay} kuniga yangi dars qo‘shish
            </h3>
            <form onSubmit={handleAddLesson} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fan nomi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kimyo yoki Geometriya"
                  value={newLessonSubject}
                  onChange={e => setNewLessonSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dars vaqti
                </label>
                <input
                  type="text"
                  required
                  placeholder="08:30 - 09:15"
                  value={newLessonTime}
                  onChange={e => setNewLessonTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Xona / Auditoriya
                  </label>
                  <input
                    type="text"
                    placeholder="204-xona"
                    value={newLessonRoom}
                    onChange={e => setNewLessonRoom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    O‘qituvchi ismi
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Karimov A."
                    value={newLessonTeacher}
                    onChange={e => setNewLessonTeacher(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Darsni kiritish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
