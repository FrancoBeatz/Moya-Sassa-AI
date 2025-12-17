import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ChatInterface } from './components/ChatInterface';
import { StatusCheck } from './components/StatusCheck';
import { InfoGuide } from './components/InfoGuide';
import { AppTab } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.CHAT);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.CHAT:
        return <ChatInterface />;
      case AppTab.STATUS:
        return <StatusCheck />;
      case AppTab.INFO:
        return <InfoGuide />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="pb-16 md:pb-0 md:pl-0">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
           {/* Mobile-centric wrapper: max-w-md makes it look like a phone on desktop */}
          {renderContent()}
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>
      </main>
    </div>
  );
}

export default App;