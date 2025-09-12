import { 
  GPU, CPU, RAM, Storage, Motherboard, PowerSupply, 
  ServerRack, Chassis, NetworkCard, CoolingSystem,
  HardwareCompatibility 
} from '@/types/calculator';

// Comprehensive GPU options with real brands and models
export const GPU_OPTIONS: GPU[] = [
  // NVIDIA Enterprise GPUs
  {
    id: 'h100-sxm5-80gb',
    name: 'H100 SXM5 80GB',
    brand: 'NVIDIA',
    memory: 80,
    computeCapability: '9.0',
    bandwidth: 3350,
    powerConsumption: 700,
    pcieLanes: 16,
    cloudCostPerHour: 2.5,
    retailPrice: 25000,
    generation: 'Hopper',
    manufacturer: 'nvidia',
    formFactor: 'Dual-slot',
    dimensions: '267 x 133 x 37mm',
    coolingType: 'liquid',
    compatibleMotherboards: ['supermicro-h12ssl', 'asus-pro-ws-trx50']
  },
  {
    id: 'a100-pcie-80gb',
    name: 'A100 PCIe 80GB',
    brand: 'NVIDIA',
    memory: 80,
    computeCapability: '8.0',
    bandwidth: 1935,
    powerConsumption: 300,
    pcieLanes: 16,
    cloudCostPerHour: 1.8,
    retailPrice: 15000,
    generation: 'Ampere',
    manufacturer: 'nvidia',
    formFactor: 'Dual-slot',
    dimensions: '267 x 112 x 38mm',
    coolingType: 'air',
    compatibleMotherboards: ['supermicro-h12ssl', 'asus-pro-ws-trx50', 'gigabyte-mc62']
  },
  {
    id: 'a6000-ada',
    name: 'RTX A6000 Ada Generation',
    brand: 'NVIDIA',
    memory: 48,
    computeCapability: '8.9',
    bandwidth: 960,
    powerConsumption: 300,
    pcieLanes: 16,
    retailPrice: 6800,
    generation: 'Ada Lovelace',
    manufacturer: 'nvidia',
    formFactor: 'Dual-slot',
    dimensions: '267 x 112 x 38mm',
    coolingType: 'air',
    compatibleMotherboards: ['asus-rog-crosshair', 'msi-z790-godlike', 'gigabyte-mc62']
  },
  // Consumer GPUs
  {
    id: 'rtx-4090-asus-rog-strix',
    name: 'RTX 4090 ROG STRIX',
    brand: 'ASUS',
    memory: 24,
    computeCapability: '8.9',
    bandwidth: 1008,
    powerConsumption: 450,
    pcieLanes: 16,
    retailPrice: 1800,
    generation: 'Ada Lovelace',
    manufacturer: 'nvidia',
    formFactor: 'Triple-slot',
    dimensions: '357.6 x 149.3 x 70.1mm',
    coolingType: 'air',
    compatibleMotherboards: ['asus-rog-crosshair', 'msi-z790-godlike']
  },
  {
    id: 'rtx-4090-msi-gaming-x-trio',
    name: 'RTX 4090 Gaming X Trio',
    brand: 'MSI',
    memory: 24,
    computeCapability: '8.9',
    bandwidth: 1008,
    powerConsumption: 450,
    pcieLanes: 16,
    retailPrice: 1700,
    generation: 'Ada Lovelace',
    manufacturer: 'nvidia',
    formFactor: 'Triple-slot',
    dimensions: '336 x 140 x 78mm',
    coolingType: 'air',
    compatibleMotherboards: ['asus-rog-crosshair', 'msi-z790-godlike']
  },
  {
    id: 'rtx-3090-evga-ftw3-ultra',
    name: 'RTX 3090 FTW3 Ultra',
    brand: 'EVGA',
    memory: 24,
    computeCapability: '8.6',
    bandwidth: 936,
    powerConsumption: 400,
    pcieLanes: 16,
    retailPrice: 900,
    generation: 'Ampere',
    manufacturer: 'nvidia',
    formFactor: 'Triple-slot',
    dimensions: '300 x 137 x 55.88mm',
    coolingType: 'air',
    compatibleMotherboards: ['asus-rog-crosshair', 'msi-z790-godlike']
  }
];

// Comprehensive CPU options
export const CPU_OPTIONS: CPU[] = [
  // AMD EPYC Server CPUs
  {
    id: 'epyc-9754',
    name: 'EPYC 9754',
    brand: 'AMD',
    cores: 128,
    threads: 256,
    baseClock: 2.25,
    boost: 3.1,
    tdp: 360,
    pcieLanes: 128,
    eccSupport: true,
    retailPrice: 11805,
    socket: 'SP5',
    manufacturer: 'amd',
    generation: 'Genoa',
    architecture: 'Zen 4',
    cacheL3: 256,
    compatibleMotherboards: ['supermicro-h13ssl', 'asus-krpa-u16']
  },
  {
    id: 'epyc-7763',
    name: 'EPYC 7763',
    brand: 'AMD',
    cores: 64,
    threads: 128,
    baseClock: 2.45,
    boost: 3.5,
    tdp: 280,
    pcieLanes: 128,
    eccSupport: true,
    retailPrice: 7890,
    socket: 'SP3',
    manufacturer: 'amd',
    generation: 'Milan',
    architecture: 'Zen 3',
    cacheL3: 256,
    compatibleMotherboards: ['supermicro-h12ssl', 'asus-pro-ws-trx50']
  },
  // Intel Xeon Server CPUs
  {
    id: 'xeon-8480-plus',
    name: 'Xeon Platinum 8480+',
    brand: 'Intel',
    cores: 56,
    threads: 112,
    baseClock: 2.0,
    boost: 3.8,
    tdp: 350,
    pcieLanes: 80,
    eccSupport: true,
    retailPrice: 17000,
    socket: 'LGA4677',
    manufacturer: 'intel',
    generation: 'Sapphire Rapids',
    architecture: 'Golden Cove',
    cacheL3: 105,
    compatibleMotherboards: ['supermicro-x13sae', 'asus-pro-ws-w790e']
  },
  // Consumer CPUs
  {
    id: 'ryzen-9-7950x3d',
    name: 'Ryzen 9 7950X3D',
    brand: 'AMD',
    cores: 16,
    threads: 32,
    baseClock: 4.2,
    boost: 5.7,
    tdp: 120,
    pcieLanes: 28,
    eccSupport: false,
    retailPrice: 699,
    socket: 'AM5',
    manufacturer: 'amd',
    generation: 'Raphael',
    architecture: 'Zen 4',
    cacheL3: 128,
    compatibleMotherboards: ['asus-rog-crosshair', 'msi-x670e-carbon']
  },
  {
    id: 'i9-13900ks',
    name: 'Core i9-13900KS',
    brand: 'Intel',
    cores: 24,
    threads: 32,
    baseClock: 3.2,
    boost: 6.0,
    tdp: 150,
    pcieLanes: 24,
    eccSupport: false,
    retailPrice: 729,
    socket: 'LGA1700',
    manufacturer: 'intel',
    generation: 'Raptor Lake',
    architecture: 'Raptor Cove',
    cacheL3: 36,
    compatibleMotherboards: ['msi-z790-godlike', 'asus-rog-maximus-z790']
  }
];

// Comprehensive RAM options
export const RAM_OPTIONS: RAM[] = [
  // Server RAM - DDR5
  {
    id: 'samsung-m393a8g40ab2-cweby',
    name: 'M393A8G40AB2-CWEBY',
    brand: 'Samsung',
    type: 'DDR5',
    capacity: 64,
    speed: 4800,
    ecc: true,
    pricePerGB: 12,
    formFactor: 'DIMM',
    voltage: 1.1,
    timings: '40-39-39-77',
    compatibleSockets: ['SP5', 'SP3', 'LGA4677']
  },
  {
    id: 'micron-mta36asf8g72pz-3g2e1',
    name: 'MTA36ASF8G72PZ-3G2E1',
    brand: 'Micron',
    type: 'DDR4',
    capacity: 64,
    speed: 3200,
    ecc: true,
    pricePerGB: 8,
    formFactor: 'DIMM',
    voltage: 1.2,
    timings: '22-22-22-52',
    compatibleSockets: ['SP3', 'LGA4189']
  },
  // Consumer RAM - DDR5
  {
    id: 'corsair-dominator-platinum-rgb-ddr5-5600',
    name: 'Dominator Platinum RGB DDR5-5600',
    brand: 'Corsair',
    type: 'DDR5',
    capacity: 32,
    speed: 5600,
    ecc: false,
    pricePerGB: 8,
    formFactor: 'DIMM',
    voltage: 1.25,
    timings: '36-36-36-76',
    compatibleSockets: ['AM5', 'LGA1700']
  },
  {
    id: 'gskill-trident-z5-ddr5-6000',
    name: 'Trident Z5 RGB DDR5-6000',
    brand: 'G.Skill',
    type: 'DDR5',
    capacity: 32,
    speed: 6000,
    ecc: false,
    pricePerGB: 9,
    formFactor: 'DIMM',
    voltage: 1.35,
    timings: '30-38-38-96',
    compatibleSockets: ['AM5', 'LGA1700']
  }
];

// Storage options with real brands
export const STORAGE_OPTIONS: Storage[] = [
  // NVMe SSDs
  {
    id: 'samsung-990-pro-4tb',
    name: '990 PRO 4TB',
    brand: 'Samsung',
    type: 'nvme',
    capacity: 4000,
    readSpeed: 7450,
    writeSpeed: 6900,
    iops: 1400000,
    pricePerTB: 200,
    interface: 'PCIe 4.0 x4',
    formFactor: 'M.2 2280',
    endurance: 2400,
    powerConsumption: 7
  },
  {
    id: 'wd-black-sn850x-2tb',
    name: 'Black SN850X 2TB',
    brand: 'Western Digital',
    type: 'nvme',
    capacity: 2000,
    readSpeed: 7300,
    writeSpeed: 6600,
    iops: 1200000,
    pricePerTB: 150,
    interface: 'PCIe 4.0 x4',
    formFactor: 'M.2 2280',
    endurance: 1200,
    powerConsumption: 5.8
  },
  // SATA SSDs
  {
    id: 'samsung-870-evo-4tb',
    name: '870 EVO 4TB',
    brand: 'Samsung',
    type: 'ssd',
    capacity: 4000,
    readSpeed: 560,
    writeSpeed: 530,
    iops: 98000,
    pricePerTB: 100,
    interface: 'SATA III',
    formFactor: '2.5"',
    endurance: 2400,
    powerConsumption: 3.5
  },
  // HDDs
  {
    id: 'seagate-exos-x18-18tb',
    name: 'Exos X18 18TB',
    brand: 'Seagate',
    type: 'hdd',
    capacity: 18000,
    readSpeed: 261,
    writeSpeed: 261,
    iops: 550,
    pricePerTB: 15,
    interface: 'SATA III',
    formFactor: '3.5"',
    powerConsumption: 8.5
  }
];

// Motherboard options
export const MOTHERBOARD_OPTIONS: Motherboard[] = [
  {
    id: 'supermicro-h13ssl',
    name: 'H13SSL-N',
    socket: 'SP5',
    chipset: 'AMD SP5',
    maxRam: 3072,
    ramSlots: 12,
    pciSlots: 8,
    supportedCpus: ['epyc-9754'],
    supportedGpus: ['h100-sxm5-80gb', 'a100-pcie-80gb'],
    retailPrice: 1200
  },
  {
    id: 'supermicro-h12ssl',
    name: 'H12SSL-i',
    socket: 'SP3',
    chipset: 'AMD SP3',
    maxRam: 2048,
    ramSlots: 8,
    pciSlots: 7,
    supportedCpus: ['epyc-7763'],
    supportedGpus: ['h100-sxm5-80gb', 'a100-pcie-80gb', 'a6000-ada'],
    retailPrice: 800
  },
  {
    id: 'asus-rog-crosshair',
    name: 'ROG Crosshair X670E Hero',
    socket: 'AM5',
    chipset: 'X670E',
    maxRam: 128,
    ramSlots: 4,
    pciSlots: 4,
    supportedCpus: ['ryzen-9-7950x3d'],
    supportedGpus: ['rtx-4090-asus-rog-strix', 'rtx-4090-msi-gaming-x-trio', 'rtx-3090-evga-ftw3-ultra'],
    retailPrice: 650
  },
  {
    id: 'msi-z790-godlike',
    name: 'MEG Z790 Godlike',
    socket: 'LGA1700',
    chipset: 'Z790',
    maxRam: 128,
    ramSlots: 4,
    pciSlots: 4,
    supportedCpus: ['i9-13900ks'],
    supportedGpus: ['rtx-4090-asus-rog-strix', 'rtx-4090-msi-gaming-x-trio', 'rtx-3090-evga-ftw3-ultra'],
    retailPrice: 900
  }
];

// Power Supply options
export const PSU_OPTIONS: PowerSupply[] = [
  {
    id: 'corsair-ax1600i',
    name: 'AX1600i Digital ATX',
    wattage: 1600,
    efficiency: '80+ Titanium',
    modular: true,
    retailPrice: 600
  },
  {
    id: 'seasonic-prime-px-1300',
    name: 'PRIME PX-1300',
    wattage: 1300,
    efficiency: '80+ Platinum',
    modular: true,
    retailPrice: 450
  },
  {
    id: 'evga-supernova-1000-p6',
    name: 'SuperNOVA 1000 P6',
    wattage: 1000,
    efficiency: '80+ Platinum',
    modular: true,
    retailPrice: 280
  },
  {
    id: 'thermaltake-toughpower-gf3-850',
    name: 'Toughpower GF3 850W',
    wattage: 850,
    efficiency: '80+ Gold',
    modular: true,
    retailPrice: 150
  }
];

// Server Racks
export const SERVER_RACK_OPTIONS: ServerRack[] = [
  {
    id: 'apc-netshelter-sx-42u',
    name: 'NetShelter SX 42U',
    brand: 'APC',
    units: 42,
    width: 750,
    depth: 1070,
    maxWeight: 1361,
    powerDistribution: 'Integrated PDU',
    cooling: 'Perforated front/rear doors',
    retailPrice: 2500
  },
  {
    id: 'tripp-lite-sr25ub',
    name: 'SmartRack 25U',
    brand: 'Tripp Lite',
    units: 25,
    width: 600,
    depth: 930,
    maxWeight: 680,
    powerDistribution: 'Optional PDU',
    cooling: 'Mesh doors',
    retailPrice: 800
  }
];

// Chassis options
export const CHASSIS_OPTIONS: Chassis[] = [
  {
    id: 'supermicro-sys-4029gp-trt2',
    name: 'SuperChassis 4029GP-TRT2',
    brand: 'SuperMicro',
    formFactor: '4U',
    motherboardSupport: ['E-ATX', 'SSI EEB'],
    gpuSlots: 8,
    maxGpuLength: 330,
    storageSlots: {
      "3.5inch": 8,
      "2.5inch": 0,
      "m.2": 4
    },
    psuSupport: ['2000W Redundant'],
    retailPrice: 3500
  },
  {
    id: 'fractal-define-7-xl',
    name: 'Define 7 XL',
    brand: 'Fractal Design',
    formFactor: 'Tower',
    motherboardSupport: ['E-ATX', 'ATX', 'mATX', 'ITX'],
    gpuSlots: 4,
    maxGpuLength: 491,
    storageSlots: {
      "3.5inch": 14,
      "2.5inch": 6,
      "m.2": 0
    },
    psuSupport: ['ATX', 'SFX'],
    retailPrice: 250
  }
];

// Network Interface Cards
export const NETWORK_CARD_OPTIONS: NetworkCard[] = [
  {
    id: 'mellanox-connectx-6-dx',
    name: 'ConnectX-6 Dx',
    brand: 'NVIDIA Mellanox',
    speed: '100GbE',
    ports: 2,
    interface: 'PCIe 4.0 x16',
    powerConsumption: 23,
    retailPrice: 2500
  },
  {
    id: 'intel-x710-da4',
    name: 'Ethernet X710-DA4',
    brand: 'Intel',
    speed: '10GbE',
    ports: 4,
    interface: 'PCIe 3.0 x8',
    powerConsumption: 20,
    retailPrice: 800
  }
];

// Cooling Systems
export const COOLING_SYSTEM_OPTIONS: CoolingSystem[] = [
  {
    id: 'noctua-nh-d15',
    name: 'NH-D15',
    brand: 'Noctua',
    type: 'air',
    maxTdp: 220,
    compatibleSockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200'],
    noiseLevel: 24.6,
    dimensions: '150 x 161 x 165mm',
    retailPrice: 100
  },
  {
    id: 'corsair-h150i-elite-capellix',
    name: 'H150i Elite Capellix',
    brand: 'Corsair',
    type: 'liquid',
    maxTdp: 300,
    compatibleSockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'SP3', 'LGA4677'],
    noiseLevel: 37,
    dimensions: '397 x 120 x 27mm',
    retailPrice: 180
  }
];

// Hardware Compatibility Checker
export class HardwareCompatibilityChecker {
  static checkCompatibility(
    cpu?: CPU,
    motherboard?: Motherboard,
    gpus: GPU[] = [],
    ram?: RAM[],
    psu?: PowerSupply,
    chassis?: Chassis,
    cooling?: CoolingSystem
  ): HardwareCompatibility {
    const issues: string[] = [];
    const warnings: string[] = [];

    // CPU and Motherboard compatibility
    if (cpu && motherboard) {
      if (cpu.socket !== motherboard.socket) {
        issues.push(`CPU socket ${cpu.socket} is not compatible with motherboard socket ${motherboard.socket}`);
      }
      if (!motherboard.supportedCpus.includes(cpu.id)) {
        warnings.push(`CPU ${cpu.name} may not be officially supported by ${motherboard.name}`);
      }
    }

    // GPU compatibility
    if (gpus.length > 0 && motherboard) {
      // Check PCIe slots
      const requiredSlots = gpus.length;
      if (requiredSlots > motherboard.pciSlots) {
        issues.push(`${requiredSlots} GPUs require ${requiredSlots} PCIe slots, but motherboard only has ${motherboard.pciSlots}`);
      }

      // Check GPU compatibility with motherboard
      gpus.forEach(gpu => {
        if (!motherboard.supportedGpus.includes(gpu.id)) {
          warnings.push(`GPU ${gpu.name} may not be officially supported by ${motherboard.name}`);
        }
      });

      // Check chassis GPU compatibility
      if (chassis) {
        const maxGpuLength = Math.max(...gpus.map(gpu => parseInt(gpu.dimensions.split('x')[0])));
        if (maxGpuLength > chassis.maxGpuLength) {
          issues.push(`GPU length ${maxGpuLength}mm exceeds chassis maximum of ${chassis.maxGpuLength}mm`);
        }
        
        if (gpus.length > chassis.gpuSlots) {
          issues.push(`${gpus.length} GPUs exceed chassis capacity of ${chassis.gpuSlots} slots`);
        }
      }
    }

    // Power Supply compatibility
    if (psu && (cpu || gpus.length > 0)) {
      let totalPowerDraw = 0;
      if (cpu) totalPowerDraw += cpu.tdp;
      totalPowerDraw += gpus.reduce((sum, gpu) => sum + gpu.powerConsumption, 0);
      totalPowerDraw += 100; // System overhead

      if (totalPowerDraw > psu.wattage * 0.8) {
        issues.push(`System power draw (~${totalPowerDraw}W) exceeds PSU safe capacity (${Math.round(psu.wattage * 0.8)}W at 80% load)`);
      } else if (totalPowerDraw > psu.wattage * 0.6) {
        warnings.push(`System power draw (~${totalPowerDraw}W) is high relative to PSU capacity (${psu.wattage}W)`);
      }
    }

    // RAM compatibility
    if (ram && ram.length > 0 && motherboard) {
      const totalRam = ram.reduce((sum, stick) => sum + stick.capacity, 0);
      if (totalRam > motherboard.maxRam) {
        issues.push(`Total RAM ${totalRam}GB exceeds motherboard maximum of ${motherboard.maxRam}GB`);
      }
      
      if (ram.length > motherboard.ramSlots) {
        issues.push(`${ram.length} RAM sticks exceed motherboard capacity of ${motherboard.ramSlots} slots`);
      }
    }

    // Cooling compatibility
    if (cooling && cpu) {
      if (cpu.tdp > cooling.maxTdp) {
        issues.push(`CPU TDP (${cpu.tdp}W) exceeds cooler maximum (${cooling.maxTdp}W)`);
      }
      
      if (!cooling.compatibleSockets.includes(cpu.socket)) {
        issues.push(`Cooler is not compatible with CPU socket ${cpu.socket}`);
      }
    }

    return {
      isCompatible: issues.length === 0,
      issues,
      warnings
    };
  }

  static getFilteredOptions<T extends { compatibleMotherboards?: string[] }>(
    options: T[], 
    selectedMotherboard?: Motherboard,
    filterKey: keyof Motherboard = 'supportedGpus'
  ): T[] {
    if (!selectedMotherboard) return options;
    
    return options.filter(option => {
      if (!option.compatibleMotherboards) return true;
      return option.compatibleMotherboards.includes(selectedMotherboard.id);
    });
  }

  static getCompatibleMotherboards(
    selectedCpu?: CPU,
    selectedGpus: GPU[] = []
  ): Motherboard[] {
    return MOTHERBOARD_OPTIONS.filter(mb => {
      // CPU compatibility
      if (selectedCpu && mb.socket !== selectedCpu.socket) return false;
      if (selectedCpu && !mb.supportedCpus.includes(selectedCpu.id)) return false;

      // GPU compatibility
      if (selectedGpus.length > 0) {
        const hasIncompatibleGpu = selectedGpus.some(gpu => 
          !mb.supportedGpus.includes(gpu.id)
        );
        if (hasIncompatibleGpu) return false;
        
        if (selectedGpus.length > mb.pciSlots) return false;
      }

      return true;
    });
  }

  static getCompatiblePSUs(
    selectedCpu?: CPU,
    selectedGpus: GPU[] = []
  ): PowerSupply[] {
    let requiredWattage = 100; // Base system
    if (selectedCpu) requiredWattage += selectedCpu.tdp;
    requiredWattage += selectedGpus.reduce((sum, gpu) => sum + gpu.powerConsumption, 0);

    return PSU_OPTIONS.filter(psu => psu.wattage >= requiredWattage * 1.25); // 25% headroom
  }
}