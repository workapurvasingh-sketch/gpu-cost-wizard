-- Insert dummy data for blog functionality

-- Insert blog categories
INSERT INTO public.blog_categories (id, name, slug, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'GPU Computing', 'gpu-computing', 'Articles about GPU computing, hardware, and optimization'),
  ('550e8400-e29b-41d4-a716-446655440002', 'AI/ML', 'ai-ml', 'Machine learning and artificial intelligence insights'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Cost Optimization', 'cost-optimization', 'Strategies for optimizing cloud and hardware costs'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Tutorials', 'tutorials', 'Step-by-step guides and tutorials');

-- Insert blog tags
INSERT INTO public.blog_tags (id, name, slug) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'NVIDIA', 'nvidia'),
  ('660e8400-e29b-41d4-a716-446655440002', 'CUDA', 'cuda'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Machine Learning', 'machine-learning'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Cost Analysis', 'cost-analysis'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Performance', 'performance'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Cloud Computing', 'cloud-computing'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Optimization', 'optimization'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Deep Learning', 'deep-learning');

-- Insert blog posts
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image, category_id, status, published_at) VALUES
  ('770e8400-e29b-41d4-a716-446655440001',
   'Understanding GPU Memory Optimization for Large Language Models',
   'understanding-gpu-memory-optimization-llms',
   'Learn how to optimize GPU memory usage when training and deploying large language models.',
   '<h2>Introduction</h2>
   <p>GPU memory optimization is crucial when working with large language models (LLMs). As models grow in size and complexity, efficient memory management becomes essential for successful training and inference.</p>

   <h2>Key Memory Optimization Techniques</h2>
   <h3>1. Gradient Checkpointing</h3>
   <p>Gradient checkpointing trades computation for memory by strategically recomputing intermediate activations during the backward pass instead of storing them all.</p>

   <h3>2. Mixed Precision Training</h3>
   <p>Using FP16 or BF16 precision can reduce memory usage by up to 50% while maintaining model accuracy and often improving training speed.</p>

   <h3>3. Model Parallelism</h3>
   <p>Distributing model parameters across multiple GPUs allows training of larger models that wouldn''t fit in a single GPU''s memory.</p>

   <h2>Practical Implementation</h2>
   <p>When implementing these techniques, consider your specific use case, hardware constraints, and performance requirements. A combination of approaches often yields the best results.</p>',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
   '550e8400-e29b-41d4-a716-446655440001',
   'published',
   NOW() - INTERVAL '2 days'),

  ('770e8400-e29b-41d4-a716-446655440002',
   'Cost-Effective Strategies for AI Model Training in the Cloud',
   'cost-effective-ai-training-cloud',
   'Discover practical strategies to reduce cloud costs while maintaining high performance for AI model training.',
   '<h2>The Rising Cost of AI Training</h2>
   <p>As AI models become more sophisticated, the computational resources required for training continue to increase. Cloud providers offer scalable solutions, but costs can quickly become prohibitive without proper optimization.</p>

   <h2>Spot Instances and Preemptible VMs</h2>
   <p>Spot instances can provide significant cost savings (up to 90% in some cases) compared to on-demand pricing. The key is designing your training pipeline to handle interruptions gracefully.</p>

   <h2>Right-Sizing Your Infrastructure</h2>
   <p>Choosing the right instance type for your workload is crucial. Consider factors like GPU memory, interconnect bandwidth, and CPU-to-GPU ratio when selecting instances.</p>

   <h2>Automated Resource Management</h2>
   <p>Implement automated scaling and resource management to ensure you''re only paying for the resources you actually need.</p>',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
   '550e8400-e29b-41d4-a716-446655440003',
   'published',
   NOW() - INTERVAL '5 days'),

  ('770e8400-e29b-41d4-a716-446655440003',
   'Building Efficient ML Pipelines with Modern GPUs',
   'building-efficient-ml-pipelines-modern-gpus',
   'A comprehensive guide to building scalable and efficient machine learning pipelines using modern GPU architectures.',
   '<h2>Modern GPU Architectures</h2>
   <p>Understanding the latest GPU architectures is essential for building efficient ML pipelines. From NVIDIA''s Ampere and Hopper architectures to AMD''s RDNA series, each offers unique advantages for different workloads.</p>

   <h2>Pipeline Optimization Techniques</h2>
   <h3>Data Loading and Preprocessing</h3>
   <p>Efficient data pipelines are crucial for GPU utilization. Techniques like prefetching, parallel processing, and optimized data formats can significantly improve training throughput.</p>

   <h3>Model Architecture Considerations</h3>
   <p>Designing models that are GPU-friendly from the ground up can yield substantial performance improvements. Consider tensor core utilization, memory access patterns, and computational efficiency.</p>

   <h2>Monitoring and Profiling</h2>
   <p>Regular profiling and monitoring of your ML pipelines helps identify bottlenecks and optimization opportunities. Tools like NVIDIA Nsight and PyTorch Profiler are invaluable for this purpose.</p>',
   'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
   '550e8400-e29b-41d4-a716-446655440002',
   'published',
   NOW() - INTERVAL '1 week'),

  ('770e8400-e29b-41d4-a716-446655440004',
   'CUDA Programming Best Practices for High Performance Computing',
   'cuda-programming-best-practices-hpc',
   'Master the art of CUDA programming with these essential best practices for achieving maximum performance in high-performance computing applications.',
   '<h2>CUDA Fundamentals</h2>
   <p>CUDA (Compute Unified Device Architecture) is NVIDIA''s parallel computing platform that enables dramatic increases in computing performance by harnessing the power of GPUs.</p>

   <h2>Memory Management</h2>
   <h3>Global Memory Optimization</h3>
   <p>Global memory access patterns can make or break your CUDA kernel performance. Coalesced memory access and proper data layout are essential for achieving peak memory bandwidth.</p>

   <h3>Shared Memory Utilization</h3>
   <p>Shared memory provides low-latency, high-bandwidth access within thread blocks. Effective use of shared memory can dramatically improve kernel performance.</p>

   <h2>Thread Organization</h2>
   <p>Proper thread block and grid organization is crucial for maximizing GPU utilization. Understanding occupancy, warp scheduling, and thread divergence is key to writing efficient CUDA code.</p>

   <h2>Profiling and Optimization</h2>
   <p>Use profiling tools to identify performance bottlenecks and guide optimization efforts. NVIDIA''s Nsight Compute and Nsight Systems provide comprehensive profiling capabilities.</p>',
   'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
   '550e8400-e29b-41d4-a716-446655440004',
   'published',
   NOW() - INTERVAL '10 days'),

  ('770e8400-e29b-41d4-a716-446655440005',
   'Comparing Cloud GPU Instances: AWS, GCP, and Azure',
   'comparing-cloud-gpu-instances-aws-gcp-azure',
   'A detailed comparison of GPU instances across major cloud providers to help you choose the best option for your workloads.',
   '<h2>Cloud GPU Landscape</h2>
   <p>Major cloud providers offer a wide range of GPU instances optimized for different workloads. Understanding the differences between AWS, Google Cloud Platform (GCP), and Microsoft Azure is crucial for making informed decisions.</p>

   <h2>AWS GPU Instances</h2>
   <h3>P3 Instances</h3>
   <p>AWS P3 instances are powered by NVIDIA V100 GPUs and offer excellent performance for deep learning workloads. They provide up to 8 GPUs per instance with high interconnect bandwidth.</p>

   <h3>P4 Instances</h3>
   <p>The latest P4 instances feature NVIDIA A100 GPUs with advanced features like Multi-Instance GPU (MIG) for better resource utilization.</p>

   <h2>Google Cloud GPU Instances</h2>
   <h3>A100 Instances</h3>
   <p>GCP offers A100 instances with competitive pricing and excellent integration with Google''s AI/ML ecosystem, including Vertex AI and AutoML.</p>

   <h3>V100 Instances</h3>
   <p>For cost-conscious users, GCP''s V100 instances provide a good balance of performance and price.</p>

   <h2>Azure GPU Instances</h2>
   <h3>NCv3 Series</h3>
   <p>Azure''s NCv3 series features NVIDIA V100 GPUs and provides strong performance for AI and HPC workloads.</p>

   <h3>NDv4 Series</h3>
   <p>The NDv4 series offers AMD EPYC CPUs with NVIDIA A100 GPUs, providing excellent price-performance ratios.</p>

   <h2>Making the Right Choice</h2>
   <p>When selecting a cloud GPU instance, consider factors like:</p>
   <ul>
     <li>Workload requirements (training vs inference)</li>
     <li>Budget constraints</li>
     <li>Existing cloud ecosystem integration</li>
     <li>Regional availability</li>
     <li>Support and SLAs</li>
   </ul>',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
   '550e8400-e29b-41d4-a716-446655440003',
   'published',
   NOW() - INTERVAL '2 weeks');

-- Insert blog post tags relationships
INSERT INTO public.blog_post_tags (post_id, tag_id) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'), -- GPU Memory Optimization -> NVIDIA
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002'), -- GPU Memory Optimization -> CUDA
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003'), -- GPU Memory Optimization -> Machine Learning
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440005'), -- GPU Memory Optimization -> Performance
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004'), -- Cost-Effective AI Training -> Cost Analysis
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006'), -- Cost-Effective AI Training -> Cloud Computing
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440007'), -- Cost-Effective AI Training -> Optimization
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003'), -- Efficient ML Pipelines -> Machine Learning
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440005'), -- Efficient ML Pipelines -> Performance
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440007'), -- Efficient ML Pipelines -> Optimization
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002'), -- CUDA Programming -> CUDA
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005'), -- CUDA Programming -> Performance
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440008'), -- CUDA Programming -> Deep Learning
  ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004'), -- Cloud GPU Comparison -> Cost Analysis
  ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440006'), -- Cloud GPU Comparison -> Cloud Computing
  ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001'); -- Cloud GPU Comparison -> NVIDIA

-- Insert sample comments
INSERT INTO public.blog_comments (id, post_id, author_name, author_email, content, is_approved) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Alex Chen', 'alex.chen@example.com', 'Great article! Gradient checkpointing has been a game-changer for our LLM training pipelines. Have you tried the latest techniques with FlashAttention?', true),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', 'sarah.j@example.com', 'Very helpful insights on memory optimization. The mixed precision section was particularly useful for our current project.', true),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', 'Mike Rodriguez', 'mike.r@example.com', 'Spot instances are indeed a great way to save costs, but the interruption handling can be tricky. Any specific strategies you recommend?', true),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', 'Dr. Emily Watson', 'emily.watson@research.edu', 'Excellent coverage of CUDA best practices. The memory management section aligns perfectly with what we teach in our HPC courses.', true);
