import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { GPU, CPU, CostBreakdown } from '@/types/calculator';

interface CostAnalyzerProps {
  deploymentType: 'cloud' | 'physical' | undefined;
  selectedGpus: GPU[];
  gpuCount: number;
  selectedCpu?: CPU;
  ramAmount: number;
  storageAmount: number;
  requestsPerHour: number;
  costBreakdown: CostBreakdown;
}

export const CostAnalyzer: React.FC<CostAnalyzerProps> = ({
  deploymentType,
  selectedGpus,
  gpuCount,
  selectedCpu,
  ramAmount,
  storageAmount,
  requestsPerHour,
  costBreakdown
}) => {
  const selectedGpu = selectedGpus[0];
  
  // Calculate costs
  const gpuCost = selectedGpu ? (selectedGpu.retailPrice || 0) * gpuCount : 0;
  const cpuCost = selectedCpu?.retailPrice || 0;
  const ramCost = ramAmount * 8; // $8 per GB estimate
  const storageCost = storageAmount * 0.1; // $0.1 per GB for NVMe
  const motherboardCost = 800; // Estimate for server motherboard
  const psuCost = 600; // Estimate for high-wattage PSU
  
  const totalHardwareCost = gpuCost + cpuCost + ramCost + storageCost + motherboardCost + psuCost;
  
  // Cloud costs
  const cloudHourlyRate = selectedGpu?.cloudCostPerHour || 0;
  const cloudMonthlyCost = cloudHourlyRate * 24 * 30 * gpuCount;
  const cloudYearlyCost = cloudMonthlyCost * 12;
  
  // Operational costs for physical
  const powerConsumption = (selectedGpu?.powerConsumption || 0) * gpuCount + (selectedCpu?.tdp || 0) + 200; // +200W for other components
  const electricityCost = (powerConsumption / 1000) * 24 * 30 * 0.12; // $0.12 per kWh
  const maintenanceCost = totalHardwareCost * 0.02 / 12; // 2% annually
  const monthlyOperationalCost = electricityCost + maintenanceCost;
  
  // Cost per request
  const physicalCostPerRequest = deploymentType === 'physical' 
    ? (totalHardwareCost / (365 * 24 * requestsPerHour) + monthlyOperationalCost / (30 * 24 * requestsPerHour))
    : 0;
  const cloudCostPerRequest = cloudMonthlyCost / (30 * 24 * requestsPerHour);

  // Break-even analysis
  const breakEvenMonths = totalHardwareCost / Math.max(cloudMonthlyCost - monthlyOperationalCost, 1);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Cost Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Physical Server Cost */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <h4 className="font-semibold">Physical Server</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Investment:</span>
                    <span className="font-medium">${totalHardwareCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Operational:</span>
                    <span className="font-medium">${monthlyOperationalCost.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Cost per Request:</span>
                    <span>${physicalCostPerRequest.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              {/* Cloud Cost */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <h4 className="font-semibold">Cloud Deployment</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Cost:</span>
                    <span className="font-medium">${cloudMonthlyCost.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Cost:</span>
                    <span className="font-medium">${cloudYearlyCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Cost per Request:</span>
                    <span>${cloudCostPerRequest.toFixed(6)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Break-even Analysis */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Break-even Analysis</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Physical server pays for itself in:</span>
                  <Badge variant="secondary">
                    {breakEvenMonths.toFixed(1)} months
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>ROI Progress</span>
                    <span>{Math.min(100, (12 / breakEvenMonths) * 100).toFixed(0)}% (1 year)</span>
                  </div>
                  <Progress value={Math.min(100, (12 / breakEvenMonths) * 100)} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>GPUs ({gpuCount}x {selectedGpu?.name})</span>
                <span className="font-medium">${gpuCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>CPU ({selectedCpu?.name})</span>
                <span className="font-medium">${cpuCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>RAM ({ramAmount}GB DDR5)</span>
                <span className="font-medium">${ramCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage ({storageAmount}GB NVMe)</span>
                <span className="font-medium">${storageCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Motherboard & PSU</span>
                <span className="font-medium">${(motherboardCost + psuCost).toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Hardware Cost</span>
                <span>${totalHardwareCost.toLocaleString()}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operational" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Monthly Costs</h4>
                <div className="flex justify-between items-center">
                  <span>Electricity ({powerConsumption}W)</span>
                  <span className="font-medium">${electricityCost.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Maintenance & Support</span>
                  <span className="font-medium">${maintenanceCost.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cooling & Infrastructure</span>
                  <span className="font-medium">$50</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-bold">
                  <span>Total Monthly OpEx</span>
                  <span>${(monthlyOperationalCost + 50).toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Annual Projections</h4>
                <div className="flex justify-between items-center">
                  <span>Year 1 Total Cost</span>
                  <span className="font-medium">
                    ${(totalHardwareCost + monthlyOperationalCost * 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Year 2 Total Cost</span>
                  <span className="font-medium">
                    ${(totalHardwareCost + monthlyOperationalCost * 24).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Year 3 Total Cost</span>
                  <span className="font-medium">
                    ${(totalHardwareCost + monthlyOperationalCost * 36).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${physicalCostPerRequest.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">Physical Server</div>
                  <div className="text-xs">per request</div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    ${cloudCostPerRequest.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">Cloud Service</div>
                  <div className="text-xs">per request</div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Recommendation</h4>
                {breakEvenMonths < 12 ? (
                  <div className="text-green-600">
                    ✅ <strong>Physical server recommended</strong> - Pays for itself in {breakEvenMonths.toFixed(1)} months
                  </div>
                ) : breakEvenMonths < 24 ? (
                  <div className="text-yellow-600">
                    ⚠️ <strong>Consider usage patterns</strong> - Break-even in {breakEvenMonths.toFixed(1)} months
                  </div>
                ) : (
                  <div className="text-blue-600">
                    ☁️ <strong>Cloud recommended</strong> - Lower initial investment and operational complexity
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};