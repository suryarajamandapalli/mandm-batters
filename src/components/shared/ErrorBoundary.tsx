import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.fallback) {
         return this.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-[2rem] border border-border shadow-sm m-4">
          <div className="size-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="size-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-navy mb-2">Something went wrong</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            An unexpected error occurred while rendering this component. We've been notified and are looking into it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-bold hover:bg-orange hover:text-navy transition-all"
            >
              <RefreshCw className="size-4" /> Try Again
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-bold text-navy hover:bg-secondary transition-all"
            >
              <Home className="size-4" /> Go Home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-secondary/50 rounded-xl text-left overflow-auto max-w-full">
              <p className="text-xs font-mono text-red-600">{this.state.error?.toString()}</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
