import { User } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Upload, Settings, Bell, Lock, FileText, Video, UserPlus } from 'lucide-react';
import { Switch } from './ui/switch';
import { useState } from 'react';

interface ProfilePageProps {
  user: User;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || '');

  const uploadedMaterials = [
    {
      id: '1',
      title: 'Производные функций - подробный разбор',
      type: 'video',
      subject: 'Математический анализ',
      status: 'approved',
      uploadDate: '2025-11-05',
    },
    {
      id: '2',
      title: 'Конспект по интегралам',
      type: 'notes',
      subject: 'Математический анализ',
      status: 'pending',
      uploadDate: '2025-11-08',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile header */}
      <div className="bg-card dark:bg-card rounded-2xl shadow-sm p-8 mb-6 border border-border">
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-600 text-white text-3xl">
              {user.nickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl mb-2">{user.nickname}</h1>
            <p className="text-sm text-muted-foreground mb-4">@{user.id}</p>
            <div className="flex gap-6">
              <div>
                <p className="text-2xl">12</p>
                <p className="text-sm text-muted-foreground">Загружено материалов</p>
              </div>
              <div>
                <p className="text-2xl">245</p>
                <p className="text-sm text-muted-foreground">Подписчиков</p>
              </div>
              <div>
                <p className="text-2xl">178</p>
                <p className="text-sm text-muted-foreground">Подписок</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Подписаться
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="materials">Мои материалы</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        {/* My materials */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Загруженные материалы</CardTitle>
              <CardDescription>
                Все материалы, которые вы загрузили на платформу
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadedMaterials.map((material) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {material.type === 'video' ? (
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <p>{material.title}</p>
                      <p className="text-sm text-gray-600">
                        {material.subject} • {new Date(material.uploadDate).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {material.status === 'approved' ? (
                      <Badge className="bg-green-100 text-green-800">Одобрено</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">На модерации</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Личная информация
              </CardTitle>
              <CardDescription>
                Настройте свой профиль и аватар
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-600 text-white text-2xl">
                    {user.nickname.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="mb-2">Аватар профиля</p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Загрузить фото
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Никнейм</Label>
                <Input id="nickname" defaultValue={user.nickname} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
                <p className="text-xs text-muted-foreground">
                  Все уведомления отправляются на этот адрес
                </p>
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Безопасность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Текущий пароль</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите новый пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Изменить пароль</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Конфиденциальность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Показывать мое имя на материалах</p>
                  <p className="text-sm text-gray-600">
                    Другие пользователи увидят ваше имя как автора
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Публичный профиль</p>
                  <p className="text-sm text-gray-600">
                    Разрешить другим пользователям просматривать ваш профиль
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Настройки уведомлений
              </CardTitle>
              <CardDescription>
                Все уведомления отправляются на вашу почту. Управляйте тем, какие уведомления вы хотите получать
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Статус модерации</p>
                  <p className="text-sm text-muted-foreground">
                    Уведомления об одобрении или отклонении материалов
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Новые комментарии</p>
                  <p className="text-sm text-muted-foreground">
                    Когда кто-то оставляет комментарий к вашим материалам
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Новые материалы</p>
                  <p className="text-sm text-muted-foreground">
                    Уведомления о новых материалах по вашим предметам
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Новые подписчики</p>
                  <p className="text-sm text-muted-foreground">
                    Когда кто-то подписывается на ваш профиль
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Помощь и поддержка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Часто задаваемые вопросы
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Отправить отзыв
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Условия использования
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Политика конфиденциальности
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}