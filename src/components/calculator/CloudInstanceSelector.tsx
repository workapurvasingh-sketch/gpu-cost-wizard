import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCloudProviders } from '@/hooks/useProviderData';
import { CloudProvider, CloudInstance } from '@/types/calculator';
import { Cloud, Server, Cpu, HardDrive, Wifi, DollarSign } from 'lucide-react';

interface CloudInstanceSelectorProps {
  selectedProvider?: CloudProvider;
  selectedInstance?: CloudInstance;
  onProviderChange: (provider: CloudProvider) => void;
  onInstanceChange: (instance: CloudInstance) => void;
}

export const CloudInstanceSelector = ({
  selectedProvider,
  selectedInstance,
  onProviderChange,
  onInstanceChange
}: CloudInstanceSelectorProps) => {
  const { data: cloudProviders = [], isLoading } = useCloudProviders();

  if (isLoading) {
    return <div>Loading cloud providers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Cloud Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Cloud Provider
          </CardTitle>
          <CardDescription>
            Select your preferred cloud infrastructure provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select
                value={selectedProvider?.id}
                onValueChange={(value) => {
                  const provider = cloudProviders.find(p => p.id === value);
                  if (provider) onProviderChange(provider);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a cloud provider" />
                </SelectTrigger>
                <SelectContent>
                  {cloudProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center gap-2">
                        <span>{provider.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {provider.instances.length} instances
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProvider && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Available Regions</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedProvider.regions.map((region) => (
                    <Badge key={region} variant="secondary" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instance Selection */}
      {selectedProvider && selectedProvider.instances.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Instance Type
            </CardTitle>
            <CardDescription>
              Choose the instance that matches your model requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Instance</Label>
                <Select
                  value={selectedInstance?.id}
                  onValueChange={(value) => {
                    const instance = selectedProvider.instances.find(i => i.id === value);
                    if (instance) onInstanceChange(instance);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an instance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProvider.instances.map((instance) => (
                      <SelectItem key={instance.id} value={instance.id}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{instance.name}</span>
                            <Badge variant="outline" className="text-xs">
                              ${instance.costPerHour}/hr
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {instance.gpus}x {instance.gpuType} • {instance.ram}GB RAM
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instance Details */}
      {selectedInstance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Instance Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">CPU</Label>
                    <p className="text-sm text-muted-foreground">{selectedInstance.cpu}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">GPU Configuration</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.gpus}x {selectedInstance.gpuType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">RAM</Label>
                    <p className="text-sm text-muted-foreground">{selectedInstance.ram}GB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">Storage</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.storage > 0 ? `${selectedInstance.storage}GB` : 'Network attached'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">Network</Label>
                    <p className="text-sm text-muted-foreground">{selectedInstance.network}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm">Cost</Label>
                    <p className="text-lg font-semibold text-primary">
                      ${selectedInstance.costPerHour}/hour
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Cost Estimates (Pay-as-you-go)</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Daily</p>
                  <p className="font-semibold">${(selectedInstance.costPerHour * 1).toFixed(2)}/day*</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Weekly</p>
                  <p className="font-semibold">${(selectedInstance.costPerHour * 7).toFixed(2)}/week*</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                  <p className="font-semibold text-primary">
                    ${(selectedInstance.costPerHour * 24 * 5).toFixed(2)}/month*
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * Costs shown for 1 hour daily usage. Scale as needed for your application.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};