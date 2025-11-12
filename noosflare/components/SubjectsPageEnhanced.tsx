import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BookOpen, Calculator, Atom, Code, Globe, Brain, Palette, Music, Search, Clock, Star, TrendingUp, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
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

// Sidebar content component for reuse
function SidebarContent({
  recentlyViewed,
  favorites,
  topSubjects,
  onSubjectSelect,
}: {
  recentlyViewed: string[];
  favorites: string[];
  topSubjects: Subject[];
  onSubjectSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Recently viewed */}
      {recentlyViewed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Недавно просмотренные
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentlyViewed.map((subjectId) => {
              const subject = subjects.find((s) => s.id === subjectId);
              if (!subject) return null;
              return (
                <button
                  key={subject.id}
                  onClick={() => onSubjectSelect(subject.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-white shrink-0`}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pluralizeMaterials(subject.materialsCount)}
                    </p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5" />
              Избранные предметы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {favorites.map((subjectId) => {
              const subject = subjects.find((s) => s.id === subjectId);
              if (!subject) return null;
              return (
                <button
                  key={subject.id}
                  onClick={() => onSubjectSelect(subject.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-white shrink-0`}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pluralizeMaterials(subject.materialsCount)}
                    </p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Top subjects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Популярные предметы
          </CardTitle>
          <CardDescription className="text-sm">Больше всего материалов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {topSubjects.map((subject, index) => (
            <button
              key={subject.id}
              onClick={() => onSubjectSelect(subject.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm">{subject.name}</p>
                <p className="text-xs text-muted-foreground">
                  {pluralizeMaterials(subject.materialsCount)}
                </p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SubjectsPageEnhanced({ onSubjectSelect }: SubjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyViewed] = useState(['math', 'programming']);
  const [favorites, setFavorites] = useState(['physics']);

  const toggleFavorite = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topSubjects = [...subjects]
    .sort((a, b) => b.materialsCount - a.materialsCount)
    .slice(0, 5);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 lg:max-w-[62%]">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                Выберите предмет
              </h1>
              {/* Mobile sidebar trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Навигация</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SidebarContent
                      recentlyViewed={recentlyViewed}
                      favorites={favorites}
                      topSubjects={topSubjects}
                      onSubjectSelect={onSubjectSelect}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Найдите нужный материал среди загруженных студентами конспектов и видеолекций
            </p>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск предметов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2"
              />
            </div>
          </div>

          {/* Subjects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSubjects.map((subject) => (
              <Card
                key={subject.id}
                className="cursor-pointer hover:shadow-lg transition-shadow relative flex flex-col h-full"
                onClick={() => onSubjectSelect(subject.id)}
              >
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-white`}
                    >
                      {subject.icon}
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(e, subject.id)}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                      aria-label={
                        favorites.includes(subject.id)
                          ? 'Убрать из избранного'
                          : 'Добавить в избранное'
                      }
                    >
                      <Star
                        className={`w-5 h-5 ${
                          favorites.includes(subject.id)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge variant="secondary" className="text-xs">
                    {pluralizeMaterials(subject.materialsCount)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Предметы не найдены</p>
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-[38%] lg:max-w-[380px]">
          <div className="sticky top-24">
            <SidebarContent
              recentlyViewed={recentlyViewed}
              favorites={favorites}
              topSubjects={topSubjects}
              onSubjectSelect={onSubjectSelect}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
