import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  useQuantizationOptions, 
  useDeploymentFrameworks,
  useLLMModels,
  useLLMProviders
} from '@/hooks/useProviderData';
import { DeploymentSelector } from './calculator/DeploymentSelector';
import { ProviderSelector } from './calculator/ProviderSelector';
import { ModelSelectorAdvanced } from './calculator/ModelSelectorAdvanced';
import { HardwareConfigurator } from './calculator/HardwareConfigurator';
import { PerformanceSettings } from './calculator/PerformanceSettings';
import { UsageSimulator } from './calculator/UsageSimulator';
import { CostAnalyzer } from './calculator/CostAnalyzer';
import { ResultsDashboard } from './calculator/ResultsDashboard';
import { SimulationDisplay } from './calculator/SimulationDisplay';
import { APIConfiguration } from './calculator/APIConfiguration';
import { CloudInstanceSelector } from './calculator/CloudInstanceSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ArrowRight, Zap, Server } from 'lucide-react';
import { 
  LLMModel, 
  LLMProvider,
  GPU, 
  CPU, 
  QuantizationOption, 
  DeploymentFramework, 
  PerformanceMetrics, 
  ValidationResult, 
  CostBreakdown,
  CalculatorState,
  CloudProvider,
  CloudInstance
} from '@/types/calculator';

export const LLMCalculator = () => {
  const { toast } = useToast();
  const { data: quantizationOptions = [], isLoading: quantLoading } = useQuantizationOptions();
  const { data: deploymentFrameworks = [], isLoading: frameworksLoading } = useDeploymentFrameworks();
  const { data: models = [], isLoading: modelsLoading } = useLLMModels();
  const { data: providers = [], isLoading: providersLoading } = useLLMProviders();
  
  // All useState hooks must be at the top, before any conditional returns
  const [state, setState] = useState<CalculatorState>({
    deploymentType: undefined,
    quantization: quantizationOptions[0] || { id: 'fp16', name: 'FP16', bitsPerWeight: 16, memoryReduction: 1, performanceImpact: 1 },
    framework: deploymentFrameworks[0] || { id: 'vllm', name: 'vLLM', throughputMultiplier: 2.5, memoryOverhead: 1.2, supportedQuantization: [], supportsOffloading: true, offloadingTypes: [] },
    batchSize: 1,
    kvCache: true,
    expectedUsers: 10,
    requestsPerHour: 100,
    tokensPerRequest: 150,
    concurrentUsers: 5,
    contextWindow: 4096,
    offloading: { cpu: 0, ram: 0, nvme: 0 },
    gpus: []
  });
  
  const [concurrentUsers, setConcurrentUsers] = useState(5);
  const [gpuCount, setGpuCount] = useState(1);
  const [ramAmount, setRamAmount] = useState(64);
  const [storageAmount, setStorageAmount] = useState(500);
  const [results, setResults] = useState<any>(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  // Dynamic flow state
  const [currentStep, setCurrentStep] = useState<'provider' | 'model' | 'deployment' | 'config'>('provider');
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider | undefined>();
  const [selectedCloudProvider, setSelectedCloudProvider] = useState<CloudProvider | undefined>();
  const [selectedCloudInstance, setSelectedCloudInstance] = useState<CloudInstance | undefined>();
  const [contextWindow, setContextWindow] = useState(4096);
  const [concurrentRequests, setConcurrentRequests] = useState(5);

  // Update state when data loads
  React.useEffect(() => {
    if (quantizationOptions.length > 0 && !state.quantization?.id) {
      setState(prev => ({ ...prev, quantization: quantizationOptions[0] }));
    }
  }, [quantizationOptions]);

  React.useEffect(() => {
    if (deploymentFrameworks.length > 0 && !state.framework?.id) {
      setState(prev => ({ ...prev, framework: deploymentFrameworks[0] }));
    }
  }, [deploymentFrameworks]);

  if (quantLoading || frameworksLoading || modelsLoading || providersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Calculator className="w-12 h-12 mx-auto mb-4 animate-spin" />
            <h1 className="text-3xl font-bold mb-2">LLM Deployment Calculator</h1>
            <p className="text-muted-foreground">Loading calculator data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
  const handleDeploymentTypeChange = (type: 'cloud' | 'physical') => {
    setState(prev => ({ ...prev, deploymentType: type }));
  };

  const handleProviderChange = (provider: string) => {
    setState(prev => ({ ...prev, cloudProvider: provider }));
  };

  const handleModelSelect = (model: LLMModel) => {
    setState(prev => ({ ...prev, selectedModel: model }));
  };

  const handleApiKeyChange = (key: string) => {
    setState(prev => ({ ...prev, huggingFaceApiKey: key }));
    toast({
      title: "API Key Saved",
      description: "Hugging Face API key has been saved successfully.",
    });
  };

  const handleGpuChange = (gpu: GPU) => {
    setState(prev => ({ ...prev, gpus: [gpu] }));
  };

  const handleCpuChange = (cpu: CPU) => {
    setState(prev => ({ ...prev, cpu }));
  };

  // Calculation engine
  const calculatePerformanceMetrics = (): PerformanceMetrics => {
    const { selectedModel, quantization, framework, batchSize } = state;
    
    if (!selectedModel) {
      return {
        tokensPerSecond: 0,
        latency: 0,
        throughput: 0,
        concurrentUsers: 0,
        memoryUsage: { gpu: 0, cpu: 0, ram: 0, nvme: 0 },
        perUserMetrics: { gpuMemory: 0, cpuMemory: 0, electricityCost: 0 }
      };
    }

    // API Provider Performance Calculation
    if (selectedProvider?.type === 'api') {
      // Use published API performance specs
      let baseTokensPerSecond = 50; // Default
      let baseLatency = 200; // Default ms
      
      // Provider-specific performance metrics
      switch (selectedProvider.id) {
        case 'openai':
          baseTokensPerSecond = selectedModel.name.includes('gpt-4') ? 40 : 80;
          baseLatency = selectedModel.name.includes('gpt-4') ? 300 : 150;
          break;
        case 'anthropic':
          baseTokensPerSecond = 60;
          baseLatency = 200;
          break;
        case 'google':
          baseTokensPerSecond = 70;
          baseLatency = 180;
          break;
        case 'meta':
          baseTokensPerSecond = 90;
          baseLatency = 120;
          break;
        default:
          baseTokensPerSecond = 50;
          baseLatency = 200;
      }

      // Adjust for context window usage
      const contextFactor = Math.max(0.3, 1 - (contextWindow - 4096) / 50000);
      const adjustedTokensPerSecond = Math.round(baseTokensPerSecond * contextFactor);
      const adjustedLatency = Math.round(baseLatency / contextFactor);
      
      return {
        tokensPerSecond: adjustedTokensPerSecond,
        latency: adjustedLatency,
        throughput: Math.round((adjustedTokensPerSecond / state.tokensPerRequest) * 10) / 10,
        concurrentUsers: concurrentRequests,
        memoryUsage: { 
          gpu: 0, // API providers handle this
          cpu: 0, 
          ram: 0, 
          nvme: 0 
        },
        perUserMetrics: {
          gpuMemory: 0,
          cpuMemory: 0,
          electricityCost: (selectedModel.costPerMToken / 1000) * (contextWindow / 1000) // Cost per request
        }
      };
    }

    // Cloud Instance Performance Calculation
    if (selectedProvider?.type === 'opensource' && state.deploymentType === 'cloud' && selectedCloudInstance) {
      // Calculate performance based on cloud instance specs
      const gpuPower = selectedCloudInstance.gpus * 100; // Estimate based on GPU count
      let baseTokensPerSecond = gpuPower * 0.8; // GPUs are more efficient in cloud
      
      // Adjust for model size
      const modelSizeFactor = Math.max(0.1, 1 - (selectedModel.memoryRequired - 7) / 100);
      baseTokensPerSecond *= modelSizeFactor;
      
      // Apply framework and quantization effects
      const frameworkBoost = framework.throughputMultiplier;
      const quantizationBoost = quantization.performanceImpact;
      const batchBoost = Math.log2(batchSize) * 0.5 + 1;
      
      const tokensPerSecond = baseTokensPerSecond * frameworkBoost * quantizationBoost * batchBoost;
      const latency = 1000 / tokensPerSecond * 8; // Cloud has better latency
      const throughput = tokensPerSecond / state.tokensPerRequest;
      
      // Memory calculations for cloud
      const memoryUsage = selectedModel.memoryRequired * quantization.memoryReduction * framework.memoryOverhead;
      const availableGpuMemory = selectedCloudInstance.gpus * 80; // Estimate 80GB per GPU in cloud
      
      return {
        tokensPerSecond: Math.round(tokensPerSecond),
        latency: Math.round(latency),
        throughput: Math.round(throughput * 10) / 10,
        concurrentUsers: concurrentUsers,
        memoryUsage: { 
          gpu: Math.min(Math.round(memoryUsage), availableGpuMemory),
          cpu: Math.round(memoryUsage * 0.2), 
          ram: Math.round(selectedCloudInstance.ram * 0.8), 
          nvme: 0
        },
        perUserMetrics: {
          gpuMemory: Math.round(memoryUsage / concurrentUsers * 100) / 100,
          cpuMemory: Math.round(memoryUsage * 0.2 / concurrentUsers * 100) / 100,
          electricityCost: selectedCloudInstance.costPerHour / concurrentUsers
        }
      };
    }

    // Physical Hardware Performance Calculation
    const selectedGpu = state.gpus[0];
    if (!selectedGpu) {
      return {
        tokensPerSecond: 0,
        latency: 0,
        throughput: 0,
        concurrentUsers: 0,
        memoryUsage: { gpu: 0, cpu: 0, ram: 0, nvme: 0 },
        perUserMetrics: { gpuMemory: 0, cpuMemory: 0, electricityCost: 0 }
      };
    }

    const baseTokensPerSecond = selectedGpu.bandwidth / 100 * quantization.performanceImpact;
    const frameworkBoost = framework.throughputMultiplier;
    const batchBoost = Math.log2(batchSize) * 0.5 + 1;
    
    const tokensPerSecond = baseTokensPerSecond * frameworkBoost * batchBoost;
    const latency = 1000 / tokensPerSecond * 10; // Approximate first token latency
    const throughput = tokensPerSecond / state.tokensPerRequest;
    const memoryUsage = selectedModel.memoryRequired * quantization.memoryReduction * framework.memoryOverhead;
    
    const gpuMemoryUsage = memoryUsage;
    const cpuMemoryUsage = memoryUsage * (state.offloading.cpu / 100);
    const ramMemoryUsage = memoryUsage * (state.offloading.ram / 100);
    const nvmeMemoryUsage = memoryUsage * (state.offloading.nvme / 100);

    return {
      tokensPerSecond: Math.round(tokensPerSecond),
      latency: Math.round(latency),
      throughput: Math.round(throughput * 10) / 10,
      concurrentUsers,
      memoryUsage: { 
        gpu: Math.round(gpuMemoryUsage), 
        cpu: Math.round(cpuMemoryUsage), 
        ram: Math.round(ramMemoryUsage), 
        nvme: Math.round(nvmeMemoryUsage) 
      },
      perUserMetrics: {
        gpuMemory: Math.round(gpuMemoryUsage / concurrentUsers * 100) / 100,
        cpuMemory: Math.round(cpuMemoryUsage / concurrentUsers * 100) / 100,
        electricityCost: 0.12 // $0.12 per user per hour estimate
      }
    };
  };

  const validateConfiguration = (): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!state.selectedModel) {
      errors.push('Please select a model');
    }
    
    if (state.deploymentType === 'physical') {
      if (state.gpus.length === 0) {
        errors.push('Please select at least one GPU');
      }
      
      if (!state.cpu) {
        errors.push('Please select a CPU');
      }
      
      const selectedGpu = state.gpus[0];
      if (selectedGpu && state.cpu) {
        const requiredPcieLanes = selectedGpu.pcieLanes * gpuCount;
        if (requiredPcieLanes > state.cpu.pcieLanes) {
          errors.push(`CPU only has ${state.cpu.pcieLanes} PCIe lanes, but ${requiredPcieLanes} are required`);
        }
        
        const totalPower = selectedGpu.powerConsumption * gpuCount + state.cpu.tdp;
        if (totalPower > 1500) {
          warnings.push(`Total power consumption (${totalPower}W) may require a high-wattage PSU`);
        }
      }
    }
    
      if (state.selectedModel && state.gpus[0]) {
        const memoryRequired = state.selectedModel.memoryRequired * state.quantization.memoryReduction;
        const availableMemory = state.gpus[0].memory * gpuCount;
        
        if (memoryRequired > availableMemory) {
          errors.push(`Model requires ${memoryRequired}GB but only ${availableMemory}GB available`);
        }
      }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };

  const calculateCosts = () => {
    // API Provider Costs
    if (selectedProvider?.type === 'api') {
      const costPerRequest = (state.selectedModel?.costPerMToken || 0) / 1000 * (contextWindow / 1000);
      const hourlyCost = costPerRequest * state.requestsPerHour;
      const monthlyCost = hourlyCost * 24 * 30;
      
      return {
        totalCost: 0, // No upfront cost for API
        monthlyCost: monthlyCost
      };
    }

    // Cloud Instance Costs
    if (selectedProvider?.type === 'opensource' && state.deploymentType === 'cloud' && selectedCloudInstance) {
      return {
        totalCost: 0, // No upfront cost for cloud
        monthlyCost: selectedCloudInstance.costPerHour * 24 * 30
      };
    }

    // Physical Hardware Costs
    const selectedGpu = state.gpus[0];
    const gpuCost = selectedGpu ? (selectedGpu.retailPrice || 0) * gpuCount : 0;
    const cpuCost = state.cpu?.retailPrice || 0;
    const ramCost = ramAmount * 8;
    const storageCost = storageAmount * 0.1;
    
    return {
      totalCost: gpuCost + cpuCost + ramCost + storageCost + 1400, // +1400 for mobo/psu
      monthlyCost: 150 // Estimated operational cost
    };
  };

  const handleCalculate = () => {
    const validation = validateConfiguration();
    const performanceMetrics = calculatePerformanceMetrics();
    const costs = calculateCosts();
    
    if (validation.isValid) {
      setResults({
        performanceMetrics,
        validation,
        ...costs
      });
      
      toast({
        title: "Calculation Complete",
        description: "Your LLM deployment configuration has been calculated.",
      });
    } else {
      toast({
        title: "Configuration Invalid",
        description: "Please fix the errors before calculating.",
        variant: "destructive"
      });
    }
  };

  const handleExportConfig = () => {
    const config = {
      deployment: state.deploymentType,
      model: state.selectedModel,
      hardware: {
        gpu: state.gpus[0],
        gpuCount,
        cpu: state.cpu,
        ram: ramAmount,
        storage: storageAmount
      },
      performance: {
        quantization: state.quantization,
        framework: state.framework,
        batchSize: state.batchSize,
        kvCache: state.kvCache
      },
      usage: {
        expectedUsers: state.expectedUsers,
        requestsPerHour: state.requestsPerHour,
        tokensPerRequest: state.tokensPerRequest,
        concurrentUsers
      }
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'llm-deployment-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyConfig = () => {
    const config = {
      deployment: state.deploymentType,
      model: state.selectedModel?.name,
      gpu: `${gpuCount}x ${state.gpus[0]?.name}`,
      quantization: state.quantization.name,
      framework: state.framework.name
    };
    
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    toast({
      title: "Copied to Clipboard",
      description: "Configuration has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>LLM Deployment Calculator</CardTitle>
          <CardDescription>
            Configure your LLM deployment step by step
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {[
              { key: 'provider', label: 'Provider', icon: Zap },
              { key: 'model', label: 'Model', icon: Calculator },
              { key: 'deployment', label: 'Deployment', icon: Server },
              { key: 'config', label: 'Configuration', icon: ArrowRight }
            ].map(({ key, label, icon: Icon }, index) => (
              <div key={key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    currentStep === key
                      ? 'bg-primary text-primary-foreground'
                      : index < ['provider', 'model', 'deployment', 'config'].indexOf(currentStep)
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Provider Selection */}
      {currentStep === 'provider' && (
        <ProviderSelector
          selectedProvider={selectedProvider}
          onProviderSelect={(provider) => {
            setSelectedProvider(provider);
            setCurrentStep('model');
          }}
        />
      )}

      {/* Step 2: Model Selection */}
      {currentStep === 'model' && selectedProvider && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Provider: {selectedProvider.name}</CardTitle>
              <CardDescription>{selectedProvider.description}</CardDescription>
            </CardHeader>
          </Card>

          <ModelSelectorAdvanced
            selectedProvider={selectedProvider}
            selectedModel={state.selectedModel}
            onModelSelect={(model) => {
              handleModelSelect(model);
              setCurrentStep(selectedProvider.type === 'api' ? 'config' : 'deployment');
            }}
          />

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep('provider')}>
              Back to Provider
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Deployment Configuration (for Open Source models only) */}
      {currentStep === 'deployment' && selectedProvider?.type === 'opensource' && (
        <div className="space-y-6">
          <DeploymentSelector
            deploymentType={state.deploymentType}
            selectedProvider={state.cloudProvider}
            onDeploymentTypeChange={handleDeploymentTypeChange}
            onProviderChange={handleProviderChange}
          />

          {state.deploymentType === 'cloud' && (
            <CloudInstanceSelector
              selectedProvider={selectedCloudProvider}
              selectedInstance={selectedCloudInstance}
              onProviderChange={setSelectedCloudProvider}
              onInstanceChange={setSelectedCloudInstance}
            />
          )}

          {state.deploymentType && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('model')}>
                Back to Model
              </Button>
              <Button onClick={() => setCurrentStep('config')}>
                Continue to Configuration
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Configuration */}
      {currentStep === 'config' && (
        <div className="space-y-6">
          {selectedProvider?.type === 'api' ? (
            // API Configuration
            <APIConfiguration
              selectedModel={state.selectedModel}
              contextWindow={contextWindow}
              onContextWindowChange={setContextWindow}
              expectedUsers={state.expectedUsers}
              onExpectedUsersChange={(users) => setState(prev => ({ ...prev, expectedUsers: users }))}
              requestsPerHour={state.requestsPerHour}
              onRequestsPerHourChange={(requests) => setState(prev => ({ ...prev, requestsPerHour: requests }))}
              concurrentRequests={concurrentRequests}
              onConcurrentRequestsChange={setConcurrentRequests}
            />
          ) : (
            // Open Source Configuration
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {state.deploymentType === 'physical' && (
                  <HardwareConfigurator
                    deploymentType={state.deploymentType}
                    selectedProvider={state.cloudProvider}
                    selectedGpus={state.gpus}
                    gpuCount={gpuCount}
                    selectedCpu={state.cpu}
                    ramAmount={ramAmount}
                    storageAmount={storageAmount}
                    onGpuChange={handleGpuChange}
                    onGpuCountChange={setGpuCount}
                    onCpuChange={handleCpuChange}
                    onRamChange={setRamAmount}
                    onStorageChange={setStorageAmount}
                  />
                )}

                <PerformanceSettings
                  selectedModel={state.selectedModel}
                  quantization={state.quantization}
                  framework={state.framework}
                  batchSize={state.batchSize}
                  kvCache={state.kvCache}
                  onQuantizationChange={(q) => setState(prev => ({ ...prev, quantization: q }))}
                  onFrameworkChange={(f) => setState(prev => ({ ...prev, framework: f }))}
                  onBatchSizeChange={(size) => setState(prev => ({ ...prev, batchSize: size }))}
                  onKvCacheChange={(enabled) => setState(prev => ({ ...prev, kvCache: enabled }))}
                />
              </div>

              <div className="space-y-6">
                <UsageSimulator
                  expectedUsers={state.expectedUsers}
                  requestsPerHour={state.requestsPerHour}
                  tokensPerRequest={state.tokensPerRequest}
                  concurrentUsers={concurrentUsers}
                  onExpectedUsersChange={(users) => setState(prev => ({ ...prev, expectedUsers: users }))}
                  onRequestsPerHourChange={(requests) => setState(prev => ({ ...prev, requestsPerHour: requests }))}
                  onTokensPerRequestChange={(tokens) => setState(prev => ({ ...prev, tokensPerRequest: tokens }))}
                  onConcurrentUsersChange={setConcurrentUsers}
                />

                <CostAnalyzer
                  deploymentType={state.deploymentType}
                  selectedGpus={state.gpus}
                  gpuCount={gpuCount}
                  selectedCpu={state.cpu}
                  ramAmount={ramAmount}
                  storageAmount={storageAmount}
                  requestsPerHour={state.requestsPerHour}
                  costBreakdown={{} as CostBreakdown}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(selectedProvider?.type === 'api' ? 'model' : 'deployment')}
            >
              Back
            </Button>
            <Button 
              onClick={handleCalculate} 
              size="lg" 
              variant="gradient"
              className="px-12"
              disabled={!state.selectedModel}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Requirements
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                // Reset all state
                setState({
                  deploymentType: undefined,
                  quantization: quantizationOptions[0] || { id: 'fp16', name: 'FP16', bitsPerWeight: 16, memoryReduction: 1, performanceImpact: 1 },
                  framework: deploymentFrameworks[0] || { id: 'vllm', name: 'vLLM', throughputMultiplier: 2.5, memoryOverhead: 1.2, supportedQuantization: [], supportsOffloading: true, offloadingTypes: [] },
                  batchSize: 1,
                  kvCache: true,
                  expectedUsers: 10,
                  requestsPerHour: 100,
                  tokensPerRequest: 150,
                  concurrentUsers: 5,
                  contextWindow: 4096,
                  offloading: { cpu: 0, ram: 0, nvme: 0 },
                  gpus: []
                });
                setCurrentStep('provider');
                setSelectedProvider(undefined);
                setSelectedCloudProvider(undefined);
                setSelectedCloudInstance(undefined);
                setContextWindow(4096);
                setConcurrentRequests(5);
                setConcurrentUsers(5);
                setGpuCount(1);
                setRamAmount(64);
                setStorageAmount(500);
                setResults(null);
                setIsSimulationRunning(false);
              }}
            >
              Reset All
            </Button>
          </div>
        </div>
      )}

      {/* Results Dashboard */}
      {results && (
        <div className="space-y-6">
          <ResultsDashboard
            selectedModel={state.selectedModel}
            selectedGpu={state.gpus[0]}
            selectedCpu={state.cpu}
            gpuCount={gpuCount}
            performanceMetrics={results.performanceMetrics}
            validationResult={results.validation}
            totalCost={results.totalCost}
            monthlyCost={results.monthlyCost}
            onExportConfig={handleExportConfig}
            onCopyConfig={handleCopyConfig}
          />
          
          <SimulationDisplay
            selectedModel={state.selectedModel}
            performanceMetrics={results.performanceMetrics}
            isRunning={isSimulationRunning}
            onStartSimulation={() => setIsSimulationRunning(true)}
            onStopSimulation={() => setIsSimulationRunning(false)}
            onResetSimulation={() => setIsSimulationRunning(false)}
          />
        </div>
      )}
    </div>
  );
};