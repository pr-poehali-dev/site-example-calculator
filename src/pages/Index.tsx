import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const correctAnswer = 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3 + 999 * 6 * Math.cos(9) + 555 * Math.PI + 2 + 3;

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Математическая загадка
          </h1>
          <p className="text-muted-foreground text-lg">
            Наведи на пример и узнай настоящий вопрос
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

          <p className="text-center text-sm text-muted-foreground">
            Подсказка: cos(9) в радианах ≈ -0.9111
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
