import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';

const ProjectAnalytics = () => {
  const [activeProjects, setActiveProjects] = useState(0);
  const [inactiveProjects, setInactiveProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/active`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const inactiveResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/inactive`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setActiveProjects(activeResponse.data);
        setInactiveProjects(inactiveResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  if (error) {
    return <div>{error}</div>;
  }

  const data = [
    { status: 'Active', ActiveProjects: activeProjects },
    { status: 'Inactive', InactiveProjects: inactiveProjects },
  ];
  return (
    <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        {/* <Sidebar/> */}
      </div>
      <div style={{ textAlign: 'center' }}>
        <br/>
        <h2>Project Status</h2>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ActiveProjects" fill="#8884d8" />
          <Bar dataKey="InactiveProjects" fill="#82ca9d" />
        </BarChart>
      </div>
      
    </div>
  );
};

export default ProjectAnalytics;









// Bindu's code
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Cell } from 'recharts';
// import { ngrokUrl } from '../../../../Assets/config';
// import Sidebar from '../../SideBar/SideBar';

// const ProjectAnalytics = () => {
//   const [activeProjects, setActiveProjects] = useState(0);
//   const [inactiveProjects, setInactiveProjects] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const[fdata,setFdata]=useState()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const activeResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/active`, {
//           headers: {
//             'ngrok-skip-browser-warning': 'true'
//           }
//         });
//         const inactiveResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/inactive`, {
//           headers: {
//             'ngrok-skip-browser-warning': 'true'
//           }
//         });
//         setActiveProjects(activeResponse.data.count);
//         setInactiveProjects(inactiveResponse.data.count);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }
//   const COLORS = ['#FFBB28', '#FF8042']; 

//   setFdata([
//     { status: 'Active', activeCount: activeProjects },
//     { status: 'Inactive', inactiveCount: inactiveProjects },
// ]);
 

//   return (
//     <div className='parent-admin'>
//       <div style={{ height: '100vh', overflow: 'scroll initial' }}>
//         <Sidebar/>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <BarChart width={500} height={300} data={fdata}>
//           <CartesianGrid strokeDasharray="3 3" />
//           {fdata.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//           <XAxis dataKey="status" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="activeCount" fill="#8884d8" />
//           <Bar dataKey="inactiveCount" fill="#82ca9d" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { ngrokUrl } from '../../../../Assets/config';
// import Sidebar from '../../SideBar/SideBar';

// const ProjectAnalytics = () => {
//   const [activeProjects, setActiveProjects] = useState(0);
//   const [inactiveProjects, setInactiveProjects] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const activeResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/active`,{
//             headers: {
//               'ngrok-skip-browser-warning': 'true'
//             }});
//         const inactiveResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/inactive`,{
//             headers: {
//               'ngrok-skip-browser-warning': 'true'
//             }});
//         setActiveProjects(activeResponse.data.count);
//         setInactiveProjects(inactiveResponse.data.count);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const data = [
//     { status: 'Active', count: activeProjects },
//     { status: 'Inactive', count: inactiveProjects },
//   ];

//   return (
//     <div className='parent-admin'>
        
//     <div style={{ height: '100vh', overflow: 'scroll initial' }}>
//       <Sidebar/>
//         </div>
        
//     <div style={{align: "center"}}> 

//     <BarChart width={500} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="status" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="count" fill="#8884d8" />
//     </BarChart>
//     </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;
