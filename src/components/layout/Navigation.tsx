import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LLM Deployment Tool
            </h1>
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <Calculator className="h-4 w-4" />
                <span>Calculator</span>
              </NavLink>
              <NavLink
                to="/comparison"
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <BarChart3 className="h-4 w-4" />
                <span>Comparison</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;