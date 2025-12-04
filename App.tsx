import React from 'react';
import { WhatsAppLinkGenerator } from './components/WhatsAppLinkGenerator';

const App: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(0, 168, 132, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(0, 168, 132, 0.05) 0%, transparent 20%)
          `
        }}
      />
      <div className="relative z-10 w-full max-w-[420px]">
        <WhatsAppLinkGenerator />
      </div>
    </div>
  );
};

export default App;