import React from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoDashboard = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#121923] border border-[#D94B4B]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#D94B4B]/15 border border-[#D94B4B]/30 text-[#D94B4B] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-white tracking-tight">
                Case File Render Malfunction
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                An unexpected interface anomaly prevented this investigation module from displaying.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl text-left">
                <p className="text-[10px] font-mono uppercase text-[#D94B4B]">Error Diagnostic:</p>
                <p className="text-xs font-mono text-gray-300 mt-1 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md shadow-[#D94B4B]/20"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Room</span>
              </button>
              <button
                onClick={this.handleGoDashboard}
                className="flex-1 py-2.5 rounded-xl bg-[#18212D] hover:bg-[#202c3c] text-white border border-[#293444] text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Case Board</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
