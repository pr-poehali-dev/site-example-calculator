import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [command, setCommand] = useState('');
  const [isNewYear, setIsNewYear] = useState(false);
  const [isHardcore, setIsHardcore] = useState(false);
  const { toast } = useToast();

  const normalAnswer = 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3;
  const hardcoreAnswer = Math.pow(999, 9) * Math.sin(Math.PI / 17) + Math.sqrt(555555555) * Math.E + Math.log(999999) * Math.tan(42);
  
  const correctAnswer = isHardcore ? hardcoreAnswer : normalAnswer;

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.startsWith('/')) {
      const cmd = command.toLowerCase();
      
      if (cmd === '/cheat') {
        setAnswer(correctAnswer.toFixed(2));
        toast({
          title: "🎮 Чит активирован!",
          description: "Ответ автоматически подставлен",
          className: "bg-accent text-accent-foreground",
        });
        setCommand('');
      } else if (cmd === '/hardcore') {
        setIsHardcore(true);
        setAnswer('');
        toast({
          title: "💀 Хардкор режим!",
          description: "Теперь задача невозможная...",
          variant: "destructive",
        });
        setCommand('');
      } else if (cmd === '/secret') {
        setIsNewYear(!isNewYear);
        toast({
          title: isNewYear ? "🎄 Новогодняя тема выключена" : "🎄 Новогодняя тема!",
          description: isNewYear ? "Возвращаемся к обычной теме" : "С наступающим!",
          className: "bg-primary text-primary-foreground",
        });
        setCommand('');
      } else {
        toast({
          title: "❓ Неизвестная команда",
          description: "Попробуй /cheat, /hardcore или /secret",
          variant: "destructive",
        });
      }
    }
  };

  const handleCheck = () => {
    setIsChecking(true);
    const userAnswer = parseFloat(answer);
    const tolerance = Math.abs(correctAnswer * 0.01);
    
    setTimeout(() => {
      if (Math.abs(userAnswer - correctAnswer) < tolerance) {
        toast({
          title: "🎉 Правильно!",
          description: `Ответ ${correctAnswer.toFixed(2)} верный!`,
          className: "bg-primary text-primary-foreground",
        });
      } else {
        toast({
          title: "❌ Неверно",
          description: "Попробуй еще раз!",
          variant: "destructive",
        });
      }
      setIsChecking(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${
      isNewYear 
        ? 'bg-gradient-to-br from-red-900 via-green-900 to-blue-900' 
        : 'bg-gradient-to-br from-background via-background to-secondary'
    }`}>
      {isNewYear && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">❄️</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce">🎄</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">⛄</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-bounce">🎁</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-pulse">✨</div>
          <div className="absolute top-1/3 right-1/3 text-4xl animate-bounce">🔔</div>
        </div>
      )}
      
      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            {isHardcore ? '💀 Невозможная загадка' : 'Математическая загадка'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isHardcore ? 'Удачи... она тебе понадобится' : 'Наведи на пример и узнай настоящий вопрос'}
          </p>
        </div>

        <div className="mb-6 max-w-md mx-auto">
          <Input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Введи команду (например: /cheat)..."
            className="h-12 text-sm bg-secondary/50 border-border focus:border-primary transition-colors"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Доступные команды: /cheat, /hardcore, /secret
          </p>
        </div>

        <div 
          className="relative bg-card rounded-3xl p-12 md:p-20 shadow-2xl border border-border overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-primary/20"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div className="relative">
            <div 
              className={`font-mono text-center transition-all duration-700 ease-in-out ${
                isZoomed 
                  ? 'opacity-0 scale-150 blur-md' 
                  : 'opacity-100 scale-100 blur-0'
              }`}
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              <span className="text-7xl md:text-9xl font-bold text-foreground">
                2 + 3
              </span>
            </div>

            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                isZoomed 
                  ? 'opacity-100 scale-100 blur-0' 
                  : 'opacity-0 scale-50 blur-md'
              }`}
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              {isHardcore ? (
                <div className="text-xs md:text-sm lg:text-base text-foreground leading-relaxed max-w-full overflow-x-auto px-4">
                  <div className="whitespace-nowrap">
                    <span className="text-red-500 font-bold">999⁹×sin(π/17)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-yellow-500 font-bold">√555555555×e</span>
                    <span className="text-muted-foreground"> + </span>
                  </div>
                  <div className="whitespace-nowrap mt-2">
                    <span className="text-purple-500 font-bold">ln(999999)×tan(42)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-green-500 font-bold">∫₀^∞ e^(-x²)dx</span>
                  </div>
                  <div className="whitespace-nowrap mt-2 text-red-600 animate-pulse">
                    = ???
                  </div>
                </div>
              ) : (
                <div className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed max-w-full overflow-x-auto px-4">
                  <div className="whitespace-nowrap">
                    <span className="text-primary font-bold">999×6×cos(9)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-accent font-bold">555*π</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-foreground">2+3</span>
                    <span className="text-muted-foreground"> + </span>
                  </div>
                  <div className="whitespace-nowrap mt-2">
                    <span className="text-primary font-bold">999×6×cos(9)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-accent font-bold">555*π</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-foreground">2+3</span>
                    <span className="text-muted-foreground"> + </span>
                  </div>
                  <div className="whitespace-nowrap mt-2">
                    <span className="text-primary font-bold">999×6×cos(9)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-accent font-bold">555*π</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-foreground">2+3</span>
                    <span className="text-muted-foreground"> + </span>
                  </div>
                  <div className="whitespace-nowrap mt-2">
                    <span className="text-primary font-bold">999×6×cos(9)</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-accent font-bold">555*π</span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-foreground">2+3</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-primary transition-all duration-700 ${
            isZoomed ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        <div className="mt-12 max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Введи ответ:
            </label>
            <Input
              type="number"
              step="any"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ваш ответ..."
              className="h-14 text-lg bg-secondary border-border focus:border-primary transition-colors"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            />
          </div>

          <Button
            onClick={handleCheck}
            disabled={!answer || isChecking}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isChecking ? 'Проверяю...' : 'Проверить ответ'}
          </Button>

          {isHardcore ? (
            <p className="text-center text-sm text-red-500 animate-pulse">
              💀 Это невозможно решить без суперкомпьютера
            </p>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Подсказка: cos(9) в радианах ≈ -0.9111
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;