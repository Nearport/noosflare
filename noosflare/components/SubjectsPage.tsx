import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, Calculator, Atom, Code, Globe, Brain, Palette, Music } from 'lucide-react';
import { pluralizeMaterials } from '../utils/pluralize';

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  materialsCount: number;
  color: string;
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Математический анализ',
    description: 'Интегралы, производные, ряды',
    icon: <Calculator className="w-6 h-6" />,
    materialsCount: 156,
    color: 'from-orange-400 to-rose-500',
  },
  {
    id: 'physics',
    name: 'Физика',
    description: 'Механика, термодинамика, оптика',
    icon: <Atom className="w-6 h-6" />,
    materialsCount: 134,
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'programming',
    name: 'Программирование',
    description: 'Алгоритмы, структуры данных, ООП',
    icon: <Code className="w-6 h-6" />,
    materialsCount: 248,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'english',
    name: 'Английский язык',
    description: 'Грамматика, лексика, разговорная практика',
    icon: <Globe className="w-6 h-6" />,
    materialsCount: 89,
    color: 'from-red-400 to-orange-500',
  },
  {
    id: 'philosophy',
    name: 'Философия',
    description: 'История философии, логика, этика',
    icon: <Brain className="w-6 h-6" />,
    materialsCount: 67,
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'literature',
    name: 'Литература',
    description: 'Русская и мировая литература',
    icon: <BookOpen className="w-6 h-6" />,
    materialsCount: 92,
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'art',
    name: 'История искусств',
    description: 'Живопись, скульптура, архитектура',
    icon: <Palette className="w-6 h-6" />,
    materialsCount: 73,
    color: 'from-orange-400 to-amber-500',
  },
  {
    id: 'music',
    name: 'Музыка',
    description: 'Теория музыки, композиция, история',
    icon: <Music className="w-6 h-6" />,
    materialsCount: 42,
    color: 'from-indigo-400 to-purple-500',
  },
];

interface SubjectsPageProps {
  onSubjectSelect: (subjectId: string) => void;
}

export function SubjectsPage({ onSubjectSelect }: SubjectsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">Выберите предмет</h1>
        <p className="text-muted-foreground">
          Найдите нужный материал среди загруженных студентами конспектов и видеолекций
        </p>
      </div>

      {/* Subjects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSubjectSelect(subject.id)}
          >
            <CardHeader>
              <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {subject.icon}
              </div>
              <CardTitle>{subject.name}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {pluralizeMaterials(subject.materialsCount)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}