// Type definitions for the LLM Calculator

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  parameters: string;
  contextWindow: number;
  memoryRequired: number; // GB for FP16
  quantizationSupport: string[];
  kvCacheSupport: boolean;
  architecture: string;
}

export interface GPU {
  id: string;
  name: string;
  memory: number;
  computeCapability: string;
  bandwidth: number; // GB/s
  powerConsumption: number; // Watts
  pcieLanes: number;
  cloudCostPerHour?: number;
  retailPrice?: number;
}

export interface CPU {
  id: string;
  name: string;
  cores: number;
  threads: number;
  baseClock: number;
  boost: number;
  tdp: number;
  pcieLanes: number;
  eccSupport: boolean;
  retailPrice?: number;
}

export interface RAM {
  id: string;
  type: string;
  capacity: number;
  speed: number;
  ecc: boolean;
  pricePerGB: number;
}

export interface Storage {
  id: string;
  type: string;
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  iops: number;
  pricePerTB: number;
}

export interface CloudProvider {
  id: string;
  name: string;
  instances: CloudInstance[];
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
}

export interface PerformanceMetrics {
  tokensPerSecond: number;
  latency: number; // ms
  throughput: number; // requests/sec
  concurrentUsers: number;
  memoryUsage: number;
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

export interface CalculatorState {
  // Environment
  deploymentType: 'cloud' | 'physical';
  cloudProvider?: string;
  
  // Model
  selectedModel?: LLMModel;
  customModel?: Partial<LLMModel>;
  
  // Hardware
  gpus: GPU[];
  cpu?: CPU;
  ram?: RAM;
  storage?: Storage;
  
  // Performance
  quantization: QuantizationOption;
  framework: DeploymentFramework;
  batchSize: number;
  kvCache: boolean;
  
  // Usage
  expectedUsers: number;
  requestsPerHour: number;
  tokensPerRequest: number;
  
  // API
  huggingFaceApiKey?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}