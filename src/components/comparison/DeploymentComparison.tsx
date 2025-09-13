import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Server, Cloud, Zap, DollarSign, Clock, Shield, TrendingUp } from 'lucide-react';
import { useLLMModels } from '@/hooks/useProviderData';

interface DeploymentOption {
  id: string;
  name: string;
  type: 'hardware' | 'cloud' | 'api';
  icon: React.ReactNode;
  initialCost: number;
  monthlyCost: number;
  yearlyCost: number;
  performance: {
    tokensPerSecond: number;
    latency: number;
    reliability: number;
  };
  scalability: number;
  maintenance: 'low' | 'medium' | 'high';
  security: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const deploymentOptions: DeploymentOption[] = [
  {
    id: 'custom-hardware',
    name: 'Custom Hardware Server',
    type: 'hardware',
    icon: <Server className="h-5 w-5" />,
    initialCost: 15000,
    monthlyCost: 200,
    yearlyCost: 2400,
    performance: { tokensPerSecond: 150, latency: 50, reliability: 95 },
    scalability: 30,
    maintenance: 'high',
    security: 95,
    difficulty: 'hard'
  },
  {
    id: 'prebuilt-server',
    name: 'Prebuilt Enterprise Server',
    type: 'hardware',
    icon: <Server className="h-5 w-5" />,
    initialCost: 25000,
    monthlyCost: 150,
    yearlyCost: 1800,
    performance: { tokensPerSecond: 200, latency: 40, reliability: 98 },
    scalability: 40,
    maintenance: 'medium',
    security: 90,
    difficulty: 'medium'
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud Instance',
    type: 'cloud',
    icon: <Cloud className="h-5 w-5" />,
    initialCost: 0,
    monthlyCost: 800,
    yearlyCost: 9600,
    performance: { tokensPerSecond: 180, latency: 60, reliability: 99 },
    scalability: 95,
    maintenance: 'low',
    security: 85,
    difficulty: 'easy'
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    type: 'api',
    icon: <Zap className="h-5 w-5" />,
    initialCost: 0,
    monthlyCost: 1200,
    yearlyCost: 14400,
    performance: { tokensPerSecond: 100, latency: 200, reliability: 99.9 },
    scalability: 100,
    maintenance: 'low',
    security: 90,
    difficulty: 'easy'
  }
];

export const DeploymentComparison = () => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { data: models } = useLLMModels();

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const filteredOptions = selectedOptions.length > 0 
    ? deploymentOptions.filter(option => selectedOptions.includes(option.id))
    : deploymentOptions;

  const calculateROI = (option: DeploymentOption, timeframe: number = 36) => {
    const totalCost = option.initialCost + (option.monthlyCost * timeframe);
    const performanceValue = option.performance.tokensPerSecond * timeframe * 24 * 30;
    return Math.round((performanceValue / totalCost) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Selection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Model for Comparison</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a model..." />
            </SelectTrigger>
            <SelectContent>
              {models?.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} (Provider)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Compare Deployment Options</label>
          <div className="flex flex-wrap gap-2">
            {deploymentOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedOptions.includes(option.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleOption(option.id)}
                className="flex items-center space-x-2"
              >
                {option.icon}
                <span>{option.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deployment Option</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Initial Cost</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Scalability</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead>Difficulty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOptions.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={option.type === 'hardware' ? 'default' : option.type === 'cloud' ? 'secondary' : 'outline'}>
                        {option.type}
                      </Badge>
                    </TableCell>
                    <TableCell>${option.initialCost.toLocaleString()}</TableCell>
                    <TableCell>${option.monthlyCost.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{option.performance.tokensPerSecond} t/s</div>
                        <Progress value={option.performance.reliability} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Progress value={option.scalability} className="w-16 h-2" />
                    </TableCell>
                    <TableCell>
                      <Badge variant={option.maintenance === 'low' ? 'default' : option.maintenance === 'medium' ? 'secondary' : 'destructive'}>
                        {option.maintenance}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={option.difficulty === 'easy' ? 'default' : option.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                        {option.difficulty}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    {option.icon}
                    <span>{option.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Initial Cost</span>
                      <span className="font-semibold">${option.initialCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Monthly</span>
                      <span className="font-semibold">${option.monthlyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Yearly</span>
                      <span className="font-semibold">${option.yearlyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-sm font-medium">3-Year Total</span>
                      <span className="font-bold text-primary">
                        ${(option.initialCost + (option.monthlyCost * 36)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    {option.icon}
                    <span>{option.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Tokens/Second</span>
                        <span className="font-semibold">{option.performance.tokensPerSecond}</span>
                      </div>
                      <Progress value={(option.performance.tokensPerSecond / 200) * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Latency (ms)</span>
                        <span className="font-semibold">{option.performance.latency}</span>
                      </div>
                      <Progress value={100 - (option.performance.latency / 200) * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Reliability</span>
                        <span className="font-semibold">{option.performance.reliability}%</span>
                      </div>
                      <Progress value={option.performance.reliability} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Security Score</span>
                        <span className="font-semibold">{option.security}/100</span>
                      </div>
                      <Progress value={option.security} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>ROI Comparison (3 Years)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOptions.map((option) => {
                    const roi = calculateROI(option);
                    return (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{option.name}</span>
                          <span className="font-bold text-primary">{roi}% ROI</span>
                        </div>
                        <Progress value={Math.min(roi, 100)} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Break-even Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOptions.filter(o => o.type === 'hardware').map((option) => {
                    const cloudOption = filteredOptions.find(o => o.type === 'cloud');
                    if (!cloudOption) return null;
                    
                    const breakEvenMonths = Math.ceil(option.initialCost / (cloudOption.monthlyCost - option.monthlyCost));
                    
                    return (
                      <div key={option.id} className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">{option.name} vs Cloud</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Break-even point: <span className="font-semibold text-foreground">{breakEvenMonths} months</span>
                        </p>
                        <div className="space-y-1">
                          <Progress value={(breakEvenMonths / 36) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            After {breakEvenMonths} months, hardware becomes more cost-effective
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};