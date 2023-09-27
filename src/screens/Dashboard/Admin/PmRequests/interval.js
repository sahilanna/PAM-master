
import { useState, useEffect,  useRef } from 'react';
import api from '../../../../network/api'; // Import your API library here
import { ngrokUrl } from '../../../../network/config';
import { toast} from 'react-toastify'



function useApiData() {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const prevDataRef = useRef([]);


  const fetchData = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/request/allActive`);
      const newData = response.data;
      const newRequests = newData.filter(
        (newItem) => !prevDataRef.current.some((prevItem) => prevItem.accessRequestId === newItem.accessRequestId)
      );

    
      if (newRequests.length>0) {
      
        toast.info('Request from PM!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000,
        });
      }

      setData(newData);
      setLoading(false);
      prevDataRef.current = newData; 
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();

  
  }, []);

  return { data, Loading };
}

export default useApiData;