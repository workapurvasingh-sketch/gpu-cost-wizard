import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeploymentComparison } from '@/components/comparison/DeploymentComparison';
import { ModelComparison } from '@/components/comparison/ModelComparison';
import { HardwareComparison } from '@/components/comparison/HardwareComparison';
import { ProsConsAnalysis } from '@/components/comparison/ProsConsAnalysis';

const Comparison = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LLM Deployment Comparison
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare different deployment strategies, models, and configurations to make informed decisions about your LLM infrastructure.
            </p>
          </div>

          {/* Main Comparison Tabs */}
          <Tabs defaultValue="deployment" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="deployment" className="text-sm">
                Deployment Types
              </TabsTrigger>
              <TabsTrigger value="models" className="text-sm">
                Model Comparison
              </TabsTrigger>
              <TabsTrigger value="hardware" className="text-sm">
                Hardware Options
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-sm">
                Pros & Cons
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deployment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Strategy Comparison</CardTitle>
                  <CardDescription>
                    Compare hardware servers, cloud instances, and API providers across cost, performance, and operational factors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DeploymentComparison />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>LLM Model Comparison</CardTitle>
                  <CardDescription>
                    Compare different language models based on performance, cost, capabilities, and resource requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ModelComparison />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hardware Configuration Comparison</CardTitle>
                  <CardDescription>
                    Compare prebuilt servers vs custom builds, and different hardware configurations for optimal performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HardwareComparison />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive pros and cons analysis across security, difficulty, maintenance, and other critical factors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProsConsAnalysis />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Comparison;