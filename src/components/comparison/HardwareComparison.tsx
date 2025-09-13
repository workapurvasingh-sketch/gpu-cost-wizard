import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePrebuiltServers, useGPUs, useCPUs } from '@/hooks/useProviderData';
import { Server, Cpu, Zap, HardDrive, DollarSign, Wrench } from 'lucide-react';

interface CustomBuild {
  id: string;
  name: string;
  gpu: string;
  gpuCount: number;
  cpu: string;
  ram: number;
  storage: number;
  totalCost: number;
  performance: number;
}

export const HardwareComparison = () => {
  const [selectedPrebuilt, setSelectedPrebuilt] = useState<string[]>([]);
  const [customBuilds, setCustomBuilds] = useState<CustomBuild[]>([]);
  const [buildName, setBuildName] = useState('');
  
  const { data: prebuiltServers } = usePrebuiltServers();
  const { data: gpus } = useGPUs();
  const { data: cpus } = useCPUs();

  const togglePrebuilt = (serverId: string) => {
    setSelectedPrebuilt(prev => 
      prev.includes(serverId) 
        ? prev.filter(id => id !== serverId)
        : [...prev, serverId]
    );
  };

  const filteredPrebuilt = selectedPrebuilt.length > 0 
    ? prebuiltServers?.filter(server => selectedPrebuilt.includes(server.id))
    : prebuiltServers?.slice(0, 4);

  const calculatePerformanceScore = (server: any) => {
    // Calculate performance based on GPU count, CPU, and RAM
    const gpuScore = server.gpu_count * 25;
    const ramScore = Math.min(server.ram / 64, 1) * 25; // Normalize to 64GB max
    const storageScore = Math.min(server.storage / 2000, 1) * 25; // Normalize to 2TB max
    return Math.min(gpuScore + ramScore + storageScore + 25, 100);
  };

  const addCustomBuild = () => {
    if (!buildName) return;
    
    const newBuild: CustomBuild = {
      id: `custom-${Date.now()}`,
      name: buildName,
      gpu: 'RTX 4090',
      gpuCount: 2,
      cpu: 'Intel i9-13900K',
      ram: 128,
      storage: 2000,
      totalCost: 8500,
      performance: 85
    };
    
    setCustomBuilds(prev => [...prev, newBuild]);
    setBuildName('');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prebuilt" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prebuilt">Prebuilt Servers</TabsTrigger>
          <TabsTrigger value="custom">Custom Builds</TabsTrigger>
          <TabsTrigger value="comparison">Side by Side</TabsTrigger>
        </TabsList>

        <TabsContent value="prebuilt" className="space-y-4">
          {/* Prebuilt Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Prebuilt Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prebuiltServers?.map((server) => (
                  <Button
                    key={server.id}
                    variant={selectedPrebuilt.includes(server.id) ? "default" : "outline"}
                    className="h-auto p-4 justify-start"
                    onClick={() => togglePrebuilt(server.id)}
                  >
                    <div className="text-left space-y-1">
                      <div className="font-semibold">{server.name}</div>
                      <div className="text-sm opacity-80">{server.provider}</div>
                      <div className="text-sm opacity-80">${server.price.toLocaleString()}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prebuilt Comparison Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>GPU</TableHead>
                  <TableHead>CPU</TableHead>
                  <TableHead>RAM</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrebuilt?.map((server) => {
                  const performanceScore = calculatePerformanceScore(server);
                  return (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Server className="h-4 w-4" />
                          <span>{server.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{server.provider}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{server.gpu}</div>
                          <Badge variant="secondary" className="text-xs">
                            {server.gpuCount}x
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{server.cpu}</span>
                        </div>
                      </TableCell>
                      <TableCell>{server.ram}GB</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>{server.storage}GB</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">${server.price.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{performanceScore}/100</div>
                          <Progress value={performanceScore} className="w-16 h-2" />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          {/* Custom Build Creator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Create Custom Build</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Build Name</label>
                  <input
                    type="text"
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter build name..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">GPU</label>
                  <Select defaultValue="rtx-4090">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gpus?.slice(0, 10).map((gpu) => (
                        <SelectItem key={gpu.id} value={gpu.id}>
                          {gpu.name} - ${gpu.retailPrice?.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">CPU</label>
                  <Select defaultValue="i9-13900k">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cpus?.slice(0, 10).map((cpu) => (
                        <SelectItem key={cpu.id} value={cpu.id}>
                          {cpu.name} - ${cpu.retailPrice?.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={addCustomBuild} disabled={!buildName}>
                Add Custom Build
              </Button>
            </CardContent>
          </Card>

          {/* Custom Builds List */}
          {customBuilds.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customBuilds.map((build) => (
                <Card key={build.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{build.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPU:</span>
                        <span className="font-medium">{build.gpuCount}x {build.gpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPU:</span>
                        <span className="font-medium">{build.cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">{build.ram}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{build.storage}GB</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Total Cost:</span>
                        <span className="font-bold text-primary">${build.totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Performance Score</span>
                        <span className="font-semibold">{build.performance}/100</span>
                      </div>
                      <Progress value={build.performance} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prebuilt vs Custom Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Prebuilt Servers</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-medium">
                          ${prebuiltServers ? Math.round(prebuiltServers.reduce((sum, s) => sum + s.price, 0) / prebuiltServers.length).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty Included:</span>
                        <Badge variant="default" className="text-xs">Yes</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup Time:</span>
                        <span className="font-medium">1-2 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Custom Builds</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-medium">
                          ${customBuilds.length > 0 ? Math.round(customBuilds.reduce((sum, b) => sum + b.totalCost, 0) / customBuilds.length).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty:</span>
                        <Badge variant="outline" className="text-xs">Component-wise</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup Time:</span>
                        <span className="font-medium">1-2 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Performance & Flexibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Prebuilt - Avg Performance</span>
                      <span className="font-semibold">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Custom - Avg Performance</span>
                      <span className="font-semibold">
                        {customBuilds.length > 0 ? Math.round(customBuilds.reduce((sum, b) => sum + b.performance, 0) / customBuilds.length) : 90}/100
                      </span>
                    </div>
                    <Progress value={customBuilds.length > 0 ? Math.round(customBuilds.reduce((sum, b) => sum + b.performance, 0) / customBuilds.length) : 90} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <h5 className="font-semibold text-sm mb-2">Prebuilt</h5>
                    <div className="space-y-1 text-xs">
                      <Badge variant="default">Ready to use</Badge>
                      <Badge variant="secondary">Warranty</Badge>
                      <Badge variant="outline">Limited customization</Badge>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h5 className="font-semibold text-sm mb-2">Custom</h5>
                    <div className="space-y-1 text-xs">
                      <Badge variant="default">Full control</Badge>
                      <Badge variant="secondary">Cost efficient</Badge>
                      <Badge variant="outline">Assembly required</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};