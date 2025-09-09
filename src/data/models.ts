import { 
  LLMModel, 
  LLMProvider, 
  GPU, 
  CPU, 
  RAM, 
  Storage, 
  CloudProvider, 
  QuantizationOption, 
  DeploymentFramework,
  Motherboard,
  PowerSupply,
  PreBuiltServer
} from '@/types/calculator';

// LLM Providers with comprehensive model data
export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'api',
    description: 'Leading AI provider with GPT models',
    website: 'https://openai.com',
    requiresApiKey: true,
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        providerId: 'openai',
        parameters: '175B',
        contextWindow: 128000,
        memoryRequired: 0,
        quantizationSupport: [],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'multimodal',
        capabilities: ['thinking', 'tool_call', 'image', 'streaming', 'function_calling', 'code_generation'],
        costPerMToken: 2.5,
        sizeGB: 0,
        isOpenSource: false
      },
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OpenAI',
        providerId: 'openai',
        parameters: '175B',
        contextWindow: 128000,
        memoryRequired: 0,
        quantizationSupport: [],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'text-text',
        capabilities: ['thinking', 'tool_call', 'streaming', 'function_calling', 'code_generation'],
        costPerMToken: 10,
        sizeGB: 0,
        isOpenSource: false
      }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'api',
    description: 'Claude models with advanced reasoning',
    website: 'https://anthropic.com',
    requiresApiKey: true,
    models: [
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        providerId: 'anthropic',
        parameters: '175B',
        contextWindow: 200000,
        memoryRequired: 0,
        quantizationSupport: [],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'multimodal',
        capabilities: ['thinking', 'tool_call', 'image', 'streaming', 'function_calling', 'code_generation'],
        costPerMToken: 3,
        sizeGB: 0,
        isOpenSource: false
      }
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    type: 'opensource',
    description: 'Open source Llama models',
    website: 'https://llama.meta.com',
    requiresApiKey: false,
    models: [
      {
        id: 'llama-3.1-8b',
        name: 'Llama 3.1 8B',
        provider: 'Meta',
        providerId: 'meta',
        parameters: '8B',
        contextWindow: 128000,
        memoryRequired: 16,
        quantizationSupport: ['fp16', 'int8', 'int4'],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'text-text',
        capabilities: ['streaming', 'code_generation'],
        costPerMToken: 0,
        sizeGB: 16,
        isOpenSource: true
      },
      {
        id: 'llama-3.1-70b',
        name: 'Llama 3.1 70B',
        provider: 'Meta',
        providerId: 'meta',
        parameters: '70B',
        contextWindow: 128000,
        memoryRequired: 140,
        quantizationSupport: ['fp16', 'int8', 'int4'],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'text-text',
        capabilities: ['streaming', 'code_generation'],
        costPerMToken: 0,
        sizeGB: 140,
        isOpenSource: true
      }
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    type: 'opensource',
    description: 'Efficient open source models',
    website: 'https://mistral.ai',
    requiresApiKey: false,
    models: [
      {
        id: 'mistral-7b-v0.3',
        name: 'Mistral 7B v0.3',
        provider: 'Mistral AI',
        providerId: 'mistral',
        parameters: '7B',
        contextWindow: 32768,
        memoryRequired: 14,
        quantizationSupport: ['fp16', 'int8', 'int4'],
        kvCacheSupport: true,
        architecture: 'Transformer',
        modelType: 'text-text',
        capabilities: ['streaming', 'code_generation'],
        costPerMToken: 0,
        sizeGB: 14,
        isOpenSource: true
      }
    ]
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    type: 'opensource',
    description: 'Advanced reasoning models',
    website: 'https://deepseek.com',
    requiresApiKey: false,
    models: [
      {
        id: 'deepseek-r1-3b',
        name: 'DeepSeek-R1 3B',
        provider: 'DeepSeek',
        providerId: 'deepseek',
        parameters: '3B',
        contextWindow: 32768,
        memoryRequired: 7.52,
        quantizationSupport: ['fp16', 'int8', 'int4'],
        kvCacheSupport: true,
        architecture: 'MLA',
        modelType: 'text-text',
        capabilities: ['thinking', 'streaming', 'code_generation'],
        costPerMToken: 0,
        sizeGB: 7.52,
        isOpenSource: true
      }
    ]
  }
];

// Get all models from providers
export const POPULAR_MODELS: LLMModel[] = LLM_PROVIDERS.flatMap(provider => provider.models);

export const GPU_OPTIONS: GPU[] = [
  {
    id: 'h100',
    name: 'NVIDIA H100',
    memory: 80,
    computeCapability: '9.0',
    bandwidth: 3350,
    powerConsumption: 700,
    pcieLanes: 16,
    cloudCostPerHour: 2.5,
    retailPrice: 25000,
    generation: 'Hopper',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 'a100',
    name: 'NVIDIA A100',
    memory: 40,
    computeCapability: '8.0',
    bandwidth: 1555,
    powerConsumption: 400,
    pcieLanes: 16,
    cloudCostPerHour: 1.2,
    retailPrice: 11000,
    generation: 'Ampere',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 'a6000',
    name: 'NVIDIA A6000',
    memory: 48,
    computeCapability: '8.6',
    bandwidth: 768,
    powerConsumption: 300,
    pcieLanes: 16,
    retailPrice: 4500,
    generation: 'Ampere',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 'rtx4090',
    name: 'RTX 4090',
    memory: 24,
    computeCapability: '8.9',
    bandwidth: 1008,
    powerConsumption: 450,
    pcieLanes: 16,
    retailPrice: 1600,
    generation: 'Ada Lovelace',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-3', 'motherboard-4']
  },
  {
    id: 'rtx3090',
    name: 'RTX 3090',
    memory: 24,
    computeCapability: '8.6',
    bandwidth: 936,
    powerConsumption: 350,
    pcieLanes: 16,
    retailPrice: 800,
    generation: 'Ampere',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-3', 'motherboard-4']
  },
  {
    id: 'v100',
    name: 'NVIDIA V100',
    memory: 16,
    computeCapability: '7.0',
    bandwidth: 900,
    powerConsumption: 300,
    pcieLanes: 16,
    cloudCostPerHour: 0.6,
    retailPrice: 3000,
    generation: 'Volta',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 't4',
    name: 'NVIDIA T4',
    memory: 16,
    computeCapability: '7.5',
    bandwidth: 320,
    powerConsumption: 70,
    pcieLanes: 16,
    cloudCostPerHour: 0.35,
    retailPrice: 1200,
    generation: 'Turing',
    manufacturer: 'nvidia',
    compatibleMotherboards: ['motherboard-3', 'motherboard-4']
  }
];

export const CPU_OPTIONS: CPU[] = [
  {
    id: 'epyc-7763',
    name: 'AMD EPYC 7763',
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
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 'xeon-8380',
    name: 'Intel Xeon 8380',
    cores: 40,
    threads: 80,
    baseClock: 2.3,
    boost: 3.4,
    tdp: 270,
    pcieLanes: 64,
    eccSupport: true,
    retailPrice: 8099,
    socket: 'LGA4189',
    manufacturer: 'intel',
    compatibleMotherboards: ['motherboard-1', 'motherboard-2']
  },
  {
    id: 'ryzen-9950x',
    name: 'AMD Ryzen 9 9950X',
    cores: 16,
    threads: 32,
    baseClock: 4.3,
    boost: 5.7,
    tdp: 170,
    pcieLanes: 28,
    eccSupport: false,
    retailPrice: 649,
    socket: 'AM5',
    manufacturer: 'amd',
    compatibleMotherboards: ['motherboard-3', 'motherboard-4']
  },
  {
    id: 'i9-14900k',
    name: 'Intel i9-14900K',
    cores: 24,
    threads: 32,
    baseClock: 3.2,
    boost: 6.0,
    tdp: 253,
    pcieLanes: 24,
    eccSupport: false,
    retailPrice: 589,
    socket: 'LGA1700',
    manufacturer: 'intel',
    compatibleMotherboards: ['motherboard-3', 'motherboard-4']
  }
];

export const MOTHERBOARD_OPTIONS: Motherboard[] = [
  {
    id: 'motherboard-1',
    name: 'ASUS Pro WS TRX50-SAGE WIFI',
    socket: 'SP3',
    chipset: 'TRX50',
    maxRam: 512,
    ramSlots: 8,
    pciSlots: 7,
    supportedCpus: ['epyc-7763', 'xeon-8380'],
    supportedGpus: ['h100', 'a100', 'v100'],
    retailPrice: 1200
  },
  {
    id: 'motherboard-2',
    name: 'Supermicro H12SSL-i',
    socket: 'SP3',
    chipset: 'H12',
    maxRam: 1024,
    ramSlots: 8,
    pciSlots: 8,
    supportedCpus: ['epyc-7763'],
    supportedGpus: ['h100', 'a100', 'a6000', 'v100'],
    retailPrice: 800
  },
  {
    id: 'motherboard-3',
    name: 'ASUS ROG Crosshair X670E Hero',
    socket: 'AM5',
    chipset: 'X670E',
    maxRam: 128,
    ramSlots: 4,
    pciSlots: 4,
    supportedCpus: ['ryzen-9950x'],
    supportedGpus: ['rtx4090', 'rtx3090', 't4'],
    retailPrice: 650
  },
  {
    id: 'motherboard-4',
    name: 'MSI Z790 Godlike',
    socket: 'LGA1700',
    chipset: 'Z790',
    maxRam: 128,
    ramSlots: 4,
    pciSlots: 4,
    supportedCpus: ['i9-14900k'],
    supportedGpus: ['rtx4090', 'rtx3090', 't4'],
    retailPrice: 900
  }
];

export const PSU_OPTIONS: PowerSupply[] = [
  {
    id: 'corsair-ax1600i',
    name: 'Corsair AX1600i',
    wattage: 1600,
    efficiency: '80+ Titanium',
    modular: true,
    retailPrice: 600
  },
  {
    id: 'evga-supernova-1300',
    name: 'EVGA SuperNOVA 1300 G2',
    wattage: 1300,
    efficiency: '80+ Gold',
    modular: true,
    retailPrice: 400
  },
  {
    id: 'seasonic-prime-1000',
    name: 'Seasonic PRIME TX-1000',
    wattage: 1000,
    efficiency: '80+ Titanium',
    modular: true,
    retailPrice: 350
  }
];

export const PREBUILT_SERVERS: PreBuiltServer[] = [
  {
    id: 'lambdalabs-vector',
    name: 'Lambda Vector',
    provider: 'Lambda Labs',
    gpu: '8x H100',
    gpuCount: 8,
    cpu: 'Intel Xeon Gold 6326',
    ram: 512,
    storage: 7680,
    price: 220000,
    specifications: '8x NVIDIA H100 80GB, Dual Intel Xeon Gold 6326, 512GB DDR4, 7.68TB NVMe'
  },
  {
    id: 'supermicro-sys-420gp',
    name: 'SuperMicro SYS-420GP-TNAR',
    provider: 'SuperMicro',
    gpu: '4x A100',
    gpuCount: 4,
    cpu: 'AMD EPYC 7763',
    ram: 256,
    storage: 3840,
    price: 85000,
    specifications: '4x NVIDIA A100 40GB, AMD EPYC 7763, 256GB DDR4, 3.84TB NVMe'
  }
];

export const QUANTIZATION_OPTIONS: QuantizationOption[] = [
  {
    id: 'fp16',
    name: 'FP16',
    bitsPerWeight: 16,
    memoryReduction: 1,
    performanceImpact: 1
  },
  {
    id: 'int8',
    name: 'INT8',
    bitsPerWeight: 8,
    memoryReduction: 0.5,
    performanceImpact: 0.95
  },
  {
    id: 'int4',
    name: 'INT4',
    bitsPerWeight: 4,
    memoryReduction: 0.25,
    performanceImpact: 0.85
  },
  {
    id: 'int2',
    name: 'INT2',
    bitsPerWeight: 2,
    memoryReduction: 0.125,
    performanceImpact: 0.7
  }
];

export const DEPLOYMENT_FRAMEWORKS: DeploymentFramework[] = [
  {
    id: 'vllm',
    name: 'vLLM',
    throughputMultiplier: 2.5,
    memoryOverhead: 1.2,
    supportedQuantization: ['fp16', 'int8', 'int4'],
    supportsOffloading: true,
    offloadingTypes: ['cpu', 'ram']
  },
  {
    id: 'transformers',
    name: 'Hugging Face Transformers',
    throughputMultiplier: 1,
    memoryOverhead: 1,
    supportedQuantization: ['fp16', 'int8', 'int4'],
    supportsOffloading: true,
    offloadingTypes: ['cpu', 'ram', 'nvme']
  },
  {
    id: 'ollama',
    name: 'Ollama',
    throughputMultiplier: 1.5,
    memoryOverhead: 0.8,
    supportedQuantization: ['fp16', 'int8', 'int4', 'int2'],
    supportsOffloading: true,
    offloadingTypes: ['cpu', 'ram', 'nvme']
  },
  {
    id: 'tensorrt',
    name: 'TensorRT-LLM',
    throughputMultiplier: 3,
    memoryOverhead: 1.5,
    supportedQuantization: ['fp16', 'int8', 'int4'],
    supportsOffloading: false,
    offloadingTypes: []
  },
  {
    id: 'deepspeed',
    name: 'DeepSpeed',
    throughputMultiplier: 2,
    memoryOverhead: 1.3,
    supportedQuantization: ['fp16', 'int8'],
    supportsOffloading: true,
    offloadingTypes: ['cpu', 'ram']
  }
];

export const CLOUD_PROVIDERS: CloudProvider[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    website: 'https://aws.amazon.com',
    regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
    instances: [
      {
        id: 'p4d.24xlarge',
        name: 'p4d.24xlarge',
        gpus: 8,
        gpuType: 'A100',
        cpu: '96 vCPUs',
        ram: 1152,
        storage: 8000,
        network: '400 Gbps',
        costPerHour: 32.77
      },
      {
        id: 'p3.2xlarge',
        name: 'p3.2xlarge',
        gpus: 1,
        gpuType: 'V100',
        cpu: '8 vCPUs',
        ram: 61,
        storage: 100,
        network: '10 Gbps',
        costPerHour: 3.06
      }
    ]
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    website: 'https://cloud.google.com',
    regions: ['us-central1', 'us-west1', 'europe-west1'],
    instances: [
      {
        id: 'a2-highgpu-8g',
        name: 'a2-highgpu-8g',
        gpus: 8,
        gpuType: 'A100',
        cpu: '96 vCPUs',
        ram: 680,
        storage: 1000,
        network: '100 Gbps',
        costPerHour: 15.73
      }
    ]
  },
  {
    id: 'runpod',
    name: 'RunPod',
    website: 'https://runpod.io',
    regions: ['us-east', 'us-west', 'eu'],
    instances: [
      {
        id: 'rtx4090',
        name: '1x RTX 4090',
        gpus: 1,
        gpuType: 'RTX 4090',
        cpu: '8 vCPUs',
        ram: 32,
        storage: 100,
        network: '1 Gbps',
        costPerHour: 0.69
      },
      {
        id: 'h100',
        name: '1x H100',
        gpus: 1,
        gpuType: 'H100',
        cpu: '16 vCPUs',
        ram: 64,
        storage: 200,
        network: '10 Gbps',
        costPerHour: 3.99
      }
    ]
  }
];

export const STORAGE_OPTIONS: Storage[] = [
  {
    id: 'samsung-980-pro',
    type: 'nvme',
    capacity: 2000,
    readSpeed: 7000,
    writeSpeed: 5100,
    iops: 1000000,
    pricePerTB: 100,
    interface: 'PCIe 4.0'
  },
  {
    id: 'wd-black-sn850x',
    type: 'nvme',
    capacity: 4000,
    readSpeed: 7300,
    writeSpeed: 6600,
    iops: 1200000,
    pricePerTB: 120,
    interface: 'PCIe 4.0'
  },
  {
    id: 'samsung-870-evo',
    type: 'ssd',
    capacity: 4000,
    readSpeed: 560,
    writeSpeed: 530,
    iops: 98000,
    pricePerTB: 80,
    interface: 'SATA III'
  },
  {
    id: 'seagate-ironwolf',
    type: 'hdd',
    capacity: 18000,
    readSpeed: 260,
    writeSpeed: 260,
    iops: 200,
    pricePerTB: 15,
    interface: 'SATA III'
  }
];