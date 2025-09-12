// Type definitions for the LLM Calculator

export interface LLMProvider {
  id: string;
  name: string;
  type: 'api' | 'opensource';
  description: string;
  website?: string;
  requiresApiKey: boolean;
  models: LLMModel[];
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  parameters: string;
  contextWindow: number;
  memoryRequired: number; // GB for FP16
  quantizationSupport: string[];
  kvCacheSupport: boolean;
  architecture: string;
  modelType: ModelType;
  capabilities: ModelCapability[];
  costPerMToken?: number; // Cost per million tokens (for API models)
  sizeGB: number; // Model size in GB
  isOpenSource: boolean;
}

export type ModelType = 'text-text' | 'text-image' | 'image-text' | 'text-video' | 'multimodal';

export type ModelCapability = 'thinking' | 'tool_call' | 'image' | 'audio' | 'cache' | 'streaming' | 'function_calling' | 'code_generation';

export interface GPU {
  id: string;
  name: string;
  brand: string;
  memory: number;
  computeCapability: string;
  bandwidth: number; // GB/s
  powerConsumption: number; // Watts
  pcieLanes: number;
  cloudCostPerHour?: number;
  retailPrice?: number;
  compatibleMotherboards?: string[];
  generation: string;
  manufacturer: 'nvidia' | 'amd' | 'intel';
  formFactor: string; // Dual-slot, Triple-slot, etc.
  dimensions: string; // Length x Width x Height
  coolingType: 'air' | 'liquid';
}

export interface CPU {
  id: string;
  name: string;
  brand: string;
  cores: number;
  threads: number;
  baseClock: number;
  boost: number;
  tdp: number;
  pcieLanes: number;
  eccSupport: boolean;
  retailPrice?: number;
  socket: string;
  compatibleMotherboards?: string[];
  manufacturer: 'intel' | 'amd';
  generation: string;
  architecture: string;
  cacheL3: number; // MB
}

export interface RAM {
  id: string;
  name: string;
  brand: string;
  type: string; // DDR4, DDR5
  capacity: number; // GB per stick
  speed: number; // MHz
  ecc: boolean;
  pricePerGB: number;
  formFactor: string; // DIMM, SO-DIMM
  voltage: number; // V
  timings: string; // CL-RCD-RP-RAS
  compatibleSockets: string[];
}

export interface Motherboard {
  id: string;
  name: string;
  socket: string;
  chipset: string;
  maxRam: number;
  ramSlots: number;
  pciSlots: number;
  supportedCpus: string[];
  supportedGpus: string[];
  retailPrice: number;
}

export interface PowerSupply {
  id: string;
  name: string;
  wattage: number;
  efficiency: string;
  modular: boolean;
  retailPrice: number;
}

export interface Storage {
  id: string;
  name: string;
  brand: string;
  type: 'ssd' | 'hdd' | 'nvme';
  capacity: number; // GB
  readSpeed: number; // MB/s
  writeSpeed: number; // MB/s
  iops: number;
  pricePerTB: number;
  interface: string; // SATA, NVMe, PCIe
  formFactor: string; // 2.5", 3.5", M.2
  endurance?: number; // TBW for SSDs
  powerConsumption: number; // Watts
}

export interface ServerRack {
  id: string;
  name: string;
  brand: string;
  units: number; // U height
  width: number; // mm
  depth: number; // mm
  maxWeight: number; // kg
  powerDistribution: string;
  cooling: string;
  retailPrice: number;
}

export interface Chassis {
  id: string;
  name: string;
  brand: string;
  formFactor: string; // 4U, 2U, 1U, Tower
  motherboardSupport: string[]; // Supported form factors
  gpuSlots: number;
  maxGpuLength: number; // mm
  storageSlots: {
    "3.5inch": number;
    "2.5inch": number;
    "m.2": number;
  };
  psuSupport: string[]; // ATX, SFX, etc.
  retailPrice: number;
}

export interface NetworkCard {
  id: string;
  name: string;
  brand: string;
  speed: string; // 1GbE, 10GbE, 25GbE, etc.
  ports: number;
  interface: string; // PCIe x8, PCIe x16
  powerConsumption: number; // Watts
  retailPrice: number;
}

export interface CoolingSystem {
  id: string;
  name: string;
  brand: string;
  type: 'air' | 'liquid' | 'hybrid';
  maxTdp: number; // Watts
  compatibleSockets: string[];
  noiseLevel: number; // dB
  dimensions: string; // LxWxH
  retailPrice: number;
}

export interface CloudProvider {
  id: string;
  name: string;
  instances: CloudInstance[];
  regions?: string[];
  website?: string;
}

export interface CloudInstance {
  id: string;
  name: string;
  gpus: number;
  gpuType: string;
  cpu: string;
  ram: number;
  storage: number;
  network: string;
  costPerHour: number;
}

export interface QuantizationOption {
  id: string;
  name: string;
  bitsPerWeight: number;
  memoryReduction: number;
  performanceImpact: number;
}

export interface DeploymentFramework {
  id: string;
  name: string;
  throughputMultiplier: number;
  memoryOverhead: number;
  supportedQuantization: string[];
  supportsOffloading: boolean;
  offloadingTypes: OffloadingType[];
}

export type OffloadingType = 'cpu' | 'ram' | 'nvme';

export interface OffloadingConfig {
  cpu: number; // percentage
  ram: number; // percentage  
  nvme: number; // percentage
}

export interface PerformanceMetrics {
  tokensPerSecond: number;
  latency: number; // ms
  throughput: number; // requests/sec
  concurrentUsers: number;
  memoryUsage: {
    gpu: number; // GB
    cpu: number; // GB
    ram: number; // GB
    nvme: number; // GB
  };
  perUserMetrics: {
    gpuMemory: number; // GB per user
    cpuMemory: number; // GB per user
    electricityCost: number; // $ per user per hour
  };
}

export interface CostBreakdown {
  hardware: {
    gpus: number;
    cpu: number;
    ram: number;
    storage: number;
    motherboard: number;
    psu: number;
    total: number;
  };
  operational: {
    electricity: number;
    maintenance: number;
    cooling: number;
    total: number;
  };
  cloud: {
    compute: number;
    storage: number;
    network: number;
    total: number;
  };
}

export interface PreBuiltServer {
  id: string;
  name: string;
  provider: string;
  gpu: string;
  gpuCount: number;
  cpu: string;
  ram: number;
  storage: number;
  price: number;
  specifications: string;
}

export interface CalculatorState {
  // Environment
  deploymentType: 'cloud' | 'physical' | undefined;
  cloudProvider?: string;
  serverType?: 'custom' | 'prebuilt';
  
  // Provider & Model
  selectedProvider?: LLMProvider;
  selectedModel?: LLMModel;
  customModel?: Partial<LLMModel>;
  
  // Hardware
  serverRack?: ServerRack;
  chassis?: Chassis;
  motherboard?: Motherboard;
  cpu?: CPU;
  ram?: RAM[];
  ssdStorage?: Storage[];
  hddStorage?: Storage[];
  networkCard?: NetworkCard;
  powerSupply?: PowerSupply;
  gpus: GPU[];
  coolingSystem?: CoolingSystem;
  preBuiltServer?: PreBuiltServer;
  
  // Performance
  quantization: QuantizationOption;
  framework: DeploymentFramework;
  batchSize: number;
  kvCache: boolean;
  offloading: OffloadingConfig;
  contextWindow: number;
  
  // Usage
  expectedUsers: number;
  requestsPerHour: number;
  tokensPerRequest: number;
  concurrentUsers: number;
  
  // API Keys
  huggingFaceApiKey?: string;
  providerApiKey?: string;
}

export interface HardwareCompatibility {
  isCompatible: boolean;
  issues: string[];
  warnings: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}