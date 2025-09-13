import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Wrench, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Users, 
  Clock, 
  Server,
  Cloud,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface Factor {
  name: string;
  icon: React.ReactNode;
  hardware: { score: number; details: string[] };
  cloud: { score: number; details: string[] };
  api: { score: number; details: string[] };
}

const factors: Factor[] = [
  {
    name: 'Security',
    icon: <Shield className="h-5 w-5" />,
    hardware: {
      score: 95,
      details: [
        'Complete control over data',
        'No third-party access',
        'Custom security protocols',
        'Air-gapped deployments possible'
      ]
    },
    cloud: {
      score: 80,
      details: [
        'Provider security measures',
        'Compliance certifications',
        'Shared responsibility model',
        'Network-based vulnerabilities'
      ]
    },
    api: {
      score: 70,
      details: [
        'Data sent to external services',
        'Provider privacy policies',
        'Limited control over processing',
        'Encryption in transit'
      ]
    }
  },
  {
    name: 'Installation Difficulty',
    icon: <Wrench className="h-5 w-5" />,
    hardware: {
      score: 30,
      details: [
        'Hardware assembly required',
        'Software stack configuration',
        'Driver and dependency setup',
        'Troubleshooting expertise needed'
      ]
    },
    cloud: {
      score: 70,
      details: [
        'Pre-configured environments',
        'Template deployments',
        'Cloud provider documentation',
        'Some configuration required'
      ]
    },
    api: {
      score: 95,
      details: [
        'Simple API integration',
        'Extensive documentation',
        'SDK availability',
        'Minimal setup required'
      ]
    }
  },
  {
    name: 'Maintenance',
    icon: <Wrench className="h-5 w-5" />,
    hardware: {
      score: 25,
      details: [
        'Hardware failure management',
        'Regular updates and patches',
        'Cooling and power monitoring',
        'Backup and recovery setup'
      ]
    },
    cloud: {
      score: 75,
      details: [
        'Provider manages hardware',
        'Automated updates available',
        'Monitoring tools provided',
        'Scaling management needed'
      ]
    },
    api: {
      score: 95,
      details: [
        'Zero maintenance required',
        'Provider handles everything',
        'Always up-to-date models',
        'Built-in redundancy'
      ]
    }
  },
  {
    name: 'Performance',
    icon: <Zap className="h-5 w-5" />,
    hardware: {
      score: 90,
      details: [
        'Dedicated resources',
        'Optimized for specific models',
        'No network latency',
        'Custom configurations'
      ]
    },
    cloud: {
      score: 80,
      details: [
        'High-performance instances',
        'Network latency present',
        'Shared infrastructure',
        'Scalable on demand'
      ]
    },
    api: {
      score: 70,
      details: [
        'Network dependency',
        'Shared model instances',
        'Rate limiting possible',
        'Variable response times'
      ]
    }
  },
  {
    name: 'Scalability',
    icon: <TrendingUp className="h-5 w-5" />,
    hardware: {
      score: 40,
      details: [
        'Manual hardware upgrades',
        'Physical space limitations',
        'Capital investment required',
        'Load balancing complexity'
      ]
    },
    cloud: {
      score: 95,
      details: [
        'Auto-scaling capabilities',
        'Pay-per-use models',
        'Global infrastructure',
        'Instant resource allocation'
      ]
    },
    api: {
      score: 100,
      details: [
        'Unlimited scaling',
        'Provider handles capacity',
        'Global endpoints',
        'No infrastructure management'
      ]
    }
  },
  {
    name: 'Cost Efficiency',
    icon: <DollarSign className="h-5 w-5" />,
    hardware: {
      score: 85,
      details: [
        'One-time purchase',
        'Long-term cost savings',
        'No recurring fees',
        'Depreciation over time'
      ]
    },
    cloud: {
      score: 70,
      details: [
        'Pay-per-use pricing',
        'No upfront costs',
        'Predictable scaling costs',
        'Ongoing operational expenses'
      ]
    },
    api: {
      score: 60,
      details: [
        'Per-token pricing',
        'No infrastructure costs',
        'Expensive at scale',
        'Usage-based billing'
      ]
    }
  },
  {
    name: 'Reliability',
    icon: <CheckCircle className="h-5 w-5" />,
    hardware: {
      score: 75,
      details: [
        'Single point of failure',
        'Requires redundancy planning',
        'Maintenance downtime',
        'Full control over uptime'
      ]
    },
    cloud: {
      score: 90,
      details: [
        'Built-in redundancy',
        'High availability zones',
        'Provider SLA guarantees',
        'Automatic failover'
      ]
    },
    api: {
      score: 95,
      details: [
        'Enterprise-grade SLAs',
        'Multiple data centers',
        'Automatic load balancing',
        'Provider responsibility'
      ]
    }
  },
  {
    name: 'Time to Deploy',
    icon: <Clock className="h-5 w-5" />,
    hardware: {
      score: 20,
      details: [
        '2-4 weeks procurement',
        'Assembly and testing time',
        'Software installation',
        'Configuration and optimization'
      ]
    },
    cloud: {
      score: 85,
      details: [
        'Minutes to hours setup',
        'Pre-configured templates',
        'Instant resource allocation',
        'Some configuration needed'
      ]
    },
    api: {
      score: 95,
      details: [
        'Immediate availability',
        'Simple integration',
        'No setup required',
        'Start using instantly'
      ]
    }
  }
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

const getScoreBadge = (score: number) => {
  if (score >= 80) return <Badge variant="default" className="bg-green-600">Excellent</Badge>;
  if (score >= 60) return <Badge variant="secondary" className="bg-yellow-600">Good</Badge>;
  return <Badge variant="destructive">Challenging</Badge>;
};

export const ProsConsAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Hardware Deployment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Maximum control & security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Long-term cost efficiency</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">High maintenance burden</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Limited scalability</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Cloud Deployment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Excellent scalability</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Managed infrastructure</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Ongoing operational costs</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Network dependencies</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>API Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Zero maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Instant deployment</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Data privacy concerns</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">High cost at scale</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Factor Analysis */}
      <div className="space-y-4">
        {factors.map((factor) => (
          <Card key={factor.name}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                {factor.icon}
                <span>{factor.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hardware */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Server className="h-4 w-4" />
                      <span>Hardware</span>
                    </h4>
                    {getScoreBadge(factor.hardware.score)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Score</span>
                      <span className={`font-semibold ${getScoreColor(factor.hardware.score)}`}>
                        {factor.hardware.score}/100
                      </span>
                    </div>
                    <Progress value={factor.hardware.score} className="h-2" />
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {factor.hardware.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-xs mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cloud */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Cloud className="h-4 w-4" />
                      <span>Cloud</span>
                    </h4>
                    {getScoreBadge(factor.cloud.score)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Score</span>
                      <span className={`font-semibold ${getScoreColor(factor.cloud.score)}`}>
                        {factor.cloud.score}/100
                      </span>
                    </div>
                    <Progress value={factor.cloud.score} className="h-2" />
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {factor.cloud.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-xs mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* API */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>API</span>
                    </h4>
                    {getScoreBadge(factor.api.score)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Score</span>
                      <span className={`font-semibold ${getScoreColor(factor.api.score)}`}>
                        {factor.api.score}/100
                      </span>
                    </div>
                    <Progress value={factor.api.score} className="h-2" />
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {factor.api.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-xs mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendation Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-primary/10 rounded-lg border">
              <h4 className="font-semibold mb-2">Choose Hardware If:</h4>
              <ul className="text-sm space-y-1">
                <li>• Maximum security is required</li>
                <li>• Long-term deployment (2+ years)</li>
                <li>• Predictable workloads</li>
                <li>• Have technical expertise</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-secondary/10 rounded-lg border">
              <h4 className="font-semibold mb-2">Choose Cloud If:</h4>
              <ul className="text-sm space-y-1">
                <li>• Variable workloads</li>
                <li>• Need quick scaling</li>
                <li>• Want managed infrastructure</li>
                <li>• Medium-term projects</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-accent/10 rounded-lg border">
              <h4 className="font-semibold mb-2">Choose API If:</h4>
              <ul className="text-sm space-y-1">
                <li>• Rapid prototyping</li>
                <li>• Low maintenance requirements</li>
                <li>• Variable usage patterns</li>
                <li>• Proof of concept projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};