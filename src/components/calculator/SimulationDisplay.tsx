import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Zap, Clock, Users, Database } from 'lucide-react';
import { LLMModel, PerformanceMetrics } from '@/types/calculator';

interface SimulationDisplayProps {
  selectedModel?: LLMModel;
  performanceMetrics: PerformanceMetrics;
  isRunning: boolean;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  onResetSimulation: () => void;
}

export const SimulationDisplay: React.FC<SimulationDisplayProps> = ({
  selectedModel,
  performanceMetrics,
  isRunning,
  onStartSimulation,
  onStopSimulation,
  onResetSimulation
}) => {
  const [generatedText, setGeneratedText] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const targetWords = 100;
  const tokensPerWord = 1.3; // Average tokens per word
  const targetTokens = Math.ceil(targetWords * tokensPerWord);
  const generationTimeMs = (targetTokens / performanceMetrics.tokensPerSecond) * 1000;

  const sampleText = [
    "Artificial intelligence has revolutionized the way we approach complex problems.",
    "Machine learning models can process vast amounts of data in milliseconds.",
    "Natural language processing enables computers to understand human communication.",
    "Deep learning architectures have achieved remarkable breakthroughs in recent years.",
    "The future of AI lies in creating more efficient and accessible systems.",
    "Large language models demonstrate impressive capabilities across diverse tasks.",
    "Optimization techniques help reduce computational requirements significantly.",
    "Real-time inference allows for interactive AI applications and services.",
    "Scalable deployment strategies ensure reliable performance under load.",
    "The intersection of AI and hardware continues to drive innovation forward."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentProgress < 100) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 100);
        setCurrentProgress(prev => {
          const newProgress = Math.min(100, prev + (100 / (generationTimeMs / 100)));
          
          // Add text progressively
          if (newProgress > prev) {
            const wordsToShow = Math.floor((newProgress / 100) * targetWords);
            const words = sampleText.join(' ').split(' ').slice(0, wordsToShow);
            setGeneratedText(words.join(' '));
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentProgress, generationTimeMs, targetWords]);

  const handleReset = () => {
    setGeneratedText('');
    setCurrentProgress(0);
    setElapsedTime(0);
    onResetSimulation();
  };

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const currentTokens = Math.floor((currentProgress / 100) * targetTokens);
  const currentWords = Math.floor(currentTokens / tokensPerWord);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Live Generation Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Info */}
        {selectedModel && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{selectedModel.name}</h4>
              <Badge variant="outline">{selectedModel.parameters}</Badge>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Speed</div>
                <div className="font-medium">{performanceMetrics.tokensPerSecond} tok/sec</div>
              </div>
              <div>
                <div className="text-muted-foreground">Latency</div>
                <div className="font-medium">{performanceMetrics.latency}ms</div>
              </div>
              <div>
                <div className="text-muted-foreground">Memory</div>
                <div className="font-medium">{performanceMetrics.memoryUsage.gpu}GB</div>
              </div>
              <div>
                <div className="text-muted-foreground">Users</div>
                <div className="font-medium">{performanceMetrics.concurrentUsers}</div>
              </div>
            </div>
          </div>
        )}

        {/* Generation Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentWords}/{targetWords} words • {formatTime(elapsedTime)}
            </div>
          </div>
          
          <Progress value={currentProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-2 bg-muted rounded">
              <div className="text-muted-foreground">Tokens Generated</div>
              <div className="font-bold text-lg">{currentTokens}</div>
            </div>
            <div className="text-center p-2 bg-muted rounded">
              <div className="text-muted-foreground">Completion</div>
              <div className="font-bold text-lg">{currentProgress.toFixed(1)}%</div>
            </div>
            <div className="text-center p-2 bg-muted rounded">
              <div className="text-muted-foreground">ETA</div>
              <div className="font-bold text-lg">
                {formatTime(Math.max(0, generationTimeMs - elapsedTime))}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Text Display */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="text-sm font-medium">Generated Output</span>
          </div>
          <div className="min-h-32 p-4 bg-background border rounded-lg">
            <div className="text-sm leading-relaxed">
              {generatedText}
              {isRunning && (
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-muted-foreground text-xs">Per-User GPU</div>
            <div className="font-bold">{performanceMetrics.perUserMetrics.gpuMemory}GB</div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-muted-foreground text-xs">Per-User CPU</div>
            <div className="font-bold">{performanceMetrics.perUserMetrics.cpuMemory}GB</div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-muted-foreground text-xs">Per-User Cost</div>
            <div className="font-bold">${performanceMetrics.perUserMetrics.electricityCost}/hr</div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-muted-foreground text-xs">Throughput</div>
            <div className="font-bold">{performanceMetrics.throughput} req/s</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <Button onClick={onStartSimulation} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Start Simulation
            </Button>
          ) : (
            <Button onClick={onStopSimulation} variant="outline" className="flex items-center gap-2">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};