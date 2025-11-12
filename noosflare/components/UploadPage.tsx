import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, FileText, Video, CheckCircle2, AlertCircle, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { toast } from 'sonner@2.0.3';
import { subjectNames } from '../data/materials';

export function UploadPage() {
  const [materialType, setMaterialType] = useState<'video' | 'notes'>('video');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [source, setSource] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const subjects = Object.values(subjectNames);

  const topics = {
    'Математический анализ': ['Производные', 'Интегралы', 'Пределы', 'Ряды'],
    'Физика': ['Механика', 'Термодинамика', 'Оптика', 'Электричество'],
    'Программирование': ['Алгоритмы', 'ООП', 'Базы данных', 'Веб-разработка'],
    'Английский язык': ['Грамматика', 'Лексика', 'Разговорная практика', 'Письмо'],
    'Философия': ['История философии', 'Логика', 'Этика', 'Онтология'],
    'Литература': ['Русская литература', 'Мировая литература', 'Поэзия', 'Проза'],
    'История искусств': ['Живопись', 'Скульптура', 'Архитектура', 'История стилей'],
    'Музыка': ['Теория музыки', 'История', 'Композиция', 'Инструменты'],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !topic || !source || !title || !file) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Simulate upload
    setUploadSuccess(true);
    toast.success('Материал успешно загружен и отправлен на модерацию!');

    // Reset form after 2 seconds
    setTimeout(() => {
      setUploadSuccess(false);
      setSubject('');
      setTopic('');
      setSource('');
      setTitle('');
      setDescription('');
      setFile(null);
    }, 2000);
  };

  const handleUploadMore = () => {
    setUploadSuccess(false);
    setSubject('');
    setTopic('');
    setSource('');
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 lg:max-w-[62%]">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                Загрузить материалы
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
                    <SheetTitle>Правила и советы</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Moderation rules */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Правила модерации
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Все материалы проходят проверку перед публикацией
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm mb-2">⏱️ <strong>Время модерации:</strong></p>
                          <p className="text-sm text-muted-foreground">
                            До 3 рабочих дней. Результаты отправляются на вашу почту.
                          </p>
                        </div>

                        <div>
                          <p className="text-sm mb-2">✅ <strong>Одобряются:</strong></p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Качественные конспекты лекций</li>
                            <li>Авторские видеоразборы тем</li>
                            <li>Материалы с указанием источника</li>
                            <li>Корректно оформленные файлы</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm mb-2">❌ <strong>Отклоняются:</strong></p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Плагиат и копирование без ссылок</li>
                            <li>Некачественные или нечитаемые файлы</li>
                            <li>Материалы не по теме предмета</li>
                            <li>Содержимое с нарушением авторских прав</li>
                          </ul>
                        </div>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            После отклонения вы получите подробное объяснение на почту и сможете загрузить материал снова.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>

                    {/* Tips */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          💡 Советы для загрузки
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm">
                            <strong>Название:</strong> Должно четко отражать содержание материала
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            <strong>Источник:</strong> Укажите курс, номер лекции или преподавателя
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            <strong>Качество:</strong> Файлы должны быть читаемыми и структурированными
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            <strong>Формат:</strong> Для видео - MP4, для конспектов - PDF
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Поделитесь своими конспектами и записями лекций с другими студентами
            </p>
          </div>

          {uploadSuccess ? (
            <Card className="border-green-500 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl mb-2">Материал успешно загружен!</h2>
                  <p className="text-muted-foreground mb-6">
                    Ваш материал отправлен на модерацию. После проверки он будет доступен всем пользователям.
                    Уведомление о результатах модерации придет на вашу почту.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleUploadMore}>Загрузить еще материалы</Button>
                    <Button variant="outline" onClick={() => setUploadSuccess(false)}>
                      Вернуться к форме
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Material type selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Тип материала</CardTitle>
                    <CardDescription>Выберите, что вы хотите загрузить</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setMaterialType('video')}
                        className={`p-6 border-2 rounded-lg transition-all ${
                          materialType === 'video'
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Video className={`w-8 h-8 mb-2 ${materialType === 'video' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-left">
                          <p className={materialType === 'video' ? 'text-foreground' : 'text-muted-foreground'}>Видеолекция</p>
                          <p className="text-sm text-muted-foreground">Запись лекции или объяснение темы</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMaterialType('notes')}
                        className={`p-6 border-2 rounded-lg transition-all ${
                          materialType === 'notes'
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <FileText className={`w-8 h-8 mb-2 ${materialType === 'notes' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-left">
                          <p className={materialType === 'notes' ? 'text-foreground' : 'text-muted-foreground'}>Конспект</p>
                          <p className="text-sm text-muted-foreground">PDF файл с конспектом или заметками</p>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Material details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Информация о материале</CardTitle>
                    <CardDescription>Заполните детали для более удобного поиска</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Предмет *</Label>
                        <Select value={subject} onValueChange={setSubject}>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Выберите предмет" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subj) => (
                              <SelectItem key={subj} value={subj}>
                                {subj}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="topic">Тема *</Label>
                        <Select value={topic} onValueChange={setTopic} disabled={!subject}>
                          <SelectTrigger id="topic">
                            <SelectValue placeholder="Выберите тему" />
                          </SelectTrigger>
                          <SelectContent>
                            {subject &&
                              topics[subject as keyof typeof topics]?.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="source">Источник *</Label>
                      <Input
                        id="source"
                        placeholder="Например: Лекция 5, Учебник Фихтенгольца"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Название *</Label>
                      <Input
                        id="title"
                        placeholder="Краткое описательное название материала"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Описание (опционально)</Label>
                      <Textarea
                        id="description"
                        placeholder="Дополнительная информация о материале"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* File upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Загрузка файла</CardTitle>
                    <CardDescription>
                      {materialType === 'video'
                        ? 'Поддерживаемые форматы: MP4, AVI, MOV (макс. 500 МБ)'
                        : 'Поддерживаемые форматы: PDF (макс. 50 МБ)'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept={materialType === 'video' ? 'video/*' : 'application/pdf'}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        {file ? (
                          <div>
                            <p className="text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {(file.size / 1024 / 1024).toFixed(2)} МБ
                            </p>
                            <Button type="button" variant="link" className="mt-2">
                              Выбрать другой файл
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600 mb-2">
                              Перетащите файл сюда или нажмите для выбора
                            </p>
                            <Button type="button" variant="outline">
                              Выбрать файл
                            </Button>
                          </div>
                        )}
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Info alert */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Все загруженные материалы проходят проверку модераторами перед публикацией.
                    Это обычно занимает до 3 рабочих дней.
                  </AlertDescription>
                </Alert>

                {/* Submit button */}
                <div className="flex gap-4">
                  <Button type="submit" size="lg" className="flex-1 sm:flex-none sm:min-w-[200px]">
                    Загрузить материал
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-[38%] lg:max-w-[380px]">
          <div className="sticky top-24">
            {/* Moderation rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Правила модерации
                </CardTitle>
                <CardDescription className="text-sm">
                  Все материалы проходят проверку перед публикацией
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm mb-2">⏱️ <strong>Время модерации:</strong></p>
                  <p className="text-sm text-muted-foreground">
                    До 3 рабочих дней. Результаты отправляются на вашу почту.
                  </p>
                </div>

                <div>
                  <p className="text-sm mb-2">✅ <strong>Одобряются:</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Качественные конспекты лекций</li>
                    <li>Авторские видеоразборы тем</li>
                    <li>Материалы с указанием источника</li>
                    <li>Корректно оформленные файлы</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm mb-2">❌ <strong>Отклоняются:</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Плагиат и копирование без ссылок</li>
                    <li>Некачественные или нечитаемые файлы</li>
                    <li>Материалы не по теме предмета</li>
                    <li>Содержимое с нарушением авторских прав</li>
                  </ul>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    После отклонения вы получите подробное объяснение на почту и сможете загрузить материал снова.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  💡 Советы для загрузки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm">
                    <strong>Название:</strong> Должно четко отражать содержание материала
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Источник:</strong> Укажите курс, номер лекции или преподавателя
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Качество:</strong> Файлы должны быть читаемыми и структурированными
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Формат:</strong> Для видео - MP4, для конспектов - PDF
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}