import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { 
  LLMProvider, 
  LLMModel, 
  GPU, 
  CPU, 
  Motherboard, 
  PowerSupply, 
  Storage, 
  CloudProvider,
  CloudInstance,
  PreBuiltServer,
  QuantizationOption,
  DeploymentFramework
} from '@/types/calculator';

// LLM Providers
export const useLLMProviders = () => {
  return useQuery({
    queryKey: ['llm_providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('llm_providers')
        .select(`
          *,
          llm_models (
            *,
            model_quantization_support (
              quantization_options (*)
            )
          )
        `);
      
      if (error) throw error;
      
      return data.map(provider => ({
        id: provider.id,
        name: provider.name,
        type: provider.type,
        description: provider.description,
        website: provider.website,
        requiresApiKey: provider.requires_api_key,
        models: provider.llm_models.map(model => ({
          id: model.id,
          name: model.name,
          provider: provider.name,
          providerId: provider.id,
          parameters: model.parameters,
          contextWindow: model.context_window,
          memoryRequired: model.memory_required,
          quantizationSupport: model.model_quantization_support.map(
            (support: any) => support.quantization_options.id
          ),
          kvCacheSupport: model.kv_cache_support,
          architecture: model.architecture,
          modelType: model.model_type,
          capabilities: model.capabilities,
          costPerMToken: model.cost_per_mtoken,
          sizeGB: model.size_gb,
          isOpenSource: model.is_open_source
        }))
      })) as LLMProvider[];
    }
  });
};

// LLM Models
export const useLLMModels = () => {
  return useQuery({
    queryKey: ['llm_models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('llm_models')
        .select(`
          *,
          llm_providers (*),
          model_quantization_support (
            quantization_options (*)
          )
        `);
      
      if (error) throw error;
      
      return data.map(model => ({
        id: model.id,
        name: model.name,
        provider: model.llm_providers.name,
        providerId: model.llm_providers.id,
        parameters: model.parameters,
        contextWindow: model.context_window,
        memoryRequired: model.memory_required,
        quantizationSupport: model.model_quantization_support.map(
          (support: any) => support.quantization_options.id
        ),
        kvCacheSupport: model.kv_cache_support,
        architecture: model.architecture,
        modelType: model.model_type,
        capabilities: model.capabilities,
        costPerMToken: model.cost_per_mtoken,
        sizeGB: model.size_gb,
        isOpenSource: model.is_open_source
      })) as LLMModel[];
    }
  });
};

// GPUs
export const useGPUs = () => {
  return useQuery({
    queryKey: ['gpus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gpus')
        .select(`
          *,
          motherboard_gpu_compatibility (
            motherboards (*)
          )
        `);
      
      if (error) throw error;
      
      return data.map(gpu => ({
        id: gpu.id,
        name: gpu.name,
        memory: gpu.memory,
        computeCapability: gpu.compute_capability,
        bandwidth: gpu.bandwidth,
        powerConsumption: gpu.power_consumption,
        pcieLanes: gpu.pcie_lanes,
        cloudCostPerHour: gpu.cloud_cost_per_hour,
        retailPrice: gpu.retail_price,
        generation: gpu.generation,
        manufacturer: gpu.manufacturer,
        compatibleMotherboards: gpu.motherboard_gpu_compatibility.map(
          (comp: any) => comp.motherboards.id
        )
      })) as GPU[];
    }
  });
};

// CPUs
export const useCPUs = () => {
  return useQuery({
    queryKey: ['cpus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cpus')
        .select(`
          *,
          motherboard_cpu_compatibility (
            motherboards (*)
          )
        `);
      
      if (error) throw error;
      
      return data.map(cpu => ({
        id: cpu.id,
        name: cpu.name,
        cores: cpu.cores,
        threads: cpu.threads,
        baseClock: cpu.base_clock,
        boost: cpu.boost,
        tdp: cpu.tdp,
        pcieLanes: cpu.pcie_lanes,
        eccSupport: cpu.ecc_support,
        retailPrice: cpu.retail_price,
        socket: cpu.socket,
        manufacturer: cpu.manufacturer,
        compatibleMotherboards: cpu.motherboard_cpu_compatibility.map(
          (comp: any) => comp.motherboards.id
        )
      })) as CPU[];
    }
  });
};

// Motherboards
export const useMotherboards = () => {
  return useQuery({
    queryKey: ['motherboards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('motherboards')
        .select(`
          *,
          motherboard_cpu_compatibility (
            cpus (*)
          ),
          motherboard_gpu_compatibility (
            gpus (*)
          )
        `);
      
      if (error) throw error;
      
      return data.map(motherboard => ({
        id: motherboard.id,
        name: motherboard.name,
        socket: motherboard.socket,
        chipset: motherboard.chipset,
        maxRam: motherboard.max_ram,
        ramSlots: motherboard.ram_slots,
        pciSlots: motherboard.pci_slots,
        retailPrice: motherboard.retail_price,
        supportedCpus: motherboard.motherboard_cpu_compatibility.map(
          (comp: any) => comp.cpus.id
        ),
        supportedGpus: motherboard.motherboard_gpu_compatibility.map(
          (comp: any) => comp.gpus.id
        )
      })) as Motherboard[];
    }
  });
};

// Power Supplies
export const usePowerSupplies = () => {
  return useQuery({
    queryKey: ['power_supplies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('power_supplies')
        .select('*');
      
      if (error) throw error;
      return data.map(psu => ({
        id: psu.id,
        name: psu.name,
        wattage: psu.wattage,
        efficiency: psu.efficiency,
        modular: psu.modular,
        retailPrice: psu.retail_price
      })) as PowerSupply[];
    }
  });
};

// Storage Options
export const useStorageOptions = () => {
  return useQuery({
    queryKey: ['storage_options'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('storage_options')
        .select('*');
      
      if (error) throw error;
      return data.map(storage => ({
        id: storage.id,
        type: storage.type,
        capacity: storage.capacity,
        readSpeed: storage.read_speed,
        writeSpeed: storage.write_speed,
        iops: storage.iops,
        pricePerTB: storage.price_per_tb,
        interface: storage.interface
      })) as Storage[];
    }
  });
};

// Cloud Providers
export const useCloudProviders = () => {
  return useQuery({
    queryKey: ['cloud_providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cloud_providers')
        .select(`
          *,
          cloud_instances (*)
        `);
      
      if (error) throw error;
      
      return data.map(provider => ({
        id: provider.id,
        name: provider.name,
        website: provider.website,
        regions: provider.regions,
        instances: provider.cloud_instances.map(instance => ({
          id: instance.id,
          name: instance.name,
          gpus: instance.gpus,
          gpuType: instance.gpu_type,
          cpu: instance.cpu,
          ram: instance.ram,
          storage: instance.storage,
          network: instance.network,
          costPerHour: instance.cost_per_hour
        }))
      })) as CloudProvider[];
    }
  });
};

// Cloud Instances
export const useCloudInstances = () => {
  return useQuery({
    queryKey: ['cloud_instances'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cloud_instances')
        .select(`
          *,
          cloud_providers (*)
        `);
      
      if (error) throw error;
      return data.map(instance => ({
        id: instance.id,
        name: instance.name,
        gpus: instance.gpus,
        gpuType: instance.gpu_type,
        cpu: instance.cpu,
        ram: instance.ram,
        storage: instance.storage,
        network: instance.network,
        costPerHour: instance.cost_per_hour
      })) as CloudInstance[];
    }
  });
};

// Prebuilt Servers
export const usePrebuiltServers = () => {
  return useQuery({
    queryKey: ['prebuilt_servers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prebuilt_servers')
        .select('*');
      
      if (error) throw error;
      return data.map(server => ({
        id: server.id,
        name: server.name,
        provider: server.provider,
        gpu: server.gpu,
        gpuCount: server.gpu_count,
        cpu: server.cpu,
        ram: server.ram,
        storage: server.storage,
        price: server.price,
        specifications: server.specifications
      })) as PreBuiltServer[];
    }
  });
};

// Quantization Options
export const useQuantizationOptions = () => {
  return useQuery({
    queryKey: ['quantization_options'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quantization_options')
        .select('*');
      
      if (error) throw error;
      return data.map(option => ({
        id: option.id,
        name: option.name,
        bitsPerWeight: option.bits_per_weight,
        memoryReduction: option.memory_reduction,
        performanceImpact: option.performance_impact
      })) as QuantizationOption[];
    }
  });
};

// Deployment Frameworks
export const useDeploymentFrameworks = () => {
  return useQuery({
    queryKey: ['deployment_frameworks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deployment_frameworks')
        .select(`
          *,
          framework_quantization_support (
            quantization_options (*)
          )
        `);
      
      if (error) throw error;
      
      return data.map(framework => ({
        id: framework.id,
        name: framework.name,
        throughputMultiplier: framework.throughput_multiplier,
        memoryOverhead: framework.memory_overhead,
        supportsOffloading: framework.supports_offloading,
        offloadingTypes: framework.offloading_types,
        supportedQuantization: framework.framework_quantization_support.map(
          (support: any) => support.quantization_options.id
        )
      })) as DeploymentFramework[];
    }
  });
};