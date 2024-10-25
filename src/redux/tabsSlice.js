import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    activeTab: 1,
    tabContent: {}, // Object to store content for each tab by ID
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTabContent: (state, action) => {
      const { tabId, content } = action.payload;
      state.tabContent[tabId] = content; // Cache content for each tab
    },
  },
});

export const { setActiveTab, setTabContent } = tabsSlice.actions;
export default tabsSlice.reducer;
