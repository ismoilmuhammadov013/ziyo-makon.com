import { SubjectQuiz } from '../types';

export const SUBJECT_QUIZZES: SubjectQuiz[] = [
  {
    id: 'math',
    title: 'Matematika & Mantiq',
    iconName: 'Calculator',
    description: 'Tenglamalar, foizlar, kasrlar va mantiqiy hisoblash sinovlari',
    difficulty: "O'rta",
    questions: [
      {
        id: 1,
        question: 'Agar 3x + 15 = 45 bo‘lsa, x ning qiymati nechaga teng?',
        options: ['10', '15', '20', '30'],
        correctIndex: 0,
        explanation: '3x = 45 - 15 => 3x = 30 => x = 10.'
      },
      {
        id: 2,
        question: 'To‘g‘ri burchakli uchburchakning katetlari 6 sm va 8 sm bo‘lsa, gipotenuzasi qanchaga teng?',
        options: ['9 sm', '10 sm', '12 sm', '14 sm'],
        correctIndex: 1,
        explanation: 'Pifagor teoremasi: c² = a² + b² = 6² + 8² = 36 + 64 = 100 => c = 10 sm.'
      },
      {
        id: 3,
        question: 'Kitobning narxi 50 000 so‘m. U 20% chegirma bilan sotilsa, yangi narxi qancha bo‘ladi?',
        options: ['35 000 so‘m', '40 000 so‘m', '42 000 so‘m', '45 000 so‘m'],
        correctIndex: 1,
        explanation: 'Chegirma: 50 000 * 0.20 = 10 000 so‘m. Yangi narx = 50 000 - 10 000 = 40 000 so‘m.'
      },
      {
        id: 4,
        question: 'log₂(32) ifodaning qiymatini toping.',
        options: ['4', '5', '6', '8'],
        correctIndex: 1,
        explanation: '2⁵ = 32 bo‘lganligi sababli, log₂(32) = 5.'
      },
      {
        id: 5,
        question: 'Ketma-ket 3 ta butun sonning yig‘indisi 72 ga teng. Shu sonlarning eng kattasini toping.',
        options: ['23', '24', '25', '26'],
        correctIndex: 2,
        explanation: '(n-1) + n + (n+1) = 72 => 3n = 72 => n = 24. Demak sonlar: 23, 24, 25. Eng kattasi: 25.'
      }
    ]
  },
  {
    id: 'physics',
    title: 'Fizika & Qonuniyatlar',
    iconName: 'Zap',
    description: 'Nyuton qonunlari, elektr zanjirlari, optika va termodinamika',
    difficulty: "O'rta",
    questions: [
      {
        id: 1,
        question: 'Nyutonning ikkinchi qonuni formulasini ko‘rsating:',
        options: ['F = m · a', 'E = m · c²', 'p = m · v', 'A = F · s'],
        correctIndex: 0,
        explanation: 'Nyutonning ikkinchi qonuni: jismga ta’sir qiluvchi kuch uning massasi va olgan tezlanishi ko‘paytmasiga teng (F = m · a).'
      },
      {
        id: 2,
        question: 'Ohm qonuniga ko‘ra zanjir qismidagi tok kuchi qanday hisoblanadi?',
        options: ['I = U / R', 'I = U · R', 'I = R / U', 'I = U² / R'],
        correctIndex: 0,
        explanation: 'Zanjir qismidagi tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari mutanosib: I = U / R.'
      },
      {
        id: 3,
        question: 'Vakuumda yorug‘lik tezligi qanchaga teng?',
        options: ['300 000 m/s', '300 000 km/s', '150 000 km/s', '3 000 000 km/s'],
        correctIndex: 1,
        explanation: 'Vakuumdagi yorug‘lik tezligi taxminan c ≈ 3 · 10⁸ m/s yoki 300 000 km/s ga teng.'
      },
      {
        id: 4,
        question: 'Erkin tushish tezlanishi (g) Yer yuzasida taxminan nechaga teng?',
        options: ['8.9 m/s²', '9.8 m/s²', '10.5 m/s²', '12 m/s²'],
        correctIndex: 1,
        explanation: 'Standart erkin tushish tezlanishi Yer yuzasida g ≈ 9.80665 m/s² (ko‘pincha hisoblashlarda 9.8 yoki 10 olinadi).'
      },
      {
        id: 5,
        question: 'Suvning qaynash harorati normal atmosfera bosimida necha gradus Selsiy?',
        options: ['80°C', '90°C', '100°C', '120°C'],
        correctIndex: 2,
        explanation: '1 atmosfera bosimi (101.3 kPa)da toza suv 100°C haroratda qaynaydi.'
      }
    ]
  },
  {
    id: 'uzbek',
    title: 'Ona tili va Adabiyot',
    iconName: 'BookOpen',
    description: 'Imlo qoidalari, so‘z turkumlari, mumtoz va zamonaviy adabiyot',
    difficulty: 'Oson',
    questions: [
      {
        id: 1,
        question: 'O‘zbek adabiy tilining asoschisi kim?',
        options: ['Alisher Navoiy', 'Zahiriddin Muhammad Bobur', 'Ahmad Yassaviy', 'Abdulla Qodiriy'],
        correctIndex: 0,
        explanation: 'Hazrat Alisher Navoiy o‘zining «Xamsa», «Muhokamat ul-lug‘atayn» asarlari bilan o‘zbek (turkiy) adabiy tiliga asos solgan.'
      },
      {
        id: 2,
        question: 'Quyidagi so‘zlardan qaysi biri imlo qoidasiga ko‘ra to‘g‘ri yozilgan?',
        options: ['Tanaffus', 'Tanafus', 'Tannafus', 'Tannaffus'],
        correctIndex: 0,
        explanation: 'To‘g‘ri yozilishi: "Tanaffus" (ikkita f harfi bilan).'
      },
      {
        id: 3,
        question: 'O‘zbek adabiyotidagi ilk roman qaysi va uning muallifi kim?',
        options: ['«Kecha va kunduz» — Cho‘lpon', '«O‘tkan kunlar» — Abdulla Qodiriy', '«Sarob» — Abdulla Qahhor', '«Navoiy» — Oybek'],
        correctIndex: 1,
        explanation: '1925-yilda chop etilgan «O‘tkan kunlar» romani muallifi Abdulla Qodiriy bo‘lib, u ilk o‘zbek romani hisoblanadi.'
      },
      {
        id: 4,
        question: '«Qizil», «chiroyli», «aqlli» so‘zlari qaysi so‘z turkumiga kiradi?',
        options: ['Ot', 'Sifat', 'Ravish', 'Fe’l'],
        correctIndex: 1,
        explanation: 'Belgi, rang, xususiyatni bildirib "qanday?", "qanaqa?" so‘rog‘iga javob bo‘lgan so‘zlar sifat deyiladi.'
      },
      {
        id: 5,
        question: '«Boburnoma» asari qaysi janrda yozilgan?',
        options: ['Doston', 'Esdalik (Memuar) / Tarixiy nasr', 'G‘azal to‘plami', 'Tragediya'],
        correctIndex: 1,
        explanation: '«Boburnoma» (Vaqoe) — Zahiriddin Muhammad Boburning shaxsiy kuzatuvlari, geografik va tarixiy esdaliklari mujassamlashgan memuar asardir.'
      }
    ]
  },
  {
    id: 'english',
    title: 'Ingliz Tili (Grammar & Vocab)',
    iconName: 'Globe',
    description: 'Zamonaviy grammatika qoidalari, zamonlar va lug‘at boyligi',
    difficulty: "O'rta",
    questions: [
      {
        id: 1,
        question: 'Choose the correct form: "She ___ to school every day by bus."',
        options: ['go', 'goes', 'going', 'went'],
        correctIndex: 1,
        explanation: 'Present Simple da 3-shaxs birlik (he/she/it) fe’liga -s yoki -es qo‘shiladi: "goes".'
      },
      {
        id: 2,
        question: 'What is the opposite (antonym) of the word "GENEROUS"?',
        options: ['Kind', 'Stingy / Selfish', 'Polite', 'Brave'],
        correctIndex: 1,
        explanation: '"Generous" (saxiy, ochiqko‘ngil) so‘zining aksi "Stingy" (xasis, baxil) yoki "Selfish" (xudbin).'
      },
      {
        id: 3,
        question: 'Choose the correct past participle: "write - wrote - ___"',
        options: ['writed', 'written', 'wrote', 'writing'],
        correctIndex: 1,
        explanation: 'Noto‘g‘ri fe’llar: write (V1) - wrote (V2) - written (V3).'
      },
      {
        id: 4,
        question: '"If I ___ rich, I would travel around the world." (Second Conditional)',
        options: ['am', 'were', 'will be', 'have been'],
        correctIndex: 1,
        explanation: 'Second Conditional (noaniq orzu-istak) da If qismida "were" ishlatiladi.'
      },
      {
        id: 5,
        question: 'What does the idiom "Break a leg" mean?',
        options: ['Get injured', 'Good luck!', 'Run fast', 'Stop talking'],
        correctIndex: 1,
        explanation: '"Break a leg" ingliz tilida spektakl yoki imtihon oldidan "Omad yor bo‘lsin!" (Good luck) degan ma’noda aytiladi.'
      }
    ]
  },
  {
    id: 'history',
    title: 'Tarix & Madaniyat',
    iconName: 'Landmark',
    description: 'O‘zbekiston va jahon sivilizatsiyalari, buyuk allomalar merosi',
    difficulty: "O'rta",
    questions: [
      {
        id: 1,
        question: 'Amir Temur tavallud topgan yil va shahar qaysi?',
        options: ['1336-yil, Xo‘ja Ilg‘or (Kesh)', '1340-yil, Samarqand', '1320-yil, Buxoro', '1355-yil, Hirot'],
        correctIndex: 0,
        explanation: 'Sohibqiron Amir Temur 1336-yil 9-aprelda Kesh (hozirgi Shahrisabz) yaqinidagi Xo‘ja Ilg‘or qishlog‘ida tug‘ilgan.'
      },
      {
        id: 2,
        question: 'Samarqanddagi mashhur rasadxona kim tomonidan barpo etilgan?',
        options: ['Mirzo Ulug‘bek', 'Al-Xorazmiy', 'Ibn Sino', 'Beruniy'],
        correctIndex: 0,
        explanation: 'Mirzo Ulug‘bek 1424–1428-yillarda Samarqandda o‘sha davrning eng yirik rasadxonasini qurdirdi va 1018 ta yulduz jadvalini tuzdi.'
      },
      {
        id: 3,
        question: '«Tib qonunlari» («Al-Qonun fit-tibb») asari muallifi kim?',
        options: ['Abu Rayhon Beruniy', 'Abu Ali ibn Sino', 'Al-Forobiy', 'Imom Buxoriy'],
        correctIndex: 1,
        explanation: 'Buyuk tabib va alloma Abu Ali ibn Sino (Avitsenna) tomonidan yozilgan bu asar Yevropa universitetlarida 500 yildan ortiq asosiy darslik bo‘lgan.'
      },
      {
        id: 4,
        question: 'O‘zbekiston Respublikasining Davlat Mustaqilligi qachon e’lon qilingan?',
        options: ['1990-yil 20-iyun', '1991-yil 31-avgust', '1991-yil 1-sentyabr', '1992-yil 8-dekabr'],
        correctIndex: 1,
        explanation: '1991-yil 31-avgustda Oliy Kengashning navbatdan tashqari sessiyasida O‘zbekiston mustaqilligi e’lon qilindi, 1-sentyabr esa Mustaqillik kuni deb belgilandi.'
      },
      {
        id: 5,
        question: 'Algebra faniga asos solgan va «Al-jabr» atamasini kiritgan alloma kim?',
        options: ['Al-Xorazmiy', 'Ahmad Farg‘oniy', 'Al-Koshiy', 'Zamaxshariy'],
        correctIndex: 0,
        explanation: 'Muhammad ibn Muso al-Xorazmiy «Al-kitob al-muxtasar fi hisob al-jabr val-muqobala» asari bilan algebraga asos solgan. "Algoritm" so‘zi ham uning nomidan olingan.'
      }
    ]
  }
];
