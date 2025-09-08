import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Cloud, Server, Zap, Building2 } from 'lucide-react';
import { CLOUD_PROVIDERS } from '@/data/models';

interface DeploymentSelectorProps {
  deploymentType: 'cloud' | 'physical' | undefined;
  selectedProvider?: string;
  onDeploymentTypeChange: (type: 'cloud' | 'physical') => void;
  onProviderChange: (provider: string) => void;
}

export const DeploymentSelector: React.FC<DeploymentSelectorProps> = ({
  deploymentType,
  selectedProvider,
  onDeploymentTypeChange,
  onProviderChange
}) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Deployment Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={deploymentType === 'cloud' ? 'gradient' : 'outline'}
            className="h-24 flex-col gap-2 text-left"
            onClick={() => onDeploymentTypeChange('cloud')}
          >
            <Cloud className="w-8 h-8" />
            <div>
              <div className="font-semibold">Cloud Deployment</div>
              <div className="text-sm opacity-80">AWS, GCP, Azure, RunPod</div>
            </div>
          </Button>
          
          <Button
            variant={deploymentType === 'physical' ? 'gradient' : 'outline'}
            className="h-24 flex-col gap-2 text-left"
            onClick={() => onDeploymentTypeChange('physical')}
          >
            <Server className="w-8 h-8" />
            <div>
              <div className="font-semibold">Physical Server</div>
              <div className="text-sm opacity-80">Custom PC, Rack Server</div>
            </div>
          </Button>
        </div>

        {deploymentType === 'cloud' && (
          <div className="space-y-2">
            <Label>Cloud Provider</Label>
            <Select value={selectedProvider} onValueChange={onProviderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a cloud provider" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {CLOUD_PROVIDERS.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {provider.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {deploymentType === 'physical' && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Physical server deployment will calculate hardware requirements, 
              compatibility validation, and total build cost including components.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};