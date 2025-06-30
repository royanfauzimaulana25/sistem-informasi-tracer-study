// hooks/useApi.js
import React from 'react';

function useApi(apiFunction, ...args) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunction(...args);
        if (result.error) {
          setError(result.message || 'An error occurred');
        } else {
          setData(result.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunction, ...args]);

  return { loading, data, error };
}

export default useApi;