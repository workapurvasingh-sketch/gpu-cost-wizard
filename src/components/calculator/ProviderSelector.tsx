import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Brain, Key, Cloud, HardDrive, Zap } from 'lucide-react';
import { LLM_PROVIDERS } from '@/data/models';
import { LLMProvider } from '@/types/calculator';

interface ProviderSelectorProps {
  selectedProvider?: LLMProvider;
  onProviderSelect: (provider: LLMProvider) => void;
  onApiKeyChange: (key: string) => void;
}

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({
  selectedProvider,
  onProviderSelect,
  onApiKeyChange
}) => {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'api' | 'opensource'>('all');

  const filteredProviders = LLM_PROVIDERS.filter(provider => 
    selectedCategory === 'all' || provider.type === selectedCategory
  );

  const handleApiKeySave = () => {
    onApiKeyChange(apiKeyInput);
    setShowApiKeyDialog(false);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          LLM Provider Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Providers
          </Button>
          <Button
            variant={selectedCategory === 'api' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('api')}
          >
            <Cloud className="w-4 h-4 mr-2" />
            API Providers
          </Button>
          <Button
            variant={selectedCategory === 'opensource' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('opensource')}
          >
            <HardDrive className="w-4 h-4 mr-2" />
            Open Source
          </Button>
        </div>

        {/* Provider Selection */}
        <div className="space-y-2">
          <Label>Choose Provider</Label>
          <Select 
            value={selectedProvider?.id} 
            onValueChange={(value) => {
              const provider = LLM_PROVIDERS.find(p => p.id === value);
              if (provider) onProviderSelect(provider);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an LLM provider" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50 max-h-80">
              {filteredProviders.map(provider => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {provider.name}
                        {provider.type === 'api' ? (
                          <Cloud className="w-3 h-3" />
                        ) : (
                          <HardDrive className="w-3 h-3" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {provider.description} • {provider.models.length} models
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={provider.type === 'api' ? 'default' : 'secondary'}>
                        {provider.type === 'api' ? 'API' : 'Open Source'}
                      </Badge>
                      {provider.requiresApiKey && (
                        <Badge variant="outline" className="text-xs">
                          <Key className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Provider Info */}
        {selectedProvider && (
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {selectedProvider.name}
                  {selectedProvider.type === 'api' ? (
                    <Cloud className="w-4 h-4" />
                  ) : (
                    <HardDrive className="w-4 h-4" />
                  )}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProvider.description}
                </p>
              </div>
              <Badge variant={selectedProvider.type === 'api' ? 'default' : 'secondary'}>
                {selectedProvider.type === 'api' ? 'API Provider' : 'Open Source'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Available Models:</span>
                <div className="font-medium">{selectedProvider.models.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Server Required:</span>
                <div className="font-medium">
                  {selectedProvider.type === 'api' ? 'Basic' : 'GPU Required'}
                </div>
              </div>
            </div>

            {selectedProvider.requiresApiKey && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  API Key Required
                </span>
                <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4 mr-2" />
                      Add API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-popover border-border">
                    <DialogHeader>
                      <DialogTitle>{selectedProvider.name} API Key</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Enter your {selectedProvider.name} API key to access their models.
                      </p>
                      <Input
                        type="password"
                        placeholder="Enter API key..."
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
            )}

            {selectedProvider.type === 'api' && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Server Usage</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  API providers handle model inference. Your server only needs to handle user requests and application logic.
                </p>
              </div>
            )}

            {selectedProvider.type === 'opensource' && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <HardDrive className="w-4 h-4" />
                  <span className="text-sm font-medium">GPU Required</span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Open source models run on your hardware. You'll need sufficient GPU memory and compute power.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};