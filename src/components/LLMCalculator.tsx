import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DeploymentSelector } from './calculator/DeploymentSelector';
import { ProviderSelector } from './calculator/ProviderSelector';
import { ModelSelectorAdvanced } from './calculator/ModelSelectorAdvanced';
import { HardwareConfigurator } from './calculator/HardwareConfigurator';
import { PerformanceSettings } from './calculator/PerformanceSettings';
import { UsageSimulator } from './calculator/UsageSimulator';
import { CostAnalyzer } from './calculator/CostAnalyzer';
import { ResultsDashboard } from './calculator/ResultsDashboard';
import { SimulationDisplay } from './calculator/SimulationDisplay';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { 
  LLMModel, 
  GPU, 
  CPU, 
  QuantizationOption, 
  DeploymentFramework, 
  PerformanceMetrics, 
  ValidationResult, 
  CostBreakdown,
  CalculatorState
} from '@/types/calculator';
import { 
  POPULAR_MODELS, 
  GPU_OPTIONS, 
  CPU_OPTIONS, 
  QUANTIZATION_OPTIONS, 
  DEPLOYMENT_FRAMEWORKS 
} from '@/data/models';

export const LLMCalculator = () => {
  const { toast } = useToast();
  
  const [state, setState] = useState<CalculatorState>({
    deploymentType: undefined,
    quantization: QUANTIZATION_OPTIONS[0],
    framework: DEPLOYMENT_FRAMEWORKS[0],
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
    const selectedGpu = state.gpus[0];
    
    if (!selectedModel || !selectedGpu) {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          <DeploymentSelector
            deploymentType={state.deploymentType}
            selectedProvider={state.cloudProvider}
            onDeploymentTypeChange={handleDeploymentTypeChange}
            onProviderChange={handleProviderChange}
          />

          <ProviderSelector
            selectedProvider={state.selectedProvider}
            onProviderSelect={(provider) => setState(prev => ({ ...prev, selectedProvider: provider }))}
            onApiKeyChange={handleApiKeyChange}
          />

          <ModelSelectorAdvanced
            selectedProvider={state.selectedProvider}
            selectedModel={state.selectedModel}
            onModelSelect={handleModelSelect}
          />

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
        </div>

        {/* Right Column - Performance & Usage */}
        <div className="space-y-6">
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

      {/* Calculate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleCalculate} 
          size="lg" 
          variant="gradient"
          className="px-12 py-6 text-lg"
          disabled={!state.selectedModel || !state.deploymentType}
        >
          <Calculator className="w-6 h-6 mr-3" />
          Calculate LLM Deployment Requirements
        </Button>
      </div>

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