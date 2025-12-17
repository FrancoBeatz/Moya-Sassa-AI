import React from 'react';
import { AppTab } from '../types';
import { MessageCircle, Search, Info } from 'lucide-react';

interface NavigationProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const getButtonClass = (tab: AppTab) => {
    const isActive = currentTab === tab;
    return `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
      isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-safe">
      <button className={getButtonClass(AppTab.CHAT)} onClick={() => onTabChange(AppTab.CHAT)}>
        <MessageCircle size={24} strokeWidth={currentTab === AppTab.CHAT ? 2.5 : 2} />
        <span className="text-xs font-medium">Assistant</span>
      </button>
      <button className={getButtonClass(AppTab.STATUS)} onClick={() => onTabChange(AppTab.STATUS)}>
        <Search size={24} strokeWidth={currentTab === AppTab.STATUS ? 2.5 : 2} />
        <span className="text-xs font-medium">Status Check</span>
      </button>
      <button className={getButtonClass(AppTab.INFO)} onClick={() => onTabChange(AppTab.INFO)}>
        <Info size={24} strokeWidth={currentTab === AppTab.INFO ? 2.5 : 2} />
        <span className="text-xs font-medium">Guide</span>
      </button>
    </nav>
  );
};