import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Zap, Users, MessageSquare } from 'lucide-react';
import { LLMModel } from '@/types/calculator';

interface APIConfigurationProps {
  selectedModel?: LLMModel;
  contextWindow: number;
  onContextWindowChange: (value: number) => void;
  expectedUsers: number;
  onExpectedUsersChange: (value: number) => void;
  requestsPerHour: number;
  onRequestsPerHourChange: (value: number) => void;
  concurrentRequests: number;
  onConcurrentRequestsChange: (value: number) => void;
}

export const APIConfiguration = ({
  selectedModel,
  contextWindow,
  onContextWindowChange,
  expectedUsers,
  onExpectedUsersChange,
  requestsPerHour,
  onRequestsPerHourChange,
  concurrentRequests,
  onConcurrentRequestsChange
}: APIConfigurationProps) => {
  if (!selectedModel) return null;

  const maxContextWindow = selectedModel.contextWindow;
  const costPerRequest = (selectedModel.costPerMToken / 1000) * (contextWindow / 1000);

  return (
    <div className="space-y-6">
      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Selected Model Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Model</Label>
              <p className="text-lg font-semibold">{selectedModel.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Parameters</Label>
              <p className="text-lg">{selectedModel.parameters}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Max Context Window</Label>
              <p className="text-lg">{maxContextWindow.toLocaleString()} tokens</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Cost per M Tokens</Label>
              <p className="text-lg">${selectedModel.costPerMToken}</p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Capabilities</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedModel.capabilities.map((capability) => (
                <Badge key={capability} variant="secondary">
                  {capability.replace('_', ' ').toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Configure your API usage parameters for cost estimation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Context Window */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Context Window</Label>
              <span className="text-sm text-muted-foreground">
                {contextWindow.toLocaleString()} tokens
              </span>
            </div>
            <Slider
              value={[contextWindow]}
              onValueChange={(value) => onContextWindowChange(value[0])}
              max={maxContextWindow}
              min={1000}
              step={1000}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Estimated cost per request: ${costPerRequest.toFixed(4)}
            </div>
          </div>

          {/* Expected Users */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Expected Users
              </Label>
              <span className="text-sm text-muted-foreground">{expectedUsers}</span>
            </div>
            <Slider
              value={[expectedUsers]}
              onValueChange={(value) => onExpectedUsersChange(value[0])}
              max={10000}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Requests Per Hour */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Requests Per Hour
              </Label>
              <span className="text-sm text-muted-foreground">{requestsPerHour}</span>
            </div>
            <Slider
              value={[requestsPerHour]}
              onValueChange={(value) => onRequestsPerHourChange(value[0])}
              max={10000}
              min={1}
              step={10}
              className="w-full"
            />
          </div>

          {/* Concurrent Requests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Concurrent Requests</Label>
              <span className="text-sm text-muted-foreground">{concurrentRequests}</span>
            </div>
            <Slider
              value={[concurrentRequests]}
              onValueChange={(value) => onConcurrentRequestsChange(value[0])}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimation */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Estimation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Cost per Request</Label>
              <p className="text-lg font-semibold">${costPerRequest.toFixed(4)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Hourly Cost</Label>
              <p className="text-lg font-semibold">
                ${(costPerRequest * requestsPerHour).toFixed(2)}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Daily Cost</Label>
              <p className="text-lg font-semibold">
                ${(costPerRequest * requestsPerHour * 24).toFixed(2)}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Cost</Label>
              <p className="text-lg font-semibold text-primary">
                ${(costPerRequest * requestsPerHour * 24 * 30).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};