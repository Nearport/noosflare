export interface Material {
  id: string;
  title: string;
  type: 'video' | 'notes';
  topic: string;
  source: string;
  author: string;
  views: number;
  likes: number;
  uploadDate: string;
  duration?: string;
  pages?: number;
  subjectId: string;
}

export const allMaterials: Material[] = [
  // Математический анализ
  {
    id: 'math-1',
    title: 'Производные функций - подробный разбор',
    type: 'video',
    topic: 'Производные',
    source: 'Курс "Математический анализ I" - Профессор Иванов А.П.',
    author: 'Мария Иванова',
    views: 342,
    likes: 45,
    uploadDate: '2025-11-05',
    duration: '45:30',
    subjectId: 'math',
  },
  {
    id: 'math-2',
    title: 'Конспект по интегралам',
    type: 'notes',
    topic: 'Интегралы',
    source: 'Учебник Фихтенгольца, том 2',
    author: 'Алексей Смирнов',
    views: 567,
    likes: 78,
    uploadDate: '2025-11-03',
    pages: 12,
    subjectId: 'math',
  },
  {
    id: 'math-3',
    title: 'Пределы и непрерывность',
    type: 'video',
    topic: 'Пределы',
    source: 'Курс "Введение в анализ" - МГУ',
    author: 'Елена Петрова',
    views: 234,
    likes: 32,
    uploadDate: '2025-11-01',
    duration: '38:15',
    subjectId: 'math',
  },
  {
    id: 'math-4',
    title: 'Методы вычисления производных',
    type: 'notes',
    topic: 'Производные',
    source: 'Семинар по матанализу - Доцент Петров К.М.',
    author: 'Дмитрий Козлов',
    views: 445,
    likes: 56,
    uploadDate: '2025-10-28',
    pages: 8,
    subjectId: 'math',
  },
  {
    id: 'math-5',
    title: 'Определенные интегралы - практика',
    type: 'video',
    topic: 'Интегралы',
    source: 'Онлайн-курс "Высшая математика"',
    author: 'Ольга Новикова',
    views: 198,
    likes: 28,
    uploadDate: '2025-10-25',
    duration: '52:40',
    subjectId: 'math',
  },
  {
    id: 'math-6',
    title: 'Ряды Тейлора и Маклорена',
    type: 'notes',
    topic: 'Ряды',
    source: 'Учебник Кудрявцева "Курс математического анализа"',
    author: 'Игорь Соколов',
    views: 312,
    likes: 41,
    uploadDate: '2025-10-22',
    pages: 15,
    subjectId: 'math',
  },

  // Физика
  {
    id: 'physics-1',
    title: 'Законы Ньютона в деталях',
    type: 'video',
    topic: 'Механика',
    source: 'Курс общей физики - Профессор Сивухин Д.В.',
    author: 'Андрей Васильев',
    views: 523,
    likes: 67,
    uploadDate: '2025-11-07',
    duration: '42:15',
    subjectId: 'physics',
  },
  {
    id: 'physics-2',
    title: 'Термодинамика: первое начало',
    type: 'notes',
    topic: 'Термодинамика',
    source: 'Лекции по термодинамике - МФТИ',
    author: 'Светлана Кузнецова',
    views: 289,
    likes: 34,
    uploadDate: '2025-11-04',
    pages: 10,
    subjectId: 'physics',
  },
  {
    id: 'physics-3',
    title: 'Оптика: преломление и отражение',
    type: 'video',
    topic: 'Оптика',
    source: 'Практикум по физике - Лабораторные работы',
    author: 'Михаил Орлов',
    views: 412,
    likes: 52,
    uploadDate: '2025-10-30',
    duration: '35:20',
    subjectId: 'physics',
  },
  {
    id: 'physics-4',
    title: 'Электростатика и закон Кулона',
    type: 'notes',
    topic: 'Электричество',
    source: 'Учебник Иродова "Задачи по общей физике"',
    author: 'Татьяна Морозова',
    views: 367,
    likes: 48,
    uploadDate: '2025-10-27',
    pages: 14,
    subjectId: 'physics',
  },

  // Программирование
  {
    id: 'prog-1',
    title: 'Алгоритмы сортировки',
    type: 'video',
    topic: 'Алгоритмы',
    source: 'Курс "Алгоритмы и структуры данных" - СПбГУ',
    author: 'Денис Павлов',
    views: 891,
    likes: 124,
    uploadDate: '2025-11-08',
    duration: '56:45',
    subjectId: 'programming',
  },
  {
    id: 'prog-2',
    title: 'ООП: Принципы SOLID',
    type: 'notes',
    topic: 'ООП',
    source: 'Семинар по объектно-ориентированному программированию',
    author: 'Артем Волков',
    views: 645,
    likes: 89,
    uploadDate: '2025-11-06',
    pages: 18,
    subjectId: 'programming',
  },
  {
    id: 'prog-3',
    title: 'Базы данных: SQL запросы',
    type: 'video',
    topic: 'Базы данных',
    source: 'Онлайн-курс "Введение в базы данных"',
    author: 'Екатерина Белова',
    views: 734,
    likes: 98,
    uploadDate: '2025-11-02',
    duration: '48:30',
    subjectId: 'programming',
  },

  // Английский язык
  {
    id: 'english-1',
    title: 'Грамматика: Present Perfect',
    type: 'video',
    topic: 'Грамматика',
    source: 'Курс английского языка - Cambridge English',
    author: 'Анна Смирнова',
    views: 456,
    likes: 61,
    uploadDate: '2025-11-09',
    duration: '32:15',
    subjectId: 'english',
  },
  {
    id: 'english-2',
    title: 'Список полезных фразовых глаголов',
    type: 'notes',
    topic: 'Лексика',
    source: 'Учебник English Vocabulary in Use',
    author: 'Ирина Попова',
    views: 378,
    likes: 47,
    uploadDate: '2025-11-05',
    pages: 6,
    subjectId: 'english',
  },
  {
    id: 'english-3',
    title: 'Разговорная практика: ежедневные ситуации',
    type: 'video',
    topic: 'Разговорная практика',
    source: 'Языковой клуб университета',
    author: 'Владислав Соколов',
    views: 512,
    likes: 73,
    uploadDate: '2025-10-31',
    duration: '28:40',
    subjectId: 'english',
  },

  // Философия
  {
    id: 'phil-1',
    title: 'Античная философия: Сократ и Платон',
    type: 'video',
    topic: 'История философии',
    source: 'Курс "История западной философии" - МГУ',
    author: 'Максим Лебедев',
    views: 267,
    likes: 38,
    uploadDate: '2025-11-06',
    duration: '51:20',
    subjectId: 'philosophy',
  },
  {
    id: 'phil-2',
    title: 'Основы формальной логики',
    type: 'notes',
    topic: 'Логика',
    source: 'Учебник Ивина "Логика"',
    author: 'Ольга Федорова',
    views: 198,
    likes: 26,
    uploadDate: '2025-11-01',
    pages: 11,
    subjectId: 'philosophy',
  },

  // Литература
  {
    id: 'lit-1',
    title: 'Анализ романа "Война и мир"',
    type: 'video',
    topic: 'Русская литература',
    source: 'Лекции по русской литературе XIX века',
    author: 'Наталья Крылова',
    views: 423,
    likes: 58,
    uploadDate: '2025-11-07',
    duration: '44:25',
    subjectId: 'literature',
  },
  {
    id: 'lit-2',
    title: 'Конспект: Поэзия Серебряного века',
    type: 'notes',
    topic: 'Русская литература',
    source: 'Семинар по литературе ХХ века',
    author: 'Виктория Зайцева',
    views: 312,
    likes: 42,
    uploadDate: '2025-11-03',
    pages: 9,
    subjectId: 'literature',
  },

  // История искусств
  {
    id: 'art-1',
    title: 'Эпоха Возрождения: великие мастера',
    type: 'video',
    topic: 'Живопись',
    source: 'Курс истории искусств - Эрмитаж',
    author: 'Евгений Романов',
    views: 289,
    likes: 41,
    uploadDate: '2025-11-05',
    duration: '39:50',
    subjectId: 'art',
  },
  {
    id: 'art-2',
    title: 'Импрессионизм в живописи',
    type: 'notes',
    topic: 'Живопись',
    source: 'Лекции по истории искусств XIX века',
    author: 'Анастасия Волкова',
    views: 234,
    likes: 33,
    uploadDate: '2025-10-29',
    pages: 13,
    subjectId: 'art',
  },

  // Музыка
  {
    id: 'music-1',
    title: 'Основы гармонии и аккордов',
    type: 'video',
    topic: 'Теория музыки',
    source: 'Курс теории музыки - Консерватория',
    author: 'Сергей Николаев',
    views: 178,
    likes: 24,
    uploadDate: '2025-11-04',
    duration: '36:15',
    subjectId: 'music',
  },
  {
    id: 'music-2',
    title: 'История классической музыки',
    type: 'notes',
    topic: 'История',
    source: 'Учебник "Музыкальная литература"',
    author: 'Людмила Григорьева',
    views: 145,
    likes: 19,
    uploadDate: '2025-10-26',
    pages: 16,
    subjectId: 'music',
  },
];

export function getMaterialsBySubject(subjectId: string): Material[] {
  return allMaterials.filter(material => material.subjectId === subjectId);
}

export function getSubjectTopics(subjectId: string): string[] {
  const materials = getMaterialsBySubject(subjectId);
  const topics = new Set(materials.map(m => m.topic));
  return Array.from(topics);
}

export function getSubjectSources(subjectId: string): string[] {
  const materials = getMaterialsBySubject(subjectId);
  const sources = new Set(materials.map(m => m.source));
  return Array.from(sources);
}

export const subjectNames: Record<string, string> = {
  math: 'Математический анализ',
  physics: 'Физика',
  programming: 'Программирование',
  english: 'Английский язык',
  philosophy: 'Философия',
  literature: 'Литература',
  art: 'История искусств',
  music: 'Музыка',
};
