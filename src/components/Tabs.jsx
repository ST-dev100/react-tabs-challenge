import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, setTabContent } from '../redux/tabsSlice';
import { fetchTabContent } from '../redux/api';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'; // Import the SkeletonLoader component
import { tabs } from '../constants/tabsData'; // Import the tabs array from the new file

const Tabs = () => {
  const { activeTab, tabContent } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTabContent = useCallback(
    (tabId) => {
      fetchTabContent(tabId, dispatch, setTabContent, setIsLoading, setError);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!tabContent[activeTab]) {
      loadTabContent(activeTab);
    }
  }, [activeTab, tabContent, loadTabContent]);

  return (
    <div className="tab-container">
      {/* Tab headers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '100px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${(activeTab === tab.id || (tab.id === 0 && activeTab === tab.id + 1)) ? 'active' : ''}`}
            onClick={() => dispatch(setActiveTab(tab.id === 0 ? tab.id + 1 : tab.id))}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {isLoading ? (
          <SkeletonLoader /> // Use the SkeletonLoader component here
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p> // Display error message if error exists
        ) : (
          tabContent[activeTab] ? (
            <div>
              {/* Dynamic Title */}
              <h2>{`Title ${activeTab}`}</h2>
              {/* Dynamic Content */}
              <div dangerouslySetInnerHTML={{ __html: tabContent[activeTab] }} />
            </div>
          ) : (
            <p style={{ color: 'red' }}>Loading content...</p>
          )
        )}
      </div>
    </div>
  );
};

export default Tabs;
