import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ArrowLeft, Search, Video, FileText, Download, Eye, ThumbsUp, Flag } from 'lucide-react';
import { getMaterialsBySubject, getSubjectTopics, getSubjectSources, subjectNames } from '../data/materials';
import { pluralizeMaterials } from '../utils/pluralize';
import { toast } from 'sonner@2.0.3';

interface MaterialsPageProps {
  subjectId: string;
  onBack: () => void;
}

export function MaterialsPage({ subjectId, onBack }: MaterialsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [materialType, setMaterialType] = useState<'all' | 'video' | 'notes'>('all');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportingMaterialId, setReportingMaterialId] = useState<string | null>(null);

  const materials = useMemo(() => getMaterialsBySubject(subjectId), [subjectId]);
  const topics = useMemo(() => getSubjectTopics(subjectId), [subjectId]);
  const sources = useMemo(() => getSubjectSources(subjectId), [subjectId]);
  const subjectName = subjectNames[subjectId] || 'Предмет';

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || material.topic === selectedTopic;
    const matchesSource = selectedSource === 'all' || material.source === selectedSource;
    const matchesType = materialType === 'all' || material.type === materialType;
    return matchesSearch && matchesTopic && matchesSource && matchesType;
  });

  const handleReport = () => {
    if (!reportingMaterialId) return;
    // Here you would typically send the report to the server
    toast.success('Материал отправлен на проверку');
    setReportDialogOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Назад к предметам
        </Button>
        <h1 className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">{subjectName}</h1>
        <p className="text-muted-foreground">
          {pluralizeMaterials(filteredMaterials.length)}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск материалов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Topic filter */}
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Тема" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все темы</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Source filter */}
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger>
              <SelectValue placeholder="Источник" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все источники</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type tabs */}
        <Tabs value={materialType} onValueChange={(v) => setMaterialType(v as any)} className="mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">Все материалы</TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Video className="w-4 h-4" />
              Видео
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="w-4 h-4" />
              Конспекты
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Materials list */}
      <div className="space-y-4">
        {filteredMaterials.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Материалы не найдены. Попробуйте изменить фильтры.</p>
            </CardContent>
          </Card>
        ) : (
          filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {material.type === 'video' ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <CardDescription>
                          {material.author} • {new Date(material.uploadDate).toLocaleDateString('ru-RU')}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">{material.topic}</Badge>
                      <Badge variant="outline" className="text-xs">{material.source}</Badge>
                      {material.duration && (
                        <Badge variant="outline">{material.duration}</Badge>
                      )}
                      {material.pages && (
                        <Badge variant="outline">{material.pages} стр.</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="gap-2">
                      <Eye className="w-4 h-4" />
                      Просмотреть
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Скачать
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        setReportDialogOpen(true);
                        setReportingMaterialId(material.id);
                      }}
                    >
                      <Flag className="w-4 h-4" />
                      Сообщить о нарушении
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{material.views}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{material.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Сообщить о нарушении</DialogTitle>
            <DialogDescription>
              Пожалуйста, укажите причину и детали нарушения.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup
              value={reportReason}
              onValueChange={setReportReason}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inappropriate" />
                <Label>Неприемлемое содержание</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="copyright" />
                <Label>Нарушение авторских прав</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" />
                <Label>Другое</Label>
              </div>
            </RadioGroup>
            <Textarea
              placeholder="Детали нарушения..."
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              className="h-20"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReportDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button type="button" onClick={handleReport}>
              Отправить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}