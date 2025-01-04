// components/Tab.tsx
"use client"
import React, { useState } from 'react';

type TabProps = {
  tabs: string[];
  content: React.ReactNode[];
};

const Tab: React.FC<TabProps> = ({ tabs, content }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">{content[activeTab]}</div>
    </div>
  );
};

export default Tab;
