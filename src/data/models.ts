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

// Cloud Providers data
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
        gpuType: 'A100 40GB',
        cpu: '96 vCPU',
        ram: 1152,
        storage: 8000,
        network: '400 Gigabit',
        costPerHour: 32.77
      },
      {
        id: 'p5.48xlarge',
        name: 'p5.48xlarge',
        gpus: 8,
        gpuType: 'H100 80GB',
        cpu: '192 vCPU',
        ram: 2048,
        storage: 30720,
        network: '3200 Gigabit',
        costPerHour: 98.32
      }
    ]
  },
  {
    id: 'runpod',
    name: 'RunPod',
    website: 'https://runpod.io',
    regions: ['US-East', 'EU-West'],
    instances: [
      {
        id: 'rtx4090',
        name: 'RTX 4090',
        gpus: 1,
        gpuType: 'RTX 4090',
        cpu: '16 vCPU',
        ram: 64,
        storage: 500,
        network: '1 Gigabit',
        costPerHour: 0.69
      },
      {
        id: 'h100-sxm',
        name: 'H100 SXM',
        gpus: 1,
        gpuType: 'H100 80GB',
        cpu: '32 vCPU',
        ram: 128,
        storage: 1000,
        network: '10 Gigabit',
        costPerHour: 4.89
      }
    ]
  }
];

import { 
  GPU_OPTIONS, CPU_OPTIONS, MOTHERBOARD_OPTIONS, PSU_OPTIONS, 
  STORAGE_OPTIONS, SERVER_RACK_OPTIONS, CHASSIS_OPTIONS, 
  NETWORK_CARD_OPTIONS, COOLING_SYSTEM_OPTIONS, RAM_OPTIONS 
} from '@/data/hardwareData';

export { 
  GPU_OPTIONS, CPU_OPTIONS, MOTHERBOARD_OPTIONS, PSU_OPTIONS, 
  STORAGE_OPTIONS, SERVER_RACK_OPTIONS, CHASSIS_OPTIONS, 
  NETWORK_CARD_OPTIONS, COOLING_SYSTEM_OPTIONS, RAM_OPTIONS 
};