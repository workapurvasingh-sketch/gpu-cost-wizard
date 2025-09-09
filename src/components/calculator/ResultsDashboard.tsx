import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  HardDrive, 
  Zap, 
  Clock, 
  Users, 
  Download, 
  Copy,
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';
import { LLMModel, GPU, CPU, PerformanceMetrics, ValidationResult } from '@/types/calculator';

interface ResultsDashboardProps {
  selectedModel?: LLMModel;
  selectedGpu?: GPU;
  selectedCpu?: CPU;
  gpuCount: number;
  performanceMetrics: PerformanceMetrics;
  validationResult: ValidationResult;
  totalCost: number;
  monthlyCost: number;
  onExportConfig: () => void;
  onCopyConfig: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  selectedModel,
  selectedGpu,
  selectedCpu,
  gpuCount,
  performanceMetrics,
  validationResult,
  totalCost,
  monthlyCost,
  onExportConfig,
  onCopyConfig
}) => {
  const memoryUtilization = selectedGpu ? 
    (performanceMetrics.memoryUsage.gpu / (selectedGpu.memory * gpuCount)) * 100 : 0;

  const performanceScore = Math.min(100, 
    (performanceMetrics.tokensPerSecond / 100) * 40 + 
    (100 - performanceMetrics.latency / 10) * 30 + 
    (performanceMetrics.throughput / 10) * 30
  );

  return (
    <div className="space-y-6">
      {/* Validation Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {validationResult.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            Configuration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {validationResult.isValid ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              Configuration is valid and ready for deployment
            </div>
          ) : (
            <div className="space-y-2">
              {validationResult.errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              ))}
            </div>
          )}
          {validationResult.warnings.length > 0 && (
            <div className="mt-2 space-y-1">
              {validationResult.warnings.map((warning, index) => (
                <div key={index} className="flex items-center gap-2 text-yellow-600 text-sm">
                  <AlertTriangle className="w-3 h-3" />
                  {warning}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Tokens/Second
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.tokensPerSecond}</div>
            <div className="text-xs text-muted-foreground">
              Generation Speed
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.latency}ms</div>
            <div className="text-xs text-muted-foreground">
              First Token Latency
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.throughput}</div>
            <div className="text-xs text-muted-foreground">
              Requests/Second
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.memoryUsage.gpu}GB</div>
            <div className="text-xs text-muted-foreground">
              GPU VRAM Used
            </div>
            <div className="mt-2 space-y-1 text-xs">
              <div>CPU: {performanceMetrics.memoryUsage.cpu}GB</div>
              <div>RAM: {performanceMetrics.memoryUsage.ram}GB</div>
              <div>NVMe: {performanceMetrics.memoryUsage.nvme}GB</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hardware Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Hardware Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Model</span>
                  <Badge>{selectedModel?.parameters || 'N/A'}</Badge>
                </div>
                <div className="text-lg font-semibold">{selectedModel?.name || 'No model selected'}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedModel?.contextWindow.toLocaleString()} context window
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Graphics</span>
                  <Badge>{gpuCount}x</Badge>
                </div>
                <div className="text-lg font-semibold">
                  {selectedGpu?.name || 'No GPU selected'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedGpu ? `${selectedGpu.memory * gpuCount}GB Total VRAM` : ''}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">CPU</div>
                <div className="text-lg font-semibold">
                  {selectedCpu?.name || 'No CPU selected'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedCpu ? `${selectedCpu.cores}C/${selectedCpu.threads}T` : ''}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Performance Score</div>
                <div className="flex items-center gap-2">
                  <Progress value={performanceScore} className="flex-1" />
                  <span className="text-sm font-medium">{performanceScore.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Memory Utilization</div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={memoryUtilization} className="w-32" />
                  <span className="text-sm font-medium">{memoryUtilization.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Concurrent Users</div>
                <div className="text-lg font-semibold">{performanceMetrics.concurrentUsers}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Cost Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                ${totalCost.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Initial Investment
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                ${monthlyCost.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Monthly Operating Cost
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                ${((totalCost + monthlyCost * 12) / (365 * 24 * 100)).toFixed(6)}
              </div>
              <div className="text-sm text-muted-foreground">
                Cost per Request
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Export Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={onExportConfig} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Config
            </Button>
            <Button onClick={onCopyConfig} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};