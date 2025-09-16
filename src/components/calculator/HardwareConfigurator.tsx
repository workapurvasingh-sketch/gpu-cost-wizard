import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Cpu, HardDrive, Zap, AlertTriangle, CheckCircle, Info,
  Settings, DollarSign, Activity, Server, Monitor, MemoryStick,
  ChevronRight, ShoppingCart, TrendingUp, Shield
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('gpu');
  const [showSummary, setShowSummary] = useState(false);

  const cloudInstances = selectedProvider ?
    CLOUD_PROVIDERS.find(p => p.id === selectedProvider)?.instances || [] : [];

  const selectedGpu = selectedGpus[0];

  // Auto-switch to next incomplete tab
  React.useEffect(() => {
    if (!selectedGpu && activeTab !== 'gpu') {
      setActiveTab('gpu');
    } else if (!selectedCpu && activeTab !== 'cpu') {
      setActiveTab('cpu');
    } else if (ramAmount === 0 && activeTab !== 'memory') {
      setActiveTab('memory');
    } else if (storageAmount === 0 && activeTab !== 'storage') {
      setActiveTab('storage');
    }
  }, [selectedGpu, selectedCpu, ramAmount, storageAmount, activeTab]);
  const totalGpuMemory = selectedGpu ? selectedGpu.memory * gpuCount : 0;
  const totalPowerDraw = selectedGpu ? selectedGpu.powerConsumption * gpuCount : 0;
  const requiredPcieLanes = selectedGpu ? selectedGpu.pcieLanes * gpuCount : 0;

  // Compatibility validation
  const cpuPcieLanes = selectedCpu?.pcieLanes || 0;
  const pcieLanesOk = cpuPcieLanes >= requiredPcieLanes;
  const powerOk = totalPowerDraw < 1500; // Assuming 1500W PSU limit

  // Calculate completion progress
  const totalComponents = 4; // GPU, CPU, RAM, Storage
  const completedComponents = [
    selectedGpu ? 1 : 0,
    selectedCpu ? 1 : 0,
    ramAmount > 0 ? 1 : 0,
    storageAmount > 0 ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  const completionProgress = (completedComponents / totalComponents) * 100;

  // Calculate total cost
  const totalCost = (selectedGpu ? (selectedGpu.retailPrice || 0) * gpuCount : 0) +
                   (selectedCpu?.retailPrice || 0) +
                   (ramAmount * 0.1) + // Rough estimate for RAM cost
                   (storageAmount * 0.05); // Rough estimate for storage cost

  if (deploymentType === 'cloud') {
    return (
      <TooltipProvider>
        <Card className="shadow-card border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Cloud Instance Configuration
              </CardTitle>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Cloud
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Instance Type
              </Label>
              <Select>
                <SelectTrigger className="h-12 border-2 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="Select instance type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {cloudInstances.map(instance => (
                    <SelectItem key={instance.id} value={instance.id}>
                      <div className="flex justify-between items-center w-full py-2">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <Server className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="font-semibold">{instance.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <Monitor className="w-3 h-3" />
                              {instance.gpus}x {instance.gpuType}
                              <MemoryStick className="w-3 h-3 ml-2" />
                              {instance.ram}GB RAM
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-4">
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
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with Progress */}
        <Card className="shadow-card border-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Hardware Configuration</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure your AI/ML hardware stack
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${totalCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Cost</div>
                </div>
                <Sheet open={showSummary} onOpenChange={setShowSummary}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Summary
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Configuration Summary
                      </SheetTitle>
                      <SheetDescription>
                        Review your selected hardware components
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      {selectedGpu && (
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{selectedGpu.name}</span>
                          </div>
                          <Badge variant="outline">${(selectedGpu.retailPrice || 0) * gpuCount}</Badge>
                        </div>
                      )}
                      {selectedCpu && (
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">{selectedCpu.name}</span>
                          </div>
                          <Badge variant="outline">${selectedCpu.retailPrice}</Badge>
                        </div>
                      )}
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="w-4 h-4 text-green-500" />
                          <span className="font-medium">RAM ({ramAmount}GB)</span>
                        </div>
                        <Badge variant="outline">${(ramAmount * 0.1).toFixed(0)}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Storage ({storageAmount}GB)</span>
                        </div>
                        <Badge variant="outline">${(storageAmount * 0.05).toFixed(0)}</Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Cost</span>
                        <span className="text-green-600 dark:text-green-400">
                          ${totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Configuration Progress</span>
                <span>{completedComponents}/{totalComponents} components</span>
              </div>
              <Progress value={completionProgress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Main Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gpu" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              GPU
              {selectedGpu && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="cpu" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              CPU
              {selectedCpu && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <MemoryStick className="w-4 h-4" />
              Memory
              {ramAmount > 0 && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Storage
              {storageAmount > 0 && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
          </TabsList>

          {/* GPU Tab */}
          <TabsContent value="gpu" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  Graphics Processing Unit (GPU)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      GPU Model
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the GPU model for your AI/ML workloads</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Select
                      value={selectedGpu?.id}
                      onValueChange={(value) => {
                        const gpu = GPU_OPTIONS.find(g => g.id === value);
                        if (gpu) onGpuChange(gpu);
                      }}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select GPU model" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border z-50">
                        {GPU_OPTIONS.map(gpu => (
                          <SelectItem key={gpu.id} value={gpu.id}>
                            <div className="flex justify-between items-center w-full py-2">
                              <div className="flex items-center gap-3">
                                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                  <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-semibold">{gpu.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <MemoryStick className="w-3 h-3" />
                                    {gpu.memory}GB VRAM
                                    <Zap className="w-3 h-3 ml-2" />
                                    {gpu.powerConsumption}W
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="ml-4">
                                ${gpu.retailPrice?.toLocaleString()}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">GPU Count</Label>
                    <Select
                      value={gpuCount.toString()}
                      onValueChange={(value) => onGpuCountChange(parseInt(value))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border z-50">
                        {[1, 2, 4, 8].map(count => (
                          <SelectItem key={count} value={count.toString()}>
                            <div className="flex items-center gap-2">
                              <span>{count}x GPUs</span>
                              {count > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                  Multi-GPU
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedGpu && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      GPU Configuration Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {totalGpuMemory}GB
                        </div>
                        <div className="text-xs text-muted-foreground">Total VRAM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {totalPowerDraw}W
                        </div>
                        <div className="text-xs text-muted-foreground">Power Draw</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {requiredPcieLanes}
                        </div>
                        <div className="text-xs text-muted-foreground">PCIe Lanes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${((selectedGpu.retailPrice || 0) * gpuCount).toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Cost</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CPU Tab */}
          <TabsContent value="cpu" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-orange-500" />
                  Central Processing Unit (CPU)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    CPU Model
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose a CPU that matches your workload requirements</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Select
                    value={selectedCpu?.id}
                    onValueChange={(value) => {
                      const cpu = CPU_OPTIONS.find(c => c.id === value);
                      if (cpu) onCpuChange(cpu);
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select CPU model" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border z-50">
                      {CPU_OPTIONS.map(cpu => (
                        <SelectItem key={cpu.id} value={cpu.id}>
                          <div className="flex justify-between items-center w-full py-2">
                            <div className="flex items-center gap-3">
                              <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                                <Cpu className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div>
                                <div className="font-semibold">{cpu.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <Activity className="w-3 h-3" />
                                  {cpu.cores}C/{cpu.threads}T
                                  <ChevronRight className="w-3 h-3" />
                                  {cpu.pcieLanes} PCIe lanes
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="ml-4">
                              ${cpu.retailPrice?.toLocaleString()}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCpu && (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      CPU Specifications
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {selectedCpu.cores}
                        </div>
                        <div className="text-xs text-muted-foreground">Cores</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {selectedCpu.threads}
                        </div>
                        <div className="text-xs text-muted-foreground">Threads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {selectedCpu.pcieLanes}
                        </div>
                        <div className="text-xs text-muted-foreground">PCIe Lanes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${selectedCpu.retailPrice?.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Cost</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memory Tab */}
          <TabsContent value="memory" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="w-5 h-5 text-green-500" />
                  System Memory (RAM)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    RAM Amount (GB)
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Recommended: 16GB minimum, 64GB+ for AI/ML workloads</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={ramAmount}
                      onChange={(e) => onRamChange(parseInt(e.target.value) || 0)}
                      min="16"
                      max="1024"
                      step="16"
                      className="h-12 text-lg"
                      placeholder="Enter RAM amount in GB"
                    />
                    <div className="flex gap-2">
                      {[32, 64, 128, 256, 512].map(amount => (
                        <Button
                          key={amount}
                          variant={ramAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => onRamChange(amount)}
                          className="flex-1"
                        >
                          {amount}GB
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {ramAmount > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MemoryStick className="w-4 h-4" />
                      Memory Configuration
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {ramAmount}GB
                        </div>
                        <div className="text-xs text-muted-foreground">Total RAM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${(ramAmount * 0.1).toFixed(0)}
                        </div>
                        <div className="text-xs text-muted-foreground">Estimated Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-muted-foreground">
                          {ramAmount >= 64 ? '✅ Recommended' : '⚠️ Minimum'}
                        </div>
                        <div className="text-xs text-muted-foreground">for AI/ML</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage Tab */}
          <TabsContent value="storage" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-purple-500" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Storage Amount (GB)
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Recommended: 500GB+ SSD for datasets and models</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={storageAmount}
                      onChange={(e) => onStorageChange(parseInt(e.target.value) || 0)}
                      min="100"
                      max="10000"
                      step="100"
                      className="h-12 text-lg"
                      placeholder="Enter storage amount in GB"
                    />
                    <div className="flex gap-2">
                      {[500, 1000, 2000, 4000].map(amount => (
                        <Button
                          key={amount}
                          variant={storageAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => onStorageChange(amount)}
                          className="flex-1"
                        >
                          {amount}GB
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {storageAmount > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      Storage Configuration
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {storageAmount}GB
                        </div>
                        <div className="text-xs text-muted-foreground">Total Storage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${(storageAmount * 0.05).toFixed(0)}
                        </div>
                        <div className="text-xs text-muted-foreground">Estimated Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-muted-foreground">
                          {storageAmount >= 500 ? '✅ Recommended' : '⚠️ Minimum'}
                        </div>
                        <div className="text-xs text-muted-foreground">for AI/ML</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Compatibility Status */}
        {selectedGpu && selectedCpu && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compatibility Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className={pcieLanesOk ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-destructive bg-red-50 dark:bg-red-950/20"}>
                <div className="flex items-center gap-3">
                  {pcieLanesOk ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  )}
                  <div>
                    <AlertDescription className="font-medium">
                      PCIe Compatibility: {requiredPcieLanes} required, {cpuPcieLanes} available
                    </AlertDescription>
                    <div className="text-xs text-muted-foreground mt-1">
                      {pcieLanesOk ? '✅ Compatible' : '❌ Insufficient PCIe lanes'}
                    </div>
                  </div>
                </div>
              </Alert>

              <Alert className={powerOk ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-destructive bg-red-50 dark:bg-red-950/20"}>
                <div className="flex items-center gap-3">
                  {powerOk ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  )}
                  <div>
                    <AlertDescription className="font-medium">
                      Power Requirements: {totalPowerDraw}W total draw
                    </AlertDescription>
                    <div className="text-xs text-muted-foreground mt-1">
                      {powerOk ? '✅ Within 1500W PSU limits' : '❌ Exceeds recommended PSU capacity'}
                    </div>
                  </div>
                </div>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};
