-- Create provider data tables with proper relationships

-- LLM Providers table
CREATE TABLE public.llm_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('api', 'opensource')),
  description TEXT,
  website TEXT,
  requires_api_key BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- LLM Models table
CREATE TABLE public.llm_models (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider_id TEXT NOT NULL REFERENCES public.llm_providers(id) ON DELETE CASCADE,
  parameters TEXT NOT NULL,
  context_window INTEGER NOT NULL,
  memory_required NUMERIC NOT NULL DEFAULT 0,
  kv_cache_support BOOLEAN NOT NULL DEFAULT true,
  architecture TEXT NOT NULL,
  model_type TEXT NOT NULL CHECK (model_type IN ('text-text', 'multimodal', 'text-image', 'image-text', 'text-video')),
  capabilities TEXT[] NOT NULL DEFAULT '{}',
  cost_per_mtoken NUMERIC NOT NULL DEFAULT 0,
  size_gb NUMERIC NOT NULL DEFAULT 0,
  is_open_source BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quantization options
CREATE TABLE public.quantization_options (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bits_per_weight INTEGER NOT NULL,
  memory_reduction NUMERIC NOT NULL,
  performance_impact NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Model quantization support (many-to-many)
CREATE TABLE public.model_quantization_support (
  model_id TEXT NOT NULL REFERENCES public.llm_models(id) ON DELETE CASCADE,
  quantization_id TEXT NOT NULL REFERENCES public.quantization_options(id) ON DELETE CASCADE,
  PRIMARY KEY (model_id, quantization_id)
);

-- Deployment frameworks
CREATE TABLE public.deployment_frameworks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  throughput_multiplier NUMERIC NOT NULL DEFAULT 1,
  memory_overhead NUMERIC NOT NULL DEFAULT 1,
  supports_offloading BOOLEAN NOT NULL DEFAULT false,
  offloading_types TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Framework quantization support (many-to-many)
CREATE TABLE public.framework_quantization_support (
  framework_id TEXT NOT NULL REFERENCES public.deployment_frameworks(id) ON DELETE CASCADE,
  quantization_id TEXT NOT NULL REFERENCES public.quantization_options(id) ON DELETE CASCADE,
  PRIMARY KEY (framework_id, quantization_id)
);

-- GPU options
CREATE TABLE public.gpus (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  memory INTEGER NOT NULL,
  compute_capability TEXT NOT NULL,
  bandwidth INTEGER NOT NULL,
  power_consumption INTEGER NOT NULL,
  pcie_lanes INTEGER NOT NULL,
  cloud_cost_per_hour NUMERIC,
  retail_price NUMERIC,
  generation TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CPU options
CREATE TABLE public.cpus (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cores INTEGER NOT NULL,
  threads INTEGER NOT NULL,
  base_clock NUMERIC NOT NULL,
  boost NUMERIC NOT NULL,
  tdp INTEGER NOT NULL,
  pcie_lanes INTEGER NOT NULL,
  ecc_support BOOLEAN NOT NULL DEFAULT false,
  retail_price NUMERIC,
  socket TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Motherboard options
CREATE TABLE public.motherboards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  socket TEXT NOT NULL,
  chipset TEXT NOT NULL,
  max_ram INTEGER NOT NULL,
  ram_slots INTEGER NOT NULL,
  pci_slots INTEGER NOT NULL,
  retail_price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Motherboard CPU compatibility (many-to-many)
CREATE TABLE public.motherboard_cpu_compatibility (
  motherboard_id TEXT NOT NULL REFERENCES public.motherboards(id) ON DELETE CASCADE,
  cpu_id TEXT NOT NULL REFERENCES public.cpus(id) ON DELETE CASCADE,
  PRIMARY KEY (motherboard_id, cpu_id)
);

-- Motherboard GPU compatibility (many-to-many)
CREATE TABLE public.motherboard_gpu_compatibility (
  motherboard_id TEXT NOT NULL REFERENCES public.motherboards(id) ON DELETE CASCADE,
  gpu_id TEXT NOT NULL REFERENCES public.gpus(id) ON DELETE CASCADE,
  PRIMARY KEY (motherboard_id, gpu_id)
);

-- Power supplies
CREATE TABLE public.power_supplies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  wattage INTEGER NOT NULL,
  efficiency TEXT NOT NULL,
  modular BOOLEAN NOT NULL DEFAULT false,
  retail_price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Storage options
CREATE TABLE public.storage_options (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('nvme', 'ssd', 'hdd')),
  capacity INTEGER NOT NULL,
  read_speed INTEGER NOT NULL,
  write_speed INTEGER NOT NULL,
  iops INTEGER NOT NULL,
  price_per_tb NUMERIC NOT NULL,
  interface TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cloud providers
CREATE TABLE public.cloud_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  regions TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cloud instances
CREATE TABLE public.cloud_instances (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL REFERENCES public.cloud_providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gpus INTEGER NOT NULL DEFAULT 0,
  gpu_type TEXT,
  cpu TEXT NOT NULL,
  ram INTEGER NOT NULL,
  storage INTEGER NOT NULL,
  network TEXT,
  cost_per_hour NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Prebuilt servers
CREATE TABLE public.prebuilt_servers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  gpu TEXT NOT NULL,
  gpu_count INTEGER NOT NULL,
  cpu TEXT NOT NULL,
  ram INTEGER NOT NULL,
  storage INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  specifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.llm_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.llm_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quantization_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_quantization_support ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployment_frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.framework_quantization_support ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gpus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motherboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motherboard_cpu_compatibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motherboard_gpu_compatibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.power_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prebuilt_servers ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables (since this is reference data)
CREATE POLICY "Allow public read access" ON public.llm_providers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.llm_models FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.quantization_options FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.model_quantization_support FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.deployment_frameworks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.framework_quantization_support FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.gpus FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.cpus FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.motherboards FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.motherboard_cpu_compatibility FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.motherboard_gpu_compatibility FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.power_supplies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.storage_options FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.cloud_providers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.cloud_instances FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.prebuilt_servers FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at columns
CREATE TRIGGER update_llm_providers_updated_at BEFORE UPDATE ON public.llm_providers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_llm_models_updated_at BEFORE UPDATE ON public.llm_models FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();