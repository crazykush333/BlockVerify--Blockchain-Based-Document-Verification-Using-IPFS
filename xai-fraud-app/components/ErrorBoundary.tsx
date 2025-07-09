import React, { Component, ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.errorMsg} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;