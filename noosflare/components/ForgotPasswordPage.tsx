import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { BookOpen, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { toast } from 'sonner@2.0.3';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

type Step = 'email' | 'code' | 'newPassword' | 'success';

export function ForgotPasswordPage({ onBackToLogin }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Таймер для повторной отправки кода
  useEffect(() => {
    if (step === 'code' && !canResend) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, canResend]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Введите email');
      return;
    }

    if (!email.includes('@')) {
      setError('Введите корректный email');
      return;
    }

    // Имитация отправки кода на почту
    toast.success(`Код восстановления отправлен на ${email}`);
    setStep('code');
    setCanResend(false);
    setResendTimer(60);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    toast.success(`Код повторно отправлен на ${email}`);
    setCanResend(false);
    setResendTimer(60);
    setCode('');
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    // Имитация проверки кода
    if (code !== '123456') {
      setError('Неверный код. Попробуйте еще раз или запросите новый код');
      return;
    }

    toast.success('Код подтвержден');
    setStep('newPassword');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Заполните оба поля');
      return;
    }

    if (newPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Имитация смены пароля
    toast.success('Пароль успешно изменен');
    setStep('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">Noosflare</h1>
          <p className="text-muted-foreground">
            {step === 'email' && 'Восстановление пароля'}
            {step === 'code' && 'Введите код из письма'}
            {step === 'newPassword' && 'Создайте новый пароль'}
            {step === 'success' && 'Пароль изменен'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <button
                type="button"
                onClick={onBackToLogin}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад к входу
              </button>

              <div className="text-center mb-4">
                <h2>Забыли пароль?</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Мы отправим код восстановления на вашу почту
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Отправить код
              </Button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h2>Введите код</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Код отправлен на {email}
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="code">Код восстановления</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Для тестирования используйте код: 123456
                </p>
              </div>

              <Button type="submit" className="w-full">
                Подтвердить код
              </Button>

              <div className="text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-primary hover:underline"
                  >
                    Отправить код повторно
                  </button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Отправить код повторно через {resendTimer} сек
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Изменить email
              </button>
            </form>
          )}

          {step === 'newPassword' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h2>Новый пароль</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Создайте надежный пароль
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Изменить пароль
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <div>
                <h2>Пароль успешно изменен</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Теперь вы можете войти с новым паролем
                </p>
              </div>

              <Button onClick={onBackToLogin} className="w-full">
                Перейти к входу
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}