import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, Database } from 'lucide-react';
import { useQuantizationOptions, useDeploymentFrameworks } from '@/hooks/useProviderData';
import { QuantizationOption, DeploymentFramework, LLMModel } from '@/types/calculator';

interface PerformanceSettingsProps {
  selectedModel?: LLMModel;
  quantization: QuantizationOption;
  framework: DeploymentFramework;
  batchSize: number;
  kvCache: boolean;
  onQuantizationChange: (quantization: QuantizationOption) => void;
  onFrameworkChange: (framework: DeploymentFramework) => void;
  onBatchSizeChange: (size: number) => void;
  onKvCacheChange: (enabled: boolean) => void;
}

export const PerformanceSettings: React.FC<PerformanceSettingsProps> = ({
  selectedModel,
  quantization,
  framework,
  batchSize,
  kvCache,
  onQuantizationChange,
  onFrameworkChange,
  onBatchSizeChange,
  onKvCacheChange
}) => {
  const { data: quantizationOptions = [], isLoading: quantLoading } = useQuantizationOptions();
  const { data: deploymentFrameworks = [], isLoading: frameworksLoading } = useDeploymentFrameworks();

  if (quantLoading || frameworksLoading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="text-center">Loading performance options...</div>
        </CardContent>
      </Card>
    );
  }

  const availableQuantizations = selectedModel 
    ? quantizationOptions.filter(q => selectedModel.quantizationSupport.includes(q.id))
    : quantizationOptions;

  const availableFrameworks = deploymentFrameworks.filter(f =>
    f.supportedQuantization.includes(quantization.id)
  );

  const memoryReduction = quantization.memoryReduction;
  const performanceImpact = quantization.performanceImpact;
  const throughputMultiplier = framework.throughputMultiplier;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Performance Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quantization */}
        <div className="space-y-2">
          <Label>Quantization Level</Label>
          <Select 
            value={quantization.id} 
            onValueChange={(value) => {
              const quant = quantizationOptions.find(q => q.id === value);
              if (quant) onQuantizationChange(quant);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {availableQuantizations.map(quant => (
                <SelectItem key={quant.id} value={quant.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{quant.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {quant.bitsPerWeight}-bit • {Math.round((1 - quant.memoryReduction) * 100)}% memory reduction
                      </div>
                    </div>
                    <Badge variant="outline">
                      {Math.round(quant.performanceImpact * 100)}% perf
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Memory Usage:</span>
                <div className="font-medium">
                  {memoryReduction === 1 ? 'Full' : `${Math.round(memoryReduction * 100)}%`}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Performance:</span>
                <div className="font-medium">{Math.round(performanceImpact * 100)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Framework */}
        <div className="space-y-2">
          <Label>Deployment Framework</Label>
          <Select 
            value={framework.id} 
            onValueChange={(value) => {
              const fw = deploymentFrameworks.find(f => f.id === value);
              if (fw) onFrameworkChange(fw);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {availableFrameworks.map(fw => (
                <SelectItem key={fw.id} value={fw.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{fw.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {fw.throughputMultiplier}x throughput • {Math.round(fw.memoryOverhead * 100)}% overhead
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <Zap className="w-3 h-3 mr-1" />
                      {fw.throughputMultiplier}x
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Throughput Boost:</span>
                <div className="font-medium">{throughputMultiplier}x</div>
              </div>
              <div>
                <span className="text-muted-foreground">Memory Overhead:</span>
                <div className="font-medium">{Math.round(framework.memoryOverhead * 100)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Batch Size and KV Cache */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Batch Size</Label>
            <Select 
              value={batchSize.toString()} 
              onValueChange={(value) => onBatchSizeChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {[1, 2, 4, 8, 16, 32, 64].map(size => (
                  <SelectItem key={size} value={size.toString()}>
                    Batch Size {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                KV Cache
              </Label>
              <Switch
                checked={kvCache}
                onCheckedChange={onKvCacheChange}
                disabled={!selectedModel?.kvCacheSupport}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedModel?.kvCacheSupport 
                ? "Improves inference speed for multi-turn conversations"
                : "Not supported by selected model"
              }
            </p>
          </div>
        </div>

        {/* Performance Preview */}
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-semibold mb-2">Configuration Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Quantization:</span>
              <div className="font-medium">{quantization.name}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Framework:</span>
              <div className="font-medium">{framework.name}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Batch Size:</span>
              <div className="font-medium">{batchSize}</div>
            </div>
            <div>
              <span className="text-muted-foreground">KV Cache:</span>
              <div className="font-medium">{kvCache ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};