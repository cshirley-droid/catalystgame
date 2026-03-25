// src/components/ErrorBoundary.jsx
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Catch the error info and log it to the console for good measure
    console.error("ErrorBoundary caught a crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI to replace the Black Screen of Death
      return (
        <div style={{ padding: '2rem', backgroundColor: '#600', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>React Exception Caught</h2>
          <p>The application crashed during rendering. Check the trace below:</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', backgroundColor: '#000', padding: '1rem', borderRadius: '4px' }} open>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#ff6b6b' }}>Error Details</summary>
            <br />
            <span style={{ color: '#ff6b6b' }}>{this.state.error && this.state.error.toString()}</span>
            <br />
            <span style={{ color: '#aaa' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</span>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}