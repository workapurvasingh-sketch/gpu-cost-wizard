import React from 'react';
import Navigation from '@/components/layout/Navigation';
import { LLMCalculator } from '@/components/LLMCalculator';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-80" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-accent-foreground bg-clip-text text-transparent">
            LLM Deployment Calculator
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Calculate hardware requirements and deployment costs for Large Language Models. 
            Get accurate estimates for GPU needs, memory requirements, and cloud infrastructure costs.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Hardware Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Cost Estimation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Multiple Models</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <LLMCalculator />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Use Our Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold">Accurate Estimates</h3>
              <p className="text-muted-foreground">
                Get precise hardware and cost calculations based on real-world deployment data
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">Performance Focused</h3>
              <p className="text-muted-foreground">
                Optimize for speed, cost, or memory usage based on your specific requirements
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold">Comprehensive Analysis</h3>
              <p className="text-muted-foreground">
                Compare different models, configurations, and deployment strategies
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;