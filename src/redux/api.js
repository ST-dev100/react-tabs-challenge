import axios from 'axios';

// API function to fetch tab content
export const fetchTabContent = async (tabId, dispatch, setTabContent, setIsLoading, setError) => {
  try {
    setIsLoading(true);
    setError(null);
    // Use Axios to fetch data
    const timestamp = new Date().getTime();
    const response = await axios.get(
      `https://thingproxy.freeboard.io/fetch/https://loripsum.net/api/1/long/?tabId=${tabId}&t=${timestamp}`,
      { responseType: 'text' } // Set response type to text
    );
    // Dispatch the content to Redux store
    dispatch(setTabContent({ tabId, content: response.data }));
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    setError('Error fetching tab content');
  }
};
