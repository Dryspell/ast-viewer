import { Component } from 'solid-js';
import { FileRoutes } from '@solidjs/start/router';
import ASTViewer from './components/AST/ASTViewer';
import './app.css';

const App: Component = () => {
  return (
    <div>
      <ASTViewer />
    </div>
  );
};

export default App;
