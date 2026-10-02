import { FormulaItem } from '../types';

export const FORMULAS_DATA: FormulaItem[] = [
  // Matematika & Algebra
  {
    id: 'm1',
    subject: 'Matematika',
    category: 'Qisqa ko‘paytirish',
    title: 'Kvadratlar ayirmasi',
    formula: 'a² - b² = (a - b)(a + b)',
    variables: 'a, b — ixtiyoriy sonlar yoki ko‘phadlar',
    example: 'x² - 9 = (x - 3)(x + 3)'
  },
  {
    id: 'm2',
    subject: 'Matematika',
    category: 'Qisqa ko‘paytirish',
    title: 'Yig‘indining kvadrati',
    formula: '(a + b)² = a² + 2ab + b²',
    variables: 'a, b — ifodalar',
    example: '(x + 5)² = x² + 10x + 25'
  },
  {
    id: 'm3',
    subject: 'Matematika',
    category: 'Kvadrat tenglama',
    title: 'Diskriminant va ildizlar',
    formula: 'D = b² - 4ac,  x₁,₂ = (-b ± √D) / (2a)',
    variables: 'ax² + bx + c = 0 tenglamaning koeffitsiyentlari (a ≠ 0)',
    example: 'x² - 5x + 6 = 0 da D = 25 - 24 = 1, ildizlar: x₁ = 3, x₂ = 2'
  },
  {
    id: 'm4',
    subject: 'Matematika',
    category: 'Kvadrat tenglama',
    title: 'Viyet teoremasi',
    formula: 'x₁ + x₂ = -b/a,  x₁ · x₂ = c/a',
    variables: 'Kvadrat tenglama ildizlari yig‘indisi va ko‘paytmasi',
    example: 'x² - 7x + 10 = 0 da x₁ + x₂ = 7 va x₁ · x₂ = 10 (ildizlar 2 va 5)'
  },
  {
    id: 'm5',
    subject: 'Matematika',
    category: 'Trigonometriya',
    title: 'Asosiy trigonometrik ayniyat',
    formula: 'sin²(α) + cos²(α) = 1',
    variables: 'α — istalgan burchak',
    example: 'sin(30°) = 1/2, cos(30°) = √3/2 => 1/4 + 3/4 = 1'
  },
  {
    id: 'm6',
    subject: 'Matematika',
    category: 'Progressiya',
    title: 'Arifmetik progressiya n-hadi',
    formula: 'aₙ = a₁ + (n - 1)d,  Sₙ = (a₁ + aₙ) · n / 2',
    variables: 'a₁ — birinchi had, d — ayirma, n — hadlar soni',
    example: 'a₁ = 2, d = 3 bo‘lsa, a₅ = 2 + 4·3 = 14'
  },

  // Geometriya
  {
    id: 'g1',
    subject: 'Geometriya',
    category: 'Uchburchaklar',
    title: 'Pifagor teoremasi',
    formula: 'c² = a² + b²',
    variables: 'c — gipotenuza, a va b — katetlar',
    example: 'a = 3, b = 4 => c = √(9 + 16) = 5'
  },
  {
    id: 'g2',
    subject: 'Geometriya',
    category: 'Uchburchaklar',
    title: 'Geron formulasi (Yuzasi)',
    formula: 'S = √(p(p - a)(p - b)(p - c)),  p = (a + b + c) / 2',
    variables: 'a, b, c — uchburchak tomonlari, p — yarimperimetr',
    example: 'Tomonlari 5, 5, 6 bo‘lsa: p = 8 => S = √(8 · 3 · 3 · 2) = 12'
  },
  {
    id: 'g3',
    subject: 'Geometriya',
    category: 'Doira va aylana',
    title: 'Aylana uzunligi va Doira yuzi',
    formula: 'C = 2πR,  S = πR²',
    variables: 'R — radius, π ≈ 3.14159',
    example: 'R = 10 sm bo‘lsa, C ≈ 62.8 sm, S ≈ 314 sm²'
  },
  {
    id: 'g4',
    subject: 'Geometriya',
    category: 'Stereometriya',
    title: 'Shar hajmi va sirt yuzi',
    formula: 'V = (4/3)πR³,  S = 4πR²',
    variables: 'R — shar radiusi',
    example: 'R = 3 sm bo‘lsa, V = 36π sm³'
  },

  // Fizika
  {
    id: 'p1',
    subject: 'Fizika',
    category: 'Kinematika',
    title: 'Tezlik va Bosib o‘tilgan yo‘l',
    formula: 's = v₀t + (at²)/2,  v = v₀ + at',
    variables: 's — yo‘l, v₀ — boshlang‘ich tezlik, a — tezlanish, t — vaqt',
    example: 'v₀ = 0, a = 2 m/s², t = 3 s => s = 2 · 9 / 2 = 9 m'
  },
  {
    id: 'p2',
    subject: 'Fizika',
    category: 'Dinamika',
    title: 'Nyutonning II qonuni',
    formula: 'F = m · a',
    variables: 'F — natijaviy kuch (N), m — massa (kg), a — tezlanish (m/s²)',
    example: 'm = 5 kg, a = 3 m/s² bo‘lsa, F = 15 N'
  },
  {
    id: 'p3',
    subject: 'Fizika',
    category: 'Dinamika',
    title: 'Butun olam tortishish qonuni',
    formula: 'F = G · (m₁ · m₂) / r²',
    variables: 'G = 6.674 · 10⁻¹¹ N·m²/kg², m₁, m₂ — massalar, r — masofa',
    example: 'Ikki jism orasidagi gravitatsion tortishish kuchi'
  },
  {
    id: 'p4',
    subject: 'Fizika',
    category: 'Energiya',
    title: 'Kinetik va Potensial energiya',
    formula: 'E_k = (m · v²) / 2,  E_p = m · g · h',
    variables: 'm — massa, v — tezlik, g — erkin tushish tezlanishi, h — balandlik',
    example: 'm = 2 kg, v = 10 m/s => E_k = 2 · 100 / 2 = 100 J'
  },
  {
    id: 'p5',
    subject: 'Fizika',
    category: 'Elektr',
    title: 'Ohm qonuni va Quvvat',
    formula: 'I = U / R,  P = U · I = I² · R',
    variables: 'I — tok kuchi (A), U — kuchlanish (V), R — qarshilik (Ω), P — quvvat (W)',
    example: 'U = 220 V, R = 44 Ω => I = 5 A, P = 1100 W (1.1 kW)'
  },
  {
    id: 'p6',
    subject: 'Fizika',
    category: 'Tebranishlar',
    title: 'Matematik mayatnik davri',
    formula: 'T = 2π · √(L / g)',
    variables: 'T — tebranish davri (s), L — ip uzunligi (m), g — erkin tushish tezlanishi (m/s²)',
    example: 'L = 1 m, g ≈ 9.8 m/s² => T ≈ 2 · 3.14 · 0.319 ≈ 2.0 s'
  },

  // Kimyo
  {
    id: 'k1',
    subject: 'Kimyo',
    category: 'Modda miqdori',
    title: 'Mol va Avogadro soni',
    formula: 'n = m / M = N / N_A = V / V_m',
    variables: 'n — modda miqdori (mol), m — massa, M — molyar massa, N_A = 6.02·10²³, V_m = 22.4 l/mol (n.sh.)',
    example: '32 g Kislorod (O₂, M = 32 g/mol) = 1 mol = 22.4 litr gaz'
  },
  {
    id: 'k2',
    subject: 'Kimyo',
    category: 'Eritmalar',
    title: 'Massaviy ulush (Konsentratsiya)',
    formula: 'ω = (m_erigan / m_eritma) · 100%',
    variables: 'ω — eritmaning foiz konsentratsiyasi, m_eritma = m_erigan + m_erituvchi',
    example: '20 g tuz 180 g suvda eritilsa: ω = 20 / 200 · 100% = 10%'
  }
];
