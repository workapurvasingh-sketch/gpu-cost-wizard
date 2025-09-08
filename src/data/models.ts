import { LLMModel, GPU, CPU, RAM, Storage, CloudProvider, QuantizationOption, DeploymentFramework } from '@/types/calculator';

export const POPULAR_MODELS: LLMModel[] = [
  {
    id: 'llama-2-7b',
    name: 'Llama 2 7B',
    provider: 'Meta',
    parameters: '7B',
    contextWindow: 4096,
    memoryRequired: 14,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'llama-2-13b',
    name: 'Llama 2 13B',
    provider: 'Meta',
    parameters: '13B',
    contextWindow: 4096,
    memoryRequired: 26,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    provider: 'Meta',
    parameters: '70B',
    contextWindow: 4096,
    memoryRequired: 140,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    provider: 'Mistral AI',
    parameters: '7B',
    contextWindow: 8192,
    memoryRequired: 14,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    provider: 'Mistral AI',
    parameters: '56B',
    contextWindow: 32768,
    memoryRequired: 90,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'MoE'
  },
  {
    id: 'code-llama-34b',
    name: 'Code Llama 34B',
    provider: 'Meta',
    parameters: '34B',
    contextWindow: 16384,
    memoryRequired: 68,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'falcon-40b',
    name: 'Falcon 40B',
    provider: 'TII',
    parameters: '40B',
    contextWindow: 2048,
    memoryRequired: 80,
    quantizationSupport: ['fp16', 'int8'],
    kvCacheSupport: true,
    architecture: 'Transformer'
  },
  {
    id: 'gpt-j-6b',
    name: 'GPT-J 6B',
    provider: 'EleutherAI',
    parameters: '6B',
    contextWindow: 2048,
    memoryRequired: 12,
    quantizationSupport: ['fp16', 'int8', 'int4'],
    kvCacheSupport: true,
    architecture: 'GPT'
  }
];

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
    retailPrice: 25000
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
    retailPrice: 11000
  },
  {
    id: 'a6000',
    name: 'NVIDIA A6000',
    memory: 48,
    computeCapability: '8.6',
    bandwidth: 768,
    powerConsumption: 300,
    pcieLanes: 16,
    retailPrice: 4500
  },
  {
    id: 'rtx4090',
    name: 'RTX 4090',
    memory: 24,
    computeCapability: '8.9',
    bandwidth: 1008,
    powerConsumption: 450,
    pcieLanes: 16,
    retailPrice: 1600
  },
  {
    id: 'rtx3090',
    name: 'RTX 3090',
    memory: 24,
    computeCapability: '8.6',
    bandwidth: 936,
    powerConsumption: 350,
    pcieLanes: 16,
    retailPrice: 800
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
    retailPrice: 3000
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
    retailPrice: 1200
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
    retailPrice: 7890
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
    retailPrice: 8099
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
    retailPrice: 649
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
    retailPrice: 589
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
    supportedQuantization: ['fp16', 'int8', 'int4']
  },
  {
    id: 'transformers',
    name: 'Hugging Face Transformers',
    throughputMultiplier: 1,
    memoryOverhead: 1,
    supportedQuantization: ['fp16', 'int8', 'int4']
  },
  {
    id: 'ollama',
    name: 'Ollama',
    throughputMultiplier: 1.5,
    memoryOverhead: 0.8,
    supportedQuantization: ['fp16', 'int8', 'int4', 'int2']
  },
  {
    id: 'tensorrt',
    name: 'TensorRT-LLM',
    throughputMultiplier: 3,
    memoryOverhead: 1.5,
    supportedQuantization: ['fp16', 'int8', 'int4']
  },
  {
    id: 'deepspeed',
    name: 'DeepSpeed',
    throughputMultiplier: 2,
    memoryOverhead: 1.3,
    supportedQuantization: ['fp16', 'int8']
  }
];

export const CLOUD_PROVIDERS: CloudProvider[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
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
      },
      {
        id: 'g5.xlarge',
        name: 'g5.xlarge',
        gpus: 1,
        gpuType: 'A10G',
        cpu: '4 vCPUs',
        ram: 16,
        storage: 250,
        network: '10 Gbps',
        costPerHour: 1.006
      }
    ]
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
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
      },
      {
        id: 'n1-standard-4-v100',
        name: 'n1-standard-4 + V100',
        gpus: 1,
        gpuType: 'V100',
        cpu: '4 vCPUs',
        ram: 15,
        storage: 100,
        network: '2 Gbps',
        costPerHour: 2.48
      }
    ]
  },
  {
    id: 'runpod',
    name: 'RunPod',
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