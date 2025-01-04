// pages/index.tsx

 'use client'
import React from 'react';
import Tab from '@components/tabs';
import ArticleView from '@app/components/ArticleView';

const Home: React.FC = () => {
  const tabs = ['Tab 1', 'Write', 'Tab 3'];
  const content = [
    <div key="2">Content for Tab 1</div>,
    <div key="3"><ArticleView></ArticleView></div>,
    <div key="1">Content for Tab 2</div>,

  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tab Component Example</h1>
      <Tab tabs={tabs} content={content} />
    </div>
  );
};

export default Home;
