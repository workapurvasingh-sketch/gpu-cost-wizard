import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useLLMModels } from '@/hooks/useProviderData';
import { Brain, Zap, DollarSign, Clock, Shield, Database } from 'lucide-react';

export const ModelComparison = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const { data: models, isLoading } = useLLMModels();

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const filteredModels = selectedModels.length > 0 
    ? models?.filter(model => selectedModels.includes(model.id))
    : models?.slice(0, 6); // Show first 6 models by default

  if (isLoading) {
    return <div>Loading models...</div>;
  }

  const getPerformanceScore = (model: any) => {
    // Calculate a performance score based on model parameters and capabilities
    const parameterScore = model.parameters ? Math.min(parseInt(model.parameters.replace(/[^0-9]/g, '')) / 100, 100) : 50;
    const capabilityScore = (model.capabilities?.length || 0) * 10;
    return Math.min(parameterScore + capabilityScore, 100);
  };

  const getMemoryRequirement = (model: any) => {
    // Estimate memory requirement based on model size
    if (model.size_gb) return model.size_gb;
    if (model.parameters) {
      const params = parseInt(model.parameters.replace(/[^0-9]/g, ''));
      return Math.ceil(params * 2); // Rough estimate: 2GB per billion parameters
    }
    return 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Models to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {models?.map((model) => (
              <div key={model.id} className="flex items-center space-x-2">
                <Checkbox
                  id={model.id}
                  checked={selectedModels.includes(model.id)}
                  onCheckedChange={() => toggleModel(model.id)}
                />
                <label
                  htmlFor={model.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {model.name}
                  <span className="text-muted-foreground ml-1">(Provider)</span>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Model</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Parameters</TableHead>
              <TableHead>Context Window</TableHead>
              <TableHead>Memory Required</TableHead>
              <TableHead>Cost per M Tokens</TableHead>
              <TableHead>Performance Score</TableHead>
              <TableHead>Capabilities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModels?.map((model) => {
              const performanceScore = getPerformanceScore(model);
              const memoryReq = getMemoryRequirement(model);
              
              return (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-semibold">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.architecture}</div>
                      {model.isOpenSource && (
                        <Badge variant="secondary" className="text-xs">Open Source</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Provider</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span>{model.parameters || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <span>{model.contextWindow?.toLocaleString() || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>{typeof memoryReq === 'number' ? `${memoryReq}GB` : memoryReq}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${model.costPerMToken || 'Free'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{performanceScore}/100</div>
                      <Progress value={performanceScore} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities?.slice(0, 3).map((capability: string) => (
                        <Badge key={capability} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                      {(model.capabilities?.length || 0) > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(model.capabilities?.length || 0) - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Detailed Performance Cards */}
      {selectedModels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels?.map((model) => {
            const performanceScore = getPerformanceScore(model);
            const memoryReq = getMemoryRequirement(model);
            
            return (
              <Card key={model.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{model.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Provider</Badge>
                    {model.isOpenSource && (
                      <Badge variant="secondary">Open Source</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Performance</span>
                      <span className="font-semibold">{performanceScore}/100</span>
                    </div>
                    <Progress value={performanceScore} className="h-2" />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parameters:</span>
                      <span className="font-medium">{model.parameters || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Context:</span>
                      <span className="font-medium">{model.contextWindow?.toLocaleString() || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="font-medium">
                        {typeof memoryReq === 'number' ? `${memoryReq}GB` : memoryReq}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="font-medium">${model.costPerMToken || 'Free'}/M tokens</span>
                    </div>
                  </div>

                  {model.capabilities && model.capabilities.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Capabilities:</span>
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.map((capability: string) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};