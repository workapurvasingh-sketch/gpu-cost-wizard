import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Cpu, HardDrive, Zap } from 'lucide-react';

const LLM_MODELS = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', size: '175B', memory: 350 },
  { id: 'gpt-4', name: 'GPT-4', size: '1.7T', memory: 3400 },
  { id: 'llama-2-7b', name: 'Llama 2 7B', size: '7B', memory: 14 },
  { id: 'llama-2-13b', name: 'Llama 2 13B', size: '13B', memory: 26 },
  { id: 'llama-2-70b', name: 'Llama 2 70B', size: '70B', memory: 140 },
  { id: 'claude-2', name: 'Claude 2', size: '200B', memory: 400 },
  { id: 'mistral-7b', name: 'Mistral 7B', size: '7B', memory: 14 },
  { id: 'code-llama-34b', name: 'Code Llama 34B', size: '34B', memory: 68 }
];

const QUANTIZATION_OPTIONS = [
  { id: 'fp16', name: 'FP16', multiplier: 1 },
  { id: 'int8', name: 'INT8', multiplier: 0.5 },
  { id: 'int4', name: 'INT4', multiplier: 0.25 }
];

const GPU_OPTIONS = [
  { id: 'h100', name: 'NVIDIA H100', memory: 80, cost: 2.5 },
  { id: 'a100', name: 'NVIDIA A100', memory: 40, cost: 1.2 },
  { id: 'v100', name: 'NVIDIA V100', memory: 16, cost: 0.6 },
  { id: 'rtx4090', name: 'RTX 4090', memory: 24, cost: 0.4 },
  { id: 'rtx3090', name: 'RTX 3090', memory: 24, cost: 0.3 }
];

export const LLMCalculator = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [quantization, setQuantization] = useState('fp16');
  const [batchSize, setBatchSize] = useState('1');
  const [requestsPerHour, setRequestsPerHour] = useState('100');
  const [results, setResults] = useState(null);

  const calculateRequirements = () => {
    const model = LLM_MODELS.find(m => m.id === selectedModel);
    const quant = QUANTIZATION_OPTIONS.find(q => q.id === quantization);
    
    if (!model || !quant) return;

    const memoryRequired = model.memory * quant.multiplier;
    const batchSizeNum = parseInt(batchSize);
    const totalMemoryNeeded = memoryRequired * batchSizeNum;
    
    // Find suitable GPU configuration
    let gpuConfig = null;
    for (const gpu of GPU_OPTIONS) {
      const gpusNeeded = Math.ceil(totalMemoryNeeded / gpu.memory);
      if (gpusNeeded <= 8) { // Reasonable limit
        gpuConfig = {
          ...gpu,
          count: gpusNeeded,
          totalMemory: gpusNeeded * gpu.memory,
          hourlyCost: gpusNeeded * gpu.cost,
          monthlyCost: gpusNeeded * gpu.cost * 24 * 30
        };
        break;
      }
    }

    const requestsNum = parseInt(requestsPerHour);
    const costPerRequest = gpuConfig ? gpuConfig.hourlyCost / requestsNum : 0;

    setResults({
      model,
      memoryRequired: totalMemoryNeeded,
      gpuConfig,
      costPerRequest,
      requestsPerHour: requestsNum
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select LLM Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent>
                  {LLM_MODELS.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{model.name}</span>
                        <Badge variant="secondary">{model.size}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantization</Label>
              <Select value={quantization} onValueChange={setQuantization}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUANTIZATION_OPTIONS.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Batch Size</Label>
              <Input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                min="1"
                max="32"
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Requests/Hour</Label>
              <Input
                type="number"
                value={requestsPerHour}
                onChange={(e) => setRequestsPerHour(e.target.value)}
                min="1"
              />
            </div>
          </div>

          <Button 
            onClick={calculateRequirements} 
            className="w-full"
            variant="gradient"
            disabled={!selectedModel}
          >
            Calculate Requirements
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Memory Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {results.memoryRequired.toFixed(1)} GB
              </div>
              <p className="text-muted-foreground">
                Total VRAM needed for {results.model.name}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Recommended Hardware
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.gpuConfig ? (
                <div className="space-y-2">
                  <div className="text-xl font-bold">
                    {results.gpuConfig.count}x {results.gpuConfig.name}
                  </div>
                  <p className="text-muted-foreground">
                    Total: {results.gpuConfig.totalMemory} GB VRAM
                  </p>
                </div>
              ) : (
                <p className="text-destructive">
                  Configuration too demanding for available hardware
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Cost Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.gpuConfig && (
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    ${results.gpuConfig.monthlyCost.toFixed(0)}/mo
                  </div>
                  <p className="text-muted-foreground">
                    ${results.costPerRequest.toFixed(4)} per request
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on cloud GPU pricing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};