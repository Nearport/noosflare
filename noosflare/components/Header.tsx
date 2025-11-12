import { User, Page } from '../App';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BookOpen, Upload, Home, User as UserIcon, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  user: User;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Header({ user, currentPage, onNavigate, onLogout }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('subjects')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">Noosflare</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={currentPage === 'subjects' ? 'default' : 'ghost'}
              onClick={() => onNavigate('subjects')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Предметы
            </Button>
            <Button
              variant={currentPage === 'upload' ? 'default' : 'ghost'}
              onClick={() => onNavigate('upload')}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Загрузить материалы
            </Button>
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-600 text-white">
                      {user.nickname.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{user.nickname}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}