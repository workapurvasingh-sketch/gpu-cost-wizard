-- Add more comprehensive cloud provider data
INSERT INTO cloud_providers (id, name, website, regions) VALUES
('azure', 'Microsoft Azure', 'https://azure.microsoft.com', ARRAY['eastus', 'westus2', 'centralus', 'northeurope', 'westeurope', 'southeastasia']),
('vultr', 'Vultr', 'https://vultr.com', ARRAY['ewr', 'ord', 'dfw', 'sea', 'lax', 'ams', 'fra', 'lon']),
('digitalocean', 'DigitalOcean', 'https://digitalocean.com', ARRAY['nyc1', 'nyc3', 'sfo2', 'ams3', 'sgp1', 'lon1', 'fra1']),
('ovh', 'OVH Cloud', 'https://ovhcloud.com', ARRAY['gra', 'sbg', 'bhs', 'de', 'uk', 'waw']),
('linode', 'Akamai Linode', 'https://linode.com', ARRAY['us-east', 'us-west', 'eu-west', 'ap-south']),
('lambda_labs', 'Lambda Labs', 'https://lambdalabs.com', ARRAY['us-east-1', 'us-west-1', 'europe-central-1']),
('paperspace', 'Paperspace', 'https://paperspace.com', ARRAY['east', 'west', 'europe']),
('vast_ai', 'Vast.ai', 'https://vast.ai', ARRAY['global']),
('coreweave', 'CoreWeave', 'https://coreweave.com', ARRAY['us-east-1', 'us-west-2', 'europe-1']),
('latitude_sh', 'Latitude.sh', 'https://latitude.sh', ARRAY['us-east', 'us-west', 'europe'])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  website = EXCLUDED.website,
  regions = EXCLUDED.regions;

-- Add comprehensive cloud instance data
INSERT INTO cloud_instances (id, provider_id, name, cpu, ram, gpus, gpu_type, storage, network, cost_per_hour) VALUES

-- AWS instances
('p4d.24xlarge', 'aws', 'p4d.24xlarge', '96 vCPUs (Intel Xeon)', 1152, 8, 'NVIDIA A100 (40GB)', 8000, '400 Gbps', 32.77),
('p4de.24xlarge', 'aws', 'p4de.24xlarge', '96 vCPUs (Intel Xeon)', 1152, 8, 'NVIDIA A100 (80GB)', 8000, '400 Gbps', 40.96),
('p3.2xlarge', 'aws', 'p3.2xlarge', '8 vCPUs', 61, 1, 'NVIDIA V100 (16GB)', 0, '10 Gbps', 3.06),
('p3.8xlarge', 'aws', 'p3.8xlarge', '32 vCPUs', 244, 4, 'NVIDIA V100 (16GB)', 0, '10 Gbps', 12.24),
('g5.xlarge', 'aws', 'g5.xlarge', '4 vCPUs', 16, 1, 'NVIDIA A10G (24GB)', 250, '10 Gbps', 1.01),
('g5.2xlarge', 'aws', 'g5.2xlarge', '8 vCPUs', 32, 1, 'NVIDIA A10G (24GB)', 450, '10 Gbps', 1.21),
('g4dn.xlarge', 'aws', 'g4dn.xlarge', '4 vCPUs', 16, 1, 'NVIDIA T4 (16GB)', 125, '25 Gbps', 0.526),
('inf2.xlarge', 'aws', 'inf2.xlarge', '4 vCPUs', 16, 1, 'AWS Inferentia2', 0, '25 Gbps', 0.228),

-- Google Cloud instances
('a2-highgpu-1g', 'gcp', 'a2-highgpu-1g', '12 vCPUs', 85, 1, 'NVIDIA A100 (40GB)', 0, '24 Gbps', 3.673),
('a2-highgpu-2g', 'gcp', 'a2-highgpu-2g', '24 vCPUs', 170, 2, 'NVIDIA A100 (40GB)', 0, '32 Gbps', 7.346),
('a2-highgpu-4g', 'gcp', 'a2-highgpu-4g', '48 vCPUs', 340, 4, 'NVIDIA A100 (40GB)', 0, '50 Gbps', 14.692),
('a2-megagpu-16g', 'gcp', 'a2-megagpu-16g', '96 vCPUs', 1360, 16, 'NVIDIA A100 (40GB)', 0, '100 Gbps', 55.73),
('n1-standard-4-k80', 'gcp', 'n1-standard-4 + K80', '4 vCPUs', 15, 1, 'NVIDIA K80 (12GB)', 0, '2 Gbps', 0.7),
('t4-standard', 'gcp', 'Custom + T4', '4 vCPUs', 16, 1, 'NVIDIA T4 (16GB)', 0, '10 Gbps', 0.95),

-- Azure instances
('nc24rs_v3', 'azure', 'Standard_NC24rs_v3', '24 vCPUs', 448, 4, 'NVIDIA V100 (32GB)', 2880, '24 Gbps', 8.832),
('nc6s_v3', 'azure', 'Standard_NC6s_v3', '6 vCPUs', 112, 1, 'NVIDIA V100 (16GB)', 736, '24 Gbps', 3.168),
('nc40rs_v3', 'azure', 'Standard_NC40rs_v3', '40 vCPUs', 672, 4, 'NVIDIA V100 (32GB)', 2880, '32 Gbps', 16.848),
('nd96asr_v4', 'azure', 'Standard_ND96asr_v4', '96 vCPUs', 900, 8, 'NVIDIA A100 (40GB)', 6000, '200 Gbps', 27.20),

-- RunPod instances
('runpod_rtx4090', 'runpod', 'RTX 4090 Pod', '16 vCPUs', 64, 1, 'NVIDIA RTX 4090 (24GB)', 500, '1 Gbps', 0.69),
('runpod_a100', 'runpod', 'A100 (40GB) Pod', '14 vCPUs', 46, 1, 'NVIDIA A100 (40GB)', 200, '10 Gbps', 1.89),
('runpod_a100_80gb', 'runpod', 'A100 (80GB) Pod', '30 vCPUs', 200, 1, 'NVIDIA A100 (80GB)', 2200, '25 Gbps', 2.89),
('runpod_h100', 'runpod', 'H100 Pod', '26 vCPUs', 110, 1, 'NVIDIA H100 (80GB)', 1000, '200 Gbps', 4.89),

-- Lambda Labs instances
('lambda_rtx6000ada', 'lambda_labs', '1x RTX 6000 Ada', '30 vCPUs', 200, 1, 'NVIDIA RTX 6000 Ada (48GB)', 1400, '10 Gbps', 1.50),
('lambda_a100', 'lambda_labs', '1x A100 (40GB)', '30 vCPUs', 200, 1, 'NVIDIA A100 (40GB)', 1400, '100 Gbps', 1.10),
('lambda_a100_8x', 'lambda_labs', '8x A100 (40GB)', '240 vCPUs', 1500, 8, 'NVIDIA A100 (40GB)', 11000, '1600 Gbps', 8.80),
('lambda_h100_8x', 'lambda_labs', '8x H100 (80GB)', '240 vCPUs', 1500, 8, 'NVIDIA H100 (80GB)', 14000, '3200 Gbps', 24.00),

-- Vultr instances
('vultr_a100', 'vultr', 'A100 (40GB)', '20 vCPUs', 120, 1, 'NVIDIA A100 (40GB)', 640, '10 Gbps', 2.05),
('vultr_a40', 'vultr', 'A40 (48GB)', '16 vCPUs', 120, 1, 'NVIDIA A40 (48GB)', 640, '10 Gbps', 1.28),

-- CoreWeave instances  
('coreweave_rtx_a6000', 'coreweave', 'RTX A6000', '8 vCPUs', 32, 1, 'NVIDIA RTX A6000 (48GB)', 200, '10 Gbps', 1.28),
('coreweave_a100_40gb', 'coreweave', 'A100 (40GB)', '16 vCPUs', 64, 1, 'NVIDIA A100 (40GB)', 500, '25 Gbps', 2.21),
('coreweave_a100_80gb', 'coreweave', 'A100 (80GB)', '16 vCPUs', 64, 1, 'NVIDIA A100 (80GB)', 500, '25 Gbps', 2.95),
('coreweave_h100', 'coreweave', 'H100 (80GB)', '16 vCPUs', 64, 1, 'NVIDIA H100 (80GB)', 500, '400 Gbps', 4.76)

ON CONFLICT (id) DO UPDATE SET
  provider_id = EXCLUDED.provider_id,
  name = EXCLUDED.name,
  cpu = EXCLUDED.cpu,
  ram = EXCLUDED.ram,
  gpus = EXCLUDED.gpus,
  gpu_type = EXCLUDED.gpu_type,
  storage = EXCLUDED.storage,
  network = EXCLUDED.network,
  cost_per_hour = EXCLUDED.cost_per_hour;

-- Add more LLM models for different providers
INSERT INTO llm_models (id, provider_id, name, parameters, context_window, memory_required, architecture, model_type, capabilities, cost_per_mtoken, size_gb, is_open_source, kv_cache_support) VALUES

-- OpenAI Models
('gpt-4o', 'openai', 'GPT-4o', '~1.8T', 128000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 5.0, 0, false, true),
('gpt-4o-mini', 'openai', 'GPT-4o Mini', '~8B', 128000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 0.15, 0, false, true),
('gpt-4-turbo', 'openai', 'GPT-4 Turbo', '~1.8T', 128000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 10.0, 0, false, true),
('gpt-3.5-turbo', 'openai', 'GPT-3.5 Turbo', '175B', 16385, 0, 'Transformer', 'text-text', ARRAY['text', 'tool_call'], 0.5, 0, false, true),

-- Anthropic Models
('claude-3.5-sonnet', 'anthropic', 'Claude 3.5 Sonnet', '~200B', 200000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 3.0, 0, false, true),
('claude-3-opus', 'anthropic', 'Claude 3 Opus', '~400B', 200000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 15.0, 0, false, true),
('claude-3-haiku', 'anthropic', 'Claude 3 Haiku', '~20B', 200000, 0, 'Transformer', 'multimodal', ARRAY['text', 'image', 'tool_call'], 0.25, 0, false, true),

-- Google Models
('gemini-1.5-pro', 'google', 'Gemini 1.5 Pro', '~540B', 2000000, 0, 'Gemini', 'multimodal', ARRAY['text', 'image', 'video', 'audio', 'tool_call'], 3.5, 0, false, true),
('gemini-1.5-flash', 'google', 'Gemini 1.5 Flash', '~80B', 1000000, 0, 'Gemini', 'multimodal', ARRAY['text', 'image', 'video', 'audio', 'tool_call'], 0.075, 0, false, true),

-- Open Source Models (Meta)
('llama-3.1-405b', 'meta', 'Llama 3.1 405B', '405B', 131072, 810, 'Llama', 'text-text', ARRAY['text', 'tool_call'], 0, 810, true, true),
('llama-3.1-70b', 'meta', 'Llama 3.1 70B', '70B', 131072, 140, 'Llama', 'text-text', ARRAY['text', 'tool_call'], 0, 140, true, true),
('llama-3.1-8b', 'meta', 'Llama 3.1 8B', '8B', 131072, 16, 'Llama', 'text-text', ARRAY['text', 'tool_call'], 0, 16, true, true),

-- Mistral Models
('mistral-large', 'mistral', 'Mistral Large', '123B', 128000, 246, 'Mistral', 'text-text', ARRAY['text', 'tool_call'], 0, 246, true, true),
('mistral-7b', 'mistral', 'Mistral 7B', '7B', 32768, 14, 'Mistral', 'text-text', ARRAY['text'], 0, 14, true, true),

-- DeepSeek Models
('deepseek-v2.5', 'deepseek', 'DeepSeek V2.5', '236B', 131072, 472, 'DeepSeek-MoE', 'text-text', ARRAY['text', 'code', 'tool_call'], 0, 472, true, true),

-- Qwen Models  
('qwen2.5-72b', 'alibaba', 'Qwen2.5 72B', '72B', 131072, 144, 'Qwen', 'text-text', ARRAY['text', 'tool_call'], 0, 144, true, true),
('qwen2.5-coder-32b', 'alibaba', 'Qwen2.5 Coder 32B', '32B', 131072, 64, 'Qwen', 'text-text', ARRAY['text', 'code'], 0, 64, true, true)

ON CONFLICT (id) DO UPDATE SET
  provider_id = EXCLUDED.provider_id,
  name = EXCLUDED.name,
  parameters = EXCLUDED.parameters,
  context_window = EXCLUDED.context_window,
  memory_required = EXCLUDED.memory_required,
  architecture = EXCLUDED.architecture,
  model_type = EXCLUDED.model_type,
  capabilities = EXCLUDED.capabilities,
  cost_per_mtoken = EXCLUDED.cost_per_mtoken,
  size_gb = EXCLUDED.size_gb,
  is_open_source = EXCLUDED.is_open_source,
  kv_cache_support = EXCLUDED.kv_cache_support;