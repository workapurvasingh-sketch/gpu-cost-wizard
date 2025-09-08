import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Brain, Key, Search, Plus, Database } from 'lucide-react';
import { POPULAR_MODELS } from '@/data/models';
import { LLMModel } from '@/types/calculator';

interface ModelSelectorProps {
  selectedModel?: LLMModel;
  huggingFaceApiKey?: string;
  onModelSelect: (model: LLMModel) => void;
  onApiKeyChange: (key: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  huggingFaceApiKey,
  onModelSelect,
  onApiKeyChange
}) => {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(huggingFaceApiKey || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomModel, setShowCustomModel] = useState(false);

  const handleApiKeySave = () => {
    onApiKeyChange(apiKeyInput);
    setShowApiKeyDialog(false);
  };

  const filteredModels = POPULAR_MODELS.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Model Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          
          <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Key className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-popover border-border">
              <DialogHeader>
                <DialogTitle>Hugging Face API Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add your Hugging Face API key to access additional models and features.
                </p>
                <Input
                  type="password"
                  placeholder="hf_..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleApiKeySave}>
                    Save API Key
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <Label>Popular Models</Label>
          <Select 
            value={selectedModel?.id} 
            onValueChange={(value) => {
              const model = POPULAR_MODELS.find(m => m.id === value);
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
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {model.provider} • {model.contextWindow.toLocaleString()} context
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Badge variant="secondary" className="text-xs">
                        {model.parameters}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {model.memoryRequired}GB
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {huggingFaceApiKey && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowCustomModel(!showCustomModel)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Browse HuggingFace Models
            </Button>
          </div>
        )}

        {selectedModel && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold">{selectedModel.name}</h4>
              <Badge>{selectedModel.architecture}</Badge>
            </div>
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
                <span className="text-muted-foreground">Memory (FP16):</span>
                <div className="font-medium">{selectedModel.memoryRequired} GB</div>
              </div>
              <div>
                <span className="text-muted-foreground">KV Cache:</span>
                <div className="font-medium">{selectedModel.kvCacheSupport ? 'Yes' : 'No'}</div>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <span className="text-sm text-muted-foreground mr-2">Quantization:</span>
              {selectedModel.quantizationSupport.map(q => (
                <Badge key={q} variant="outline" className="text-xs">
                  {q.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {!huggingFaceApiKey && (
          <div className="p-4 border border-dashed border-border rounded-lg text-center">
            <Database className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Add your Hugging Face API key to access thousands more models
            </p>
            <Button variant="outline" onClick={() => setShowApiKeyDialog(true)}>
              <Key className="w-4 h-4 mr-2" />
              Add API Key
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};