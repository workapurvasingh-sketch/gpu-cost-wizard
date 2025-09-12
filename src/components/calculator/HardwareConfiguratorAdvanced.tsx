import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Cpu, HardDrive, Zap, AlertTriangle, CheckCircle, Server, 
  MemoryStick, Network, Fan, Monitor, Box 
} from 'lucide-react';
import { 
  GPU_OPTIONS, CPU_OPTIONS, RAM_OPTIONS, STORAGE_OPTIONS,
  MOTHERBOARD_OPTIONS, PSU_OPTIONS, SERVER_RACK_OPTIONS,
  CHASSIS_OPTIONS, NETWORK_CARD_OPTIONS, COOLING_SYSTEM_OPTIONS,
  CLOUD_PROVIDERS
} from '@/data/models';
import { HardwareCompatibilityChecker } from '@/data/hardwareData';
import { 
  GPU, CPU, RAM, Storage, Motherboard, PowerSupply,
  ServerRack, Chassis, NetworkCard, CoolingSystem
} from '@/types/calculator';

interface HardwareConfiguratorAdvancedProps {
  deploymentType: 'cloud' | 'physical' | undefined;
  selectedProvider?: string;
  // Hardware state
  selectedRack?: ServerRack;
  selectedChassis?: Chassis;
  selectedMotherboard?: Motherboard;
  selectedCpu?: CPU;
  selectedGpus: GPU[];
  selectedRam: RAM[];
  selectedSsdStorage: Storage[];
  selectedHddStorage: Storage[];
  selectedNetworkCard?: NetworkCard;
  selectedPsu?: PowerSupply;
  selectedCooling?: CoolingSystem;
  // Change handlers
  onRackChange: (rack: ServerRack) => void;
  onChassisChange: (chassis: Chassis) => void;
  onMotherboardChange: (motherboard: Motherboard) => void;
  onCpuChange: (cpu: CPU) => void;
  onGpuChange: (gpus: GPU[]) => void;
  onRamChange: (ram: RAM[]) => void;
  onSsdStorageChange: (storage: Storage[]) => void;
  onHddStorageChange: (storage: Storage[]) => void;
  onNetworkCardChange: (card: NetworkCard) => void;
  onPsuChange: (psu: PowerSupply) => void;
  onCoolingChange: (cooling: CoolingSystem) => void;
}

export const HardwareConfiguratorAdvanced: React.FC<HardwareConfiguratorAdvancedProps> = ({
  deploymentType,
  selectedProvider,
  selectedRack,
  selectedChassis,
  selectedMotherboard,
  selectedCpu,
  selectedGpus,
  selectedRam,
  selectedSsdStorage,
  selectedHddStorage,
  selectedNetworkCard,
  selectedPsu,
  selectedCooling,
  onRackChange,
  onChassisChange,
  onMotherboardChange,
  onCpuChange,
  onGpuChange,
  onRamChange,
  onSsdStorageChange,
  onHddStorageChange,
  onNetworkCardChange,
  onPsuChange,
  onCoolingChange
}) => {
  const [ramCount, setRamCount] = useState(1);
  const [ssdCount, setSsdCount] = useState(1);
  const [hddCount, setHddCount] = useState(0);
  const [gpuCount, setGpuCount] = useState(1);

  // Compatibility checking
  const compatibility = useMemo(() => 
    HardwareCompatibilityChecker.checkCompatibility(
      selectedCpu,
      selectedMotherboard,
      selectedGpus,
      selectedRam,
      selectedPsu,
      selectedChassis,
      selectedCooling
    ), [selectedCpu, selectedMotherboard, selectedGpus, selectedRam, selectedPsu, selectedChassis, selectedCooling]
  );

  // Get filtered options based on current selections
  const availableMotherboards = useMemo(() => 
    HardwareCompatibilityChecker.getCompatibleMotherboards(selectedCpu, selectedGpus),
    [selectedCpu, selectedGpus]
  );

  const availablePSUs = useMemo(() =>
    HardwareCompatibilityChecker.getCompatiblePSUs(selectedCpu, selectedGpus),
    [selectedCpu, selectedGpus]
  );

  const availableCPUs = useMemo(() => {
    if (!selectedMotherboard) return CPU_OPTIONS;
    return CPU_OPTIONS.filter(cpu => 
      cpu.socket === selectedMotherboard.socket &&
      selectedMotherboard.supportedCpus.includes(cpu.id)
    );
  }, [selectedMotherboard]);

  const availableGPUs = useMemo(() => {
    if (!selectedMotherboard) return GPU_OPTIONS;
    return GPU_OPTIONS.filter(gpu =>
      selectedMotherboard.supportedGpus.includes(gpu.id)
    );
  }, [selectedMotherboard]);

  const availableRAM = useMemo(() => {
    if (!selectedCpu) return RAM_OPTIONS;
    return RAM_OPTIONS.filter(ram =>
      ram.compatibleSockets.includes(selectedCpu.socket)
    );
  }, [selectedCpu]);

  const availableCooling = useMemo(() => {
    if (!selectedCpu) return COOLING_SYSTEM_OPTIONS;
    return COOLING_SYSTEM_OPTIONS.filter(cooling =>
      cooling.compatibleSockets.includes(selectedCpu.socket) &&
      cooling.maxTdp >= selectedCpu.tdp
    );
  }, [selectedCpu]);

  const cloudInstances = selectedProvider ? 
    CLOUD_PROVIDERS.find(p => p.id === selectedProvider)?.instances || [] : [];

  const resetConfiguration = () => {
    onMotherboardChange(undefined as any);
    onCpuChange(undefined as any);
    onGpuChange([]);
    onRamChange([]);
    onSsdStorageChange([]);
    onHddStorageChange([]);
    onPsuChange(undefined as any);
    onCoolingChange(undefined as any);
    onNetworkCardChange(undefined as any);
    onChassisChange(undefined as any);
    onRackChange(undefined as any);
  };

  if (deploymentType === 'cloud') {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
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
    <div className="space-y-6">
      {/* Reset Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hardware Configuration</h2>
        <Button variant="outline" onClick={resetConfiguration}>
          Reset All
        </Button>
      </div>

      {/* Server Rack */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            Server Rack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedRack?.id} 
            onValueChange={(value) => {
              const rack = SERVER_RACK_OPTIONS.find(r => r.id === value);
              if (rack) onRackChange(rack);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select server rack" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {SERVER_RACK_OPTIONS.map(rack => (
                <SelectItem key={rack.id} value={rack.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{rack.brand} {rack.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {rack.units}U • {rack.maxWeight}kg max
                      </div>
                    </div>
                    <Badge variant="outline">
                      ${rack.retailPrice.toLocaleString()}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Chassis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Chassis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedChassis?.id} 
            onValueChange={(value) => {
              const chassis = CHASSIS_OPTIONS.find(c => c.id === value);
              if (chassis) onChassisChange(chassis);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select chassis" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {CHASSIS_OPTIONS.map(chassis => (
                <SelectItem key={chassis.id} value={chassis.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{chassis.brand} {chassis.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {chassis.formFactor} • {chassis.gpuSlots} GPU slots
                      </div>
                    </div>
                    <Badge variant="outline">
                      ${chassis.retailPrice.toLocaleString()}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Motherboard */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Motherboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedMotherboard?.id} 
            onValueChange={(value) => {
              const motherboard = availableMotherboards.find(mb => mb.id === value);
              if (motherboard) onMotherboardChange(motherboard);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select motherboard" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {MOTHERBOARD_OPTIONS.map(motherboard => {
                const isCompatible = availableMotherboards.some(mb => mb.id === motherboard.id);
                return (
                  <SelectItem 
                    key={motherboard.id} 
                    value={motherboard.id}
                    disabled={!isCompatible}
                    className={!isCompatible ? "opacity-50" : ""}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{motherboard.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {motherboard.socket} • {motherboard.pciSlots} PCIe slots
                        </div>
                      </div>
                      <Badge variant={isCompatible ? "outline" : "secondary"}>
                        ${motherboard.retailPrice.toLocaleString()}
                      </Badge>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* CPU */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            CPU (Processor)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedCpu?.id} 
            onValueChange={(value) => {
              const cpu = availableCPUs.find(c => c.id === value);
              if (cpu) onCpuChange(cpu);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select CPU" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {CPU_OPTIONS.map(cpu => {
                const isCompatible = availableCPUs.some(c => c.id === cpu.id);
                return (
                  <SelectItem 
                    key={cpu.id} 
                    value={cpu.id}
                    disabled={!isCompatible}
                    className={!isCompatible ? "opacity-50" : ""}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{cpu.brand} {cpu.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {cpu.cores}C/{cpu.threads}T • {cpu.tdp}W TDP
                        </div>
                      </div>
                      <Badge variant={isCompatible ? "outline" : "secondary"}>
                        ${cpu.retailPrice?.toLocaleString()}
                      </Badge>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* GPU */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            GPU (Graphics Cards)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GPU Model</Label>
              <Select 
                value={selectedGpus[0]?.id} 
                onValueChange={(value) => {
                  const gpu = availableGPUs.find(g => g.id === value);
                  if (gpu) {
                    const newGpus = Array(gpuCount).fill(gpu);
                    onGpuChange(newGpus);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select GPU" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {GPU_OPTIONS.map(gpu => {
                    const isCompatible = availableGPUs.some(g => g.id === gpu.id);
                    return (
                      <SelectItem 
                        key={gpu.id} 
                        value={gpu.id}
                        disabled={!isCompatible}
                        className={!isCompatible ? "opacity-50" : ""}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <div className="font-medium">{gpu.brand} {gpu.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {gpu.memory}GB • {gpu.powerConsumption}W
                            </div>
                          </div>
                          <Badge variant={isCompatible ? "outline" : "secondary"}>
                            ${gpu.retailPrice?.toLocaleString()}
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>GPU Count</Label>
              <Select 
                value={gpuCount.toString()} 
                onValueChange={(value) => {
                  const count = parseInt(value);
                  setGpuCount(count);
                  if (selectedGpus[0]) {
                    const newGpus = Array(count).fill(selectedGpus[0]);
                    onGpuChange(newGpus);
                  }
                }}
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
        </CardContent>
      </Card>

      {/* RAM */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MemoryStick className="w-5 h-5" />
            RAM (Memory)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>RAM Type</Label>
              <Select 
                value={selectedRam[0]?.id} 
                onValueChange={(value) => {
                  const ram = availableRAM.find(r => r.id === value);
                  if (ram) {
                    const newRam = Array(ramCount).fill(ram);
                    onRamChange(newRam);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select RAM" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {RAM_OPTIONS.map(ram => {
                    const isCompatible = availableRAM.some(r => r.id === ram.id);
                    return (
                      <SelectItem 
                        key={ram.id} 
                        value={ram.id}
                        disabled={!isCompatible}
                        className={!isCompatible ? "opacity-50" : ""}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <div className="font-medium">{ram.brand} {ram.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {ram.capacity}GB {ram.type}-{ram.speed} {ram.ecc ? 'ECC' : ''}
                            </div>
                          </div>
                          <Badge variant={isCompatible ? "outline" : "secondary"}>
                            ${(ram.pricePerGB * ram.capacity).toLocaleString()}
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>RAM Sticks</Label>
              <Select 
                value={ramCount.toString()} 
                onValueChange={(value) => {
                  const count = parseInt(value);
                  setRamCount(count);
                  if (selectedRam[0]) {
                    const newRam = Array(count).fill(selectedRam[0]);
                    onRamChange(newRam);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {[1, 2, 4, 8, 16].map(count => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}x sticks
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Storage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SSD Storage */}
          <div className="space-y-4">
            <h4 className="font-semibold">SSD Storage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={selectedSsdStorage[0]?.id} 
                onValueChange={(value) => {
                  const storage = STORAGE_OPTIONS.find(s => s.id === value && s.type !== 'hdd');
                  if (storage) {
                    const newStorage = Array(ssdCount).fill(storage);
                    onSsdStorageChange(newStorage);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select SSD" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {STORAGE_OPTIONS.filter(s => s.type !== 'hdd').map(storage => (
                    <SelectItem key={storage.id} value={storage.id}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{storage.brand} {storage.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {storage.capacity}GB {storage.type.toUpperCase()}
                          </div>
                        </div>
                        <Badge variant="outline">
                          ${Math.round(storage.capacity / 1000 * storage.pricePerTB).toLocaleString()}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={ssdCount.toString()} 
                onValueChange={(value) => {
                  const count = parseInt(value);
                  setSsdCount(count);
                  if (selectedSsdStorage[0]) {
                    const newStorage = Array(count).fill(selectedSsdStorage[0]);
                    onSsdStorageChange(newStorage);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {[1, 2, 4, 8].map(count => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}x SSDs
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* HDD Storage */}
          <div className="space-y-4">
            <h4 className="font-semibold">HDD Storage (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={selectedHddStorage[0]?.id} 
                onValueChange={(value) => {
                  const storage = STORAGE_OPTIONS.find(s => s.id === value && s.type === 'hdd');
                  if (storage) {
                    const newStorage = Array(hddCount).fill(storage);
                    onHddStorageChange(newStorage);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select HDD (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {STORAGE_OPTIONS.filter(s => s.type === 'hdd').map(storage => (
                    <SelectItem key={storage.id} value={storage.id}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{storage.brand} {storage.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {storage.capacity}GB HDD
                          </div>
                        </div>
                        <Badge variant="outline">
                          ${Math.round(storage.capacity / 1000 * storage.pricePerTB).toLocaleString()}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={hddCount.toString()} 
                onValueChange={(value) => {
                  const count = parseInt(value);
                  setHddCount(count);
                  if (selectedHddStorage[0] && count > 0) {
                    const newStorage = Array(count).fill(selectedHddStorage[0]);
                    onHddStorageChange(newStorage);
                  } else {
                    onHddStorageChange([]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {[0, 1, 2, 4, 8].map(count => (
                    <SelectItem key={count} value={count.toString()}>
                      {count === 0 ? 'None' : `${count}x HDDs`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Interface Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Interface Card (NIC)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedNetworkCard?.id} 
            onValueChange={(value) => {
              const card = NETWORK_CARD_OPTIONS.find(n => n.id === value);
              if (card) onNetworkCardChange(card);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select network card (optional)" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {NETWORK_CARD_OPTIONS.map(card => (
                <SelectItem key={card.id} value={card.id}>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium">{card.brand} {card.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {card.ports}x {card.speed} ports
                      </div>
                    </div>
                    <Badge variant="outline">
                      ${card.retailPrice.toLocaleString()}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Power Supply */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Power Supply Unit (PSU)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedPsu?.id} 
            onValueChange={(value) => {
              const psu = availablePSUs.find(p => p.id === value);
              if (psu) onPsuChange(psu);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select power supply" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {PSU_OPTIONS.map(psu => {
                const isCompatible = availablePSUs.some(p => p.id === psu.id);
                return (
                  <SelectItem 
                    key={psu.id} 
                    value={psu.id}
                    disabled={!isCompatible}
                    className={!isCompatible ? "opacity-50" : ""}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{psu.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {psu.wattage}W • {psu.efficiency}
                        </div>
                      </div>
                      <Badge variant={isCompatible ? "outline" : "secondary"}>
                        ${psu.retailPrice.toLocaleString()}
                      </Badge>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Cooling System */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fan className="w-5 h-5" />
            Cooling System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedCooling?.id} 
            onValueChange={(value) => {
              const cooling = availableCooling.find(c => c.id === value);
              if (cooling) onCoolingChange(cooling);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cooling system" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {COOLING_SYSTEM_OPTIONS.map(cooling => {
                const isCompatible = availableCooling.some(c => c.id === cooling.id);
                return (
                  <SelectItem 
                    key={cooling.id} 
                    value={cooling.id}
                    disabled={!isCompatible}
                    className={!isCompatible ? "opacity-50" : ""}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="font-medium">{cooling.brand} {cooling.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {cooling.type} • {cooling.maxTdp}W TDP
                        </div>
                      </div>
                      <Badge variant={isCompatible ? "outline" : "secondary"}>
                        ${cooling.retailPrice.toLocaleString()}
                      </Badge>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Compatibility Status */}
      {(compatibility.issues.length > 0 || compatibility.warnings.length > 0) && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {compatibility.isCompatible ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-destructive" />
              )}
              Compatibility Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {compatibility.issues.map((issue, index) => (
              <Alert key={index} className="border-destructive">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <AlertDescription>{issue}</AlertDescription>
              </Alert>
            ))}
            {compatibility.warnings.map((warning, index) => (
              <Alert key={index} className="border-yellow-500">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            ))}
            {compatibility.isCompatible && compatibility.warnings.length === 0 && (
              <Alert className="border-green-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <AlertDescription>All components are compatible!</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};