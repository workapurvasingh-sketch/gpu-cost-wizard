import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, MessageSquare, Activity } from 'lucide-react';

interface UsageSimulatorProps {
  expectedUsers: number;
  requestsPerHour: number;
  tokensPerRequest: number;
  concurrentUsers: number;
  onExpectedUsersChange: (users: number) => void;
  onRequestsPerHourChange: (requests: number) => void;
  onTokensPerRequestChange: (tokens: number) => void;
  onConcurrentUsersChange: (users: number) => void;
}

export const UsageSimulator: React.FC<UsageSimulatorProps> = ({
  expectedUsers,
  requestsPerHour,
  tokensPerRequest,
  concurrentUsers,
  onExpectedUsersChange,
  onRequestsPerHourChange,
  onTokensPerRequestChange,
  onConcurrentUsersChange
}) => {
  const totalRequestsPerHour = expectedUsers * (requestsPerHour / expectedUsers);
  const totalTokensPerHour = totalRequestsPerHour * tokensPerRequest;
  const avgWaitTime = concurrentUsers > 1 ? (60 / (requestsPerHour / concurrentUsers)) : 0;

  const usageIntensity = requestsPerHour < 100 ? 'Light' : 
                        requestsPerHour < 1000 ? 'Moderate' : 
                        requestsPerHour < 5000 ? 'Heavy' : 'Enterprise';

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Usage Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Expected Users
            </Label>
            <Input
              type="number"
              value={expectedUsers}
              onChange={(e) => onExpectedUsersChange(parseInt(e.target.value) || 1)}
              min="1"
              max="100000"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Concurrent Users
            </Label>
            <Input
              type="number"
              value={concurrentUsers}
              onChange={(e) => onConcurrentUsersChange(parseInt(e.target.value) || 1)}
              min="1"
              max={expectedUsers}
            />
          </div>
        </div>

        {/* Request Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Requests per Hour
            </Label>
            <Input
              type="number"
              value={requestsPerHour}
              onChange={(e) => onRequestsPerHourChange(parseInt(e.target.value) || 1)}
              min="1"
              max="100000"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Tokens per Request
            </Label>
            <Select 
              value={tokensPerRequest.toString()} 
              onValueChange={(value) => onTokensPerRequestChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="50">Short (50 tokens)</SelectItem>
                <SelectItem value="150">Medium (150 tokens)</SelectItem>
                <SelectItem value="500">Long (500 tokens)</SelectItem>
                <SelectItem value="1000">Very Long (1K tokens)</SelectItem>
                <SelectItem value="2000">Extended (2K tokens)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Usage Patterns */}
        <div className="space-y-4">
          <Label>Usage Pattern</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button 
              className="p-3 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {
                onRequestsPerHourChange(50);
                onTokensPerRequestChange(100);
                onConcurrentUsersChange(Math.min(5, expectedUsers));
              }}
            >
              <div className="font-medium">Light Usage</div>
              <div className="text-xs text-muted-foreground">
                Research, Testing
              </div>
            </button>

            <button 
              className="p-3 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {
                onRequestsPerHourChange(500);
                onTokensPerRequestChange(250);
                onConcurrentUsersChange(Math.min(20, expectedUsers));
              }}
            >
              <div className="font-medium">Business</div>
              <div className="text-xs text-muted-foreground">
                Small Team
              </div>
            </button>

            <button 
              className="p-3 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {
                onRequestsPerHourChange(2000);
                onTokensPerRequestChange(400);
                onConcurrentUsersChange(Math.min(50, expectedUsers));
              }}
            >
              <div className="font-medium">Production</div>
              <div className="text-xs text-muted-foreground">
                Web App
              </div>
            </button>

            <button 
              className="p-3 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {
                onRequestsPerHourChange(10000);
                onTokensPerRequestChange(300);
                onConcurrentUsersChange(Math.min(200, expectedUsers));
              }}
            >
              <div className="font-medium">Enterprise</div>
              <div className="text-xs text-muted-foreground">
                High Scale
              </div>
            </button>
          </div>
        </div>

        {/* Usage Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold">{totalRequestsPerHour.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Requests/Hour</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{(totalTokensPerHour / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">Tokens/Hour</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{avgWaitTime.toFixed(1)}s</div>
            <div className="text-xs text-muted-foreground">Avg Wait Time</div>
          </div>
          <div className="text-center">
            <Badge variant="secondary">{usageIntensity}</Badge>
            <div className="text-xs text-muted-foreground">Intensity</div>
          </div>
        </div>

        {/* Performance Implications */}
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-semibold mb-2">Performance Implications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Peak Load:</span>
              <div className="font-medium">
                {Math.round(requestsPerHour * 1.5).toLocaleString()} req/hr
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Memory for KV Cache:</span>
              <div className="font-medium">
                +{Math.round(concurrentUsers * 0.1 * tokensPerRequest / 100)} GB
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Queue Length:</span>
              <div className="font-medium">
                {concurrentUsers > 10 ? 'Consider Load Balancing' : 'Acceptable'}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Scaling Recommendation:</span>
              <div className="font-medium">
                {requestsPerHour > 5000 ? 'Multi-GPU Setup' : 'Single GPU OK'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};