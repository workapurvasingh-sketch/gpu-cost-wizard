-- Insert seed data for all provider tables

-- Insert quantization options
INSERT INTO public.quantization_options (id, name, bits_per_weight, memory_reduction, performance_impact) VALUES
('fp16', 'FP16', 16, 1, 1),
('int8', 'INT8', 8, 0.5, 0.95),
('int4', 'INT4', 4, 0.25, 0.85),
('int2', 'INT2', 2, 0.125, 0.7);

-- Insert deployment frameworks
INSERT INTO public.deployment_frameworks (id, name, throughput_multiplier, memory_overhead, supports_offloading, offloading_types) VALUES
('vllm', 'vLLM', 2.5, 1.2, true, '{"cpu","ram"}'),
('transformers', 'Hugging Face Transformers', 1, 1, true, '{"cpu","ram","nvme"}'),
('ollama', 'Ollama', 1.5, 0.8, true, '{"cpu","ram","nvme"}'),
('tensorrt', 'TensorRT-LLM', 3, 1.5, false, '{}'),
('deepspeed', 'DeepSpeed', 2, 1.3, true, '{"cpu","ram"}');

-- Insert framework quantization support
INSERT INTO public.framework_quantization_support (framework_id, quantization_id) VALUES
('vllm', 'fp16'), ('vllm', 'int8'), ('vllm', 'int4'),
('transformers', 'fp16'), ('transformers', 'int8'), ('transformers', 'int4'),
('ollama', 'fp16'), ('ollama', 'int8'), ('ollama', 'int4'), ('ollama', 'int2'),
('tensorrt', 'fp16'), ('tensorrt', 'int8'), ('tensorrt', 'int4'),
('deepspeed', 'fp16'), ('deepspeed', 'int8');

-- Insert LLM providers
INSERT INTO public.llm_providers (id, name, type, description, website, requires_api_key) VALUES
('openai', 'OpenAI', 'api', 'Leading AI provider with GPT models', 'https://openai.com', true),
('anthropic', 'Anthropic', 'api', 'Claude models with advanced reasoning', 'https://anthropic.com', true),
('google', 'Google', 'api', 'Gemini family models', 'https://ai.google.dev', true),
('groq', 'Groq', 'api', 'Ultra-fast inference platform', 'https://groq.com', true),
('openrouter', 'OpenRouter', 'api', 'Access to multiple LLM providers', 'https://openrouter.ai', true),
('mistral', 'Mistral AI', 'api', 'Efficient open source models', 'https://mistral.ai', false),
('cohere', 'Cohere', 'api', 'Enterprise-focused language models', 'https://cohere.ai', true),
('together', 'Together AI', 'api', 'Collaborative AI platform', 'https://together.ai', true),
('fireworks', 'Fireworks AI', 'api', 'Fast inference for open models', 'https://fireworks.ai', true),
('deepseek', 'DeepSeek', 'opensource', 'Advanced reasoning models', 'https://deepseek.com', false),
('perplexity', 'Perplexity', 'api', 'Search-augmented language models', 'https://perplexity.ai', true),
('xai', 'xAI', 'api', 'Grok models by Elon Musk', 'https://x.ai', true),
('azure_openai', 'Azure OpenAI', 'api', 'OpenAI models on Azure', 'https://azure.microsoft.com/en-us/products/ai-services/openai-service', true),
('huggingface', 'Hugging Face', 'opensource', 'Open source model hub', 'https://huggingface.co', false),
('bedrock', 'AWS Bedrock', 'api', 'Managed AI service on AWS', 'https://aws.amazon.com/bedrock', true),
('cerebras', 'Cerebras', 'api', 'AI supercomputing platform', 'https://cerebras.net', true),
('ollama', 'Ollama', 'opensource', 'Local LLM management', 'https://ollama.ai', false),
('vercel_ai_gateway', 'Vercel AI Gateway', 'api', 'AI gateway by Vercel', 'https://vercel.com/ai', true),
('replicate', 'Replicate', 'api', 'Run ML models in the cloud', 'https://replicate.com', true),
('hyperbolic', 'Hyperbolic', 'api', 'Fast inference platform', 'https://hyperbolic.xyz', true),
('vertex_ai', 'Google Vertex AI', 'api', 'Google Cloud AI platform', 'https://cloud.google.com/vertex-ai', true),
('sambanova', 'SambaNova', 'api', 'AI platform for enterprises', 'https://sambanova.ai', true),
('meta', 'Meta', 'opensource', 'Open source Llama models', 'https://llama.meta.com', false),
('tii', 'Technology Innovation Institute', 'opensource', 'Falcon models', 'https://www.tii.ae', false),
('01ai', '01.AI', 'opensource', 'Yi model series', 'https://01.ai', false),
('alibaba', 'Alibaba', 'opensource', 'Qwen model series', 'https://tongyi.aliyun.com', false),
('stabilityai', 'Stability AI', 'opensource', 'Stable models', 'https://stability.ai', false),
('bigcode', 'BigCode', 'opensource', 'Code generation models', 'https://www.bigcode-project.org', false),
('mosaicml', 'MosaicML', 'opensource', 'MPT model series', 'https://www.mosaicml.com', false);

-- Insert LLM models
INSERT INTO public.llm_models (id, name, provider_id, parameters, context_window, memory_required, architecture, model_type, capabilities, cost_per_mtoken, size_gb, is_open_source) VALUES
('gpt-4o', 'GPT-4o', 'openai', '175B', 128000, 0, 'Transformer', 'multimodal', '{"thinking","tool_call","image","streaming","function_calling","code_generation"}', 2.5, 0, false),
('gpt-4-turbo', 'GPT-4 Turbo', 'openai', '175B', 128000, 0, 'Transformer', 'text-text', '{"thinking","tool_call","streaming","function_calling","code_generation"}', 10, 0, false),
('claude-3-5-sonnet', 'Claude 3.5 Sonnet', 'anthropic', '175B', 200000, 0, 'Transformer', 'multimodal', '{"thinking","tool_call","image","streaming","function_calling","code_generation"}', 3, 0, false),
('llama-3.1-8b', 'Llama 3.1 8B', 'meta', '8B', 128000, 16, 'Transformer', 'text-text', '{"streaming","code_generation"}', 0, 16, true),
('llama-3.1-70b', 'Llama 3.1 70B', 'meta', '70B', 128000, 140, 'Transformer', 'text-text', '{"streaming","code_generation"}', 0, 140, true),
('mistral-7b-v0.3', 'Mistral 7B v0.3', 'mistral', '7B', 32768, 14, 'Transformer', 'text-text', '{"streaming","code_generation"}', 0, 14, true),
('deepseek-r1-3b', 'DeepSeek-R1 3B', 'deepseek', '3B', 32768, 7.52, 'MLA', 'text-text', '{"thinking","streaming","code_generation"}', 0, 7.52, true),
('gemini-pro', 'Gemini Pro', 'google', '540B', 32768, 0, 'Transformer', 'multimodal', '{"thinking","tool_call","image","streaming","function_calling","code_generation"}', 0.5, 0, false),
('gemini-flash', 'Gemini Flash', 'google', '8B', 1048576, 0, 'Transformer', 'multimodal', '{"streaming","image","code_generation"}', 0.075, 0, false);

-- Insert model quantization support
INSERT INTO public.model_quantization_support (model_id, quantization_id) VALUES
('llama-3.1-8b', 'fp16'), ('llama-3.1-8b', 'int8'), ('llama-3.1-8b', 'int4'),
('llama-3.1-70b', 'fp16'), ('llama-3.1-70b', 'int8'), ('llama-3.1-70b', 'int4'),
('mistral-7b-v0.3', 'fp16'), ('mistral-7b-v0.3', 'int8'), ('mistral-7b-v0.3', 'int4'),
('deepseek-r1-3b', 'fp16'), ('deepseek-r1-3b', 'int8'), ('deepseek-r1-3b', 'int4');

-- Insert GPUs
INSERT INTO public.gpus (id, name, memory, compute_capability, bandwidth, power_consumption, pcie_lanes, cloud_cost_per_hour, retail_price, generation, manufacturer) VALUES
('h100', 'NVIDIA H100', 80, '9.0', 3350, 700, 16, 2.5, 25000, 'Hopper', 'nvidia'),
('a100', 'NVIDIA A100', 40, '8.0', 1555, 400, 16, 1.2, 11000, 'Ampere', 'nvidia'),
('a6000', 'NVIDIA A6000', 48, '8.6', 768, 300, 16, null, 4500, 'Ampere', 'nvidia'),
('rtx4090', 'RTX 4090', 24, '8.9', 1008, 450, 16, null, 1600, 'Ada Lovelace', 'nvidia'),
('rtx3090', 'RTX 3090', 24, '8.6', 936, 350, 16, null, 800, 'Ampere', 'nvidia'),
('v100', 'NVIDIA V100', 16, '7.0', 900, 300, 16, 0.6, 3000, 'Volta', 'nvidia'),
('t4', 'NVIDIA T4', 16, '7.5', 320, 70, 16, 0.35, 1200, 'Turing', 'nvidia');

-- Insert CPUs
INSERT INTO public.cpus (id, name, cores, threads, base_clock, boost, tdp, pcie_lanes, ecc_support, retail_price, socket, manufacturer) VALUES
('epyc-7763', 'AMD EPYC 7763', 64, 128, 2.45, 3.5, 280, 128, true, 7890, 'SP3', 'amd'),
('xeon-8380', 'Intel Xeon 8380', 40, 80, 2.3, 3.4, 270, 64, true, 8099, 'LGA4189', 'intel'),
('ryzen-9950x', 'AMD Ryzen 9 9950X', 16, 32, 4.3, 5.7, 170, 28, false, 649, 'AM5', 'amd'),
('i9-14900k', 'Intel i9-14900K', 24, 32, 3.2, 6.0, 253, 24, false, 589, 'LGA1700', 'intel');

-- Insert motherboards
INSERT INTO public.motherboards (id, name, socket, chipset, max_ram, ram_slots, pci_slots, retail_price) VALUES
('motherboard-1', 'ASUS Pro WS TRX50-SAGE WIFI', 'SP3', 'TRX50', 512, 8, 7, 1200),
('motherboard-2', 'Supermicro H12SSL-i', 'SP3', 'H12', 1024, 8, 8, 800),
('motherboard-3', 'ASUS ROG Crosshair X670E Hero', 'AM5', 'X670E', 128, 4, 4, 650),
('motherboard-4', 'MSI Z790 Godlike', 'LGA1700', 'Z790', 128, 4, 4, 900);

-- Insert motherboard CPU compatibility
INSERT INTO public.motherboard_cpu_compatibility (motherboard_id, cpu_id) VALUES
('motherboard-1', 'epyc-7763'), ('motherboard-1', 'xeon-8380'),
('motherboard-2', 'epyc-7763'),
('motherboard-3', 'ryzen-9950x'),
('motherboard-4', 'i9-14900k');

-- Insert motherboard GPU compatibility
INSERT INTO public.motherboard_gpu_compatibility (motherboard_id, gpu_id) VALUES
('motherboard-1', 'h100'), ('motherboard-1', 'a100'), ('motherboard-1', 'v100'),
('motherboard-2', 'h100'), ('motherboard-2', 'a100'), ('motherboard-2', 'a6000'), ('motherboard-2', 'v100'),
('motherboard-3', 'rtx4090'), ('motherboard-3', 'rtx3090'), ('motherboard-3', 't4'),
('motherboard-4', 'rtx4090'), ('motherboard-4', 'rtx3090'), ('motherboard-4', 't4');

-- Insert power supplies
INSERT INTO public.power_supplies (id, name, wattage, efficiency, modular, retail_price) VALUES
('corsair-ax1600i', 'Corsair AX1600i', 1600, '80+ Titanium', true, 600),
('evga-supernova-1300', 'EVGA SuperNOVA 1300 G2', 1300, '80+ Gold', true, 400),
('seasonic-prime-1000', 'Seasonic PRIME TX-1000', 1000, '80+ Titanium', true, 350);

-- Insert storage options
INSERT INTO public.storage_options (id, type, capacity, read_speed, write_speed, iops, price_per_tb, interface) VALUES
('samsung-980-pro', 'nvme', 2000, 7000, 5100, 1000000, 100, 'PCIe 4.0'),
('wd-black-sn850x', 'nvme', 4000, 7300, 6600, 1200000, 120, 'PCIe 4.0'),
('samsung-870-evo', 'ssd', 4000, 560, 530, 98000, 80, 'SATA III'),
('seagate-ironwolf', 'hdd', 18000, 260, 260, 200, 15, 'SATA III');

-- Insert cloud providers
INSERT INTO public.cloud_providers (id, name, website, regions) VALUES
('aws', 'Amazon Web Services', 'https://aws.amazon.com', '{"us-east-1","us-west-2","eu-west-1"}'),
('gcp', 'Google Cloud Platform', 'https://cloud.google.com', '{"us-central1","us-west1","europe-west1"}'),
('runpod', 'RunPod', 'https://runpod.io', '{"us-east","us-west","eu"}');

-- Insert cloud instances
INSERT INTO public.cloud_instances (id, provider_id, name, gpus, gpu_type, cpu, ram, storage, network, cost_per_hour) VALUES
('p4d.24xlarge', 'aws', 'p4d.24xlarge', 8, 'A100', '96 vCPUs', 1152, 8000, '400 Gbps', 32.77),
('p3.2xlarge', 'aws', 'p3.2xlarge', 1, 'V100', '8 vCPUs', 61, 100, '10 Gbps', 3.06),
('a2-highgpu-8g', 'gcp', 'a2-highgpu-8g', 8, 'A100', '96 vCPUs', 680, 1000, '100 Gbps', 15.73),
('rtx4090', 'runpod', '1x RTX 4090', 1, 'RTX 4090', '8 vCPUs', 32, 100, '1 Gbps', 0.69),
('h100', 'runpod', '1x H100', 1, 'H100', '16 vCPUs', 64, 200, '10 Gbps', 3.99);

-- Insert prebuilt servers
INSERT INTO public.prebuilt_servers (id, name, provider, gpu, gpu_count, cpu, ram, storage, price, specifications) VALUES
('lambdalabs-vector', 'Lambda Vector', 'Lambda Labs', '8x H100', 8, 'Intel Xeon Gold 6326', 512, 7680, 220000, '8x NVIDIA H100 80GB, Dual Intel Xeon Gold 6326, 512GB DDR4, 7.68TB NVMe'),
('supermicro-sys-420gp', 'SuperMicro SYS-420GP-TNAR', 'SuperMicro', '4x A100', 4, 'AMD EPYC 7763', 256, 3840, 85000, '4x NVIDIA A100 40GB, AMD EPYC 7763, 256GB DDR4, 3.84TB NVMe');