// Tabs.js
import React from 'react';
import TabContent from './TabContent';
import TabItem from './TabItem';
import useEnum from '~/hooks/useEnum';

const Tabs = ({ children }) => {
  const tabData = React.Children.toArray(children).map((child) => {
    return { title: child.props.title, content: child.props.children };
  });

  const tabTitles = tabData.map((tab) => tab.title);
  const [activeTab, setActiveTab] = useEnum(tabTitles, 'settings');

  return (
    <div className="h-full">
      <div>
        {tabData.map(({ title }) => (
          <TabItem
            key={title}
            title={title}
            isActive={activeTab === title}
            onClick={setActiveTab[title]}
          >
            <div className="text-slate-300 py-2 px-4">
              {title}
            </div>
          </TabItem>
        ))}
      </div>
      {tabData.map(({ title, content }) => (
        <TabContent key={title} isActive={activeTab === title}>
          {content}
        </TabContent>
      ))}
    </div>
  );
};

Tabs.TabItem = TabItem;

export default Tabs;
