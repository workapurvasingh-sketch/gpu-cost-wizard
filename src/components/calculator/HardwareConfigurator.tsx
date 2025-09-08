import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Cpu, HardDrive, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { GPU_OPTIONS, CPU_OPTIONS, CLOUD_PROVIDERS } from '@/data/models';
import { GPU, CPU } from '@/types/calculator';

interface HardwareConfiguratorProps {
  deploymentType: 'cloud' | 'physical' | undefined;
  selectedProvider?: string;
  selectedGpus: GPU[];
  gpuCount: number;
  selectedCpu?: CPU;
  ramAmount: number;
  storageAmount: number;
  onGpuChange: (gpu: GPU) => void;
  onGpuCountChange: (count: number) => void;
  onCpuChange: (cpu: CPU) => void;
  onRamChange: (amount: number) => void;
  onStorageChange: (amount: number) => void;
}

export const HardwareConfigurator: React.FC<HardwareConfiguratorProps> = ({
  deploymentType,
  selectedProvider,
  selectedGpus,
  gpuCount,
  selectedCpu,
  ramAmount,
  storageAmount,
  onGpuChange,
  onGpuCountChange,
  onCpuChange,
  onRamChange,
  onStorageChange
}) => {
  const cloudInstances = selectedProvider ? 
    CLOUD_PROVIDERS.find(p => p.id === selectedProvider)?.instances || [] : [];

  const selectedGpu = selectedGpus[0];
  const totalGpuMemory = selectedGpu ? selectedGpu.memory * gpuCount : 0;
  const totalPowerDraw = selectedGpu ? selectedGpu.powerConsumption * gpuCount : 0;
  const requiredPcieLanes = selectedGpu ? selectedGpu.pcieLanes * gpuCount : 0;

  // Compatibility validation
  const cpuPcieLanes = selectedCpu?.pcieLanes || 0;
  const pcieLanesOk = cpuPcieLanes >= requiredPcieLanes;
  const powerOk = totalPowerDraw < 1500; // Assuming 1500W PSU limit

  if (deploymentType === 'cloud') {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Cloud Instance Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Instance Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select instance type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {cloudInstances.map(instance => (
                  <SelectItem key={instance.id} value={instance.id}>
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{instance.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {instance.gpus}x {instance.gpuType} • {instance.ram}GB RAM
                        </div>
                      </div>
                      <Badge variant="secondary">
                        ${instance.costPerHour}/hr
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="w-5 h-5" />
          Hardware Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* GPU Selection */}
        <div className="space-y-4">
          <Label>Graphics Cards</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              value={selectedGpu?.id} 
              onValueChange={(value) => {
                const gpu = GPU_OPTIONS.find(g => g.id === value);
                if (gpu) onGpuChange(gpu);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select GPU" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {GPU_OPTIONS.map(gpu => (
                  <SelectItem key={gpu.id} value={gpu.id}>
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{gpu.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {gpu.memory}GB • {gpu.powerConsumption}W
                        </div>
                      </div>
                      <Badge variant="outline">
                        ${gpu.retailPrice?.toLocaleString()}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <Label>GPU Count</Label>
              <Select 
                value={gpuCount.toString()} 
                onValueChange={(value) => onGpuCountChange(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {[1, 2, 4, 8].map(count => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}x GPUs
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedGpu && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total VRAM:</span>
                  <div className="font-medium">{totalGpuMemory} GB</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Power Draw:</span>
                  <div className="font-medium">{totalPowerDraw} W</div>
                </div>
                <div>
                  <span className="text-muted-foreground">PCIe Lanes:</span>
                  <div className="font-medium">{requiredPcieLanes}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Cost:</span>
                  <div className="font-medium">
                    ${((selectedGpu.retailPrice || 0) * gpuCount).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CPU Selection */}
        <div className="space-y-2">
          <Label>CPU</Label>
          <Select 
            value={selectedCpu?.id} 
            onValueChange={(value) => {
              const cpu = CPU_OPTIONS.find(c => c.id === value);
              if (cpu) onCpuChange(cpu);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select CPU" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {CPU_OPTIONS.map(cpu => (
                <SelectItem key={cpu.id} value={cpu.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{cpu.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {cpu.cores}C/{cpu.threads}T • {cpu.pcieLanes} PCIe
                      </div>
                    </div>
                    <Badge variant="outline">
                      ${cpu.retailPrice?.toLocaleString()}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* RAM and Storage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>System RAM (GB)</Label>
            <Input
              type="number"
              value={ramAmount}
              onChange={(e) => onRamChange(parseInt(e.target.value) || 0)}
              min="16"
              max="1024"
              step="16"
            />
          </div>

          <div className="space-y-2">
            <Label>Storage (GB)</Label>
            <Input
              type="number"
              value={storageAmount}
              onChange={(e) => onStorageChange(parseInt(e.target.value) || 0)}
              min="100"
              max="10000"
              step="100"
            />
          </div>
        </div>

        {/* Compatibility Validation */}
        {selectedGpu && selectedCpu && (
          <div className="space-y-2">
            <Alert className={pcieLanesOk ? "border-green-500" : "border-destructive"}>
              <div className="flex items-center gap-2">
                {pcieLanesOk ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
                <AlertDescription>
                  PCIe Compatibility: {requiredPcieLanes} required, {cpuPcieLanes} available
                </AlertDescription>
              </div>
            </Alert>

            <Alert className={powerOk ? "border-green-500" : "border-destructive"}>
              <div className="flex items-center gap-2">
                {powerOk ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
                <AlertDescription>
                  Power Requirements: {totalPowerDraw}W {powerOk ? "within limits" : "exceeds 1500W"}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};