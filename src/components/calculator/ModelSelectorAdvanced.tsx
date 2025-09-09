import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Zap, Database, Image, Volume2, Wrench, Code, Cloud } from 'lucide-react';
import { LLMModel, LLMProvider } from '@/types/calculator';

interface ModelSelectorAdvancedProps {
  selectedProvider?: LLMProvider;
  selectedModel?: LLMModel;
  onModelSelect: (model: LLMModel) => void;
}

export const ModelSelectorAdvanced: React.FC<ModelSelectorAdvancedProps> = ({
  selectedProvider,
  selectedModel,
  onModelSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text-text' | 'multimodal'>('all');

  if (!selectedProvider) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Model Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Please select a provider first to view available models
          </p>
        </CardContent>
      </Card>
    );
  }

  const filteredModels = selectedProvider.models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.parameters.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || model.modelType === filterType || 
                       (filterType === 'multimodal' && model.modelType !== 'text-text');
    return matchesSearch && matchesType;
  });

  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case 'image': return <Image className="w-3 h-3" />;
      case 'audio': return <Volume2 className="w-3 h-3" />;
      case 'tool_call': return <Wrench className="w-3 h-3" />;
      case 'code_generation': return <Code className="w-3 h-3" />;
      case 'thinking': return <Brain className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case 'text-text': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'text-image': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'multimodal': return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          {selectedProvider.name} Models
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text-text">Text Only</SelectItem>
              <SelectItem value="multimodal">Multimodal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <Label>Available Models ({filteredModels.length})</Label>
          <Select 
            value={selectedModel?.id} 
            onValueChange={(value) => {
              const model = filteredModels.find(m => m.id === value);
              if (model) onModelSelect(model);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50 max-h-80">
              {filteredModels.map(model => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-1">
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {model.parameters} • {model.contextWindow.toLocaleString()} context
                        {model.costPerMToken ? ` • $${model.costPerMToken}/M tokens` : ' • Free'}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Badge className={getModelTypeColor(model.modelType)}>
                        {model.modelType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {model.sizeGB}GB
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Model Details */}
        {selectedModel && (
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {selectedModel.name}
                  {selectedProvider.type === 'api' && <Cloud className="w-4 h-4" />}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedModel.architecture} • {selectedProvider.name}
                </p>
              </div>
              <Badge className={getModelTypeColor(selectedModel.modelType)}>
                {selectedModel.modelType}
              </Badge>
            </div>

            {/* Model Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Parameters:</span>
                <div className="font-medium">{selectedModel.parameters}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Context:</span>
                <div className="font-medium">{selectedModel.contextWindow.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <div className="font-medium">{selectedModel.sizeGB} GB</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <div className="font-medium">
                  {selectedModel.costPerMToken ? `$${selectedModel.costPerMToken}/M` : 'Free'}
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <span className="text-sm text-muted-foreground mr-2">Capabilities:</span>
              <div className="flex gap-1 flex-wrap mt-1">
                {selectedModel.capabilities.map(capability => (
                  <Badge key={capability} variant="outline" className="text-xs flex items-center gap-1">
                    {getCapabilityIcon(capability)}
                    {capability.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantization Support (for open source models) */}
            {selectedModel.isOpenSource && (
              <div>
                <span className="text-sm text-muted-foreground mr-2">Quantization:</span>
                <div className="flex gap-1 flex-wrap mt-1">
                  {selectedModel.quantizationSupport.map(q => (
                    <Badge key={q} variant="secondary" className="text-xs">
                      {q.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Requirements (for open source models) */}
            {selectedModel.isOpenSource && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-medium">Memory Requirements</span>
                </div>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Requires {selectedModel.memoryRequired}GB VRAM (FP16). Can be reduced with quantization.
                </p>
              </div>
            )}

            {/* API Cost Info */}
            {!selectedModel.isOpenSource && selectedModel.costPerMToken && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Cloud className="w-4 h-4" />
                  <span className="text-sm font-medium">API Pricing</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  ${selectedModel.costPerMToken} per million tokens. No hardware requirements.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};