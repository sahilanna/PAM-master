// import React, { useState, useEffect } from 'react';
// import { Form, Button, Dropdown } from 'semantic-ui-react';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';
// import FigmaCreate from './FigmaCreate';
// import { ngrokUrlSwe } from '../../../../Assets/config';

// function CreateFigmaDetails() {
//   const navigate = useNavigate()
//   let [projectName, setProjectName] = useState('');
//   const [figmaURL, setFigmaUrl] = useState('');
//   const [proj,setproj]=useState([])
//   let[item,setitem]=useState('')
//   const [figmaId, setFigmaId] = useState(null);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [isValidUrl, setIsValidUrl] = useState(true);

//   const validateEmail = (figmaURL) => {
//     try {
//       const parsedUrl = new URL(figmaURL);
//       return (
//         parsedUrl.hostname === 'www.figma.com' &&
//         parsedUrl.pathname.startsWith('/files/')
//       );
//     } catch (_) {
//       return false;
//     }

//   };

//   const handleUrlChange = (e) => {
//     const email = e.target.value;
//     setFigmaUrl(figmaURL);
//     setIsValidUrl(isValidUrl(figmaURL));
//   };


//   const handleProjChange = (event, { value }) => {
//     setitem(value);
//   };
//   useEffect(() => {
//     fetchProjects();
//   }, []);
  
// projectName=item;

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get(`https://${ngrokUrlSwe}/api/projects/allProjects`, {
//         headers: {
//           'ngrok-skip-browser-warning': 'true'
//         }
//       });
//       // setitem(response.data)
//      console.log(response.data)
//      const projectNames = response.data.map(project => project.projectName);
//      setproj(projectNames);
  
//     } catch (error) {
//       console.log('Error fetching Users:', error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`https://${ngrokUrlSwe}/api/figmas/create`, {
//          projectName,
//          figmaURL,
//       });
//       console.log('API Response:', response.data.id);
//       const figmaId=response.data.id;
//       setFigmaId(figmaId)
//       navigate('/figmaRead', { state: { figmaId } });
//       setProjectName('');
//       setFigmaUrl('');
      
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <div>
     
//       <div className='form-style'>
//       <h1>Project Form</h1>
//       <Form onSubmit={handleSubmit}>
//       <Form.Field>
//             <label style={{textAlign:'left'}}>Projects</label>
//             <Dropdown
//               placeholder="Select Project"
//               fluid
//               selection
//               options={proj.map((name, index) => ({
//                 key: index,
//                 text: name,
//                 value: name
//               }))}
//               value={item}
//                onChange={handleProjChange}
//             />
//             </Form.Field>
//         <Form.Field>
//           <label style={{textAlign:'left'}} >Figma URL</label>
//           <input
//           type='email'
//             placeholder="Enter Figma URL"
//             value={figmaURL}
//             onChange={handleUrlChange}
//             className={!isValidUrl ? 'error' : ''}
//           />
//             {!isValidUrl && handleSubmit && (
//           <p className="error-message">Invalid Figma URL</p>
//         )}
  
//         </Form.Field>
//         <Button primary type="submit" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Form>
//       </div>
//     </div>
//   );
// }

// export default CreateFigmaDetails;


import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import FigmaCreate from './FigmaCreate';
import { ngrokUrlSwe } from '../../../../Assets/config';

function CreateFigmaDetails() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [figmaURL, setFigmaUrl] = useState('');
  const [proj, setProj] = useState([]);
  const [item, setItem] = useState('');
  const [figmaId, setFigmaId] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === 'www.figma.com' &&
        parsedUrl.pathname.startsWith('/files/')
      );
    } catch (_) {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFigmaUrl(url);
    setIsValidUrl(validateURL(url));
  };

  const handleProjChange = (event, { value }) => {
    setItem(value);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://${ngrokUrlSwe}/api/projects/allProjects`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const projectNames = response.data.map((project) => project.projectName);
      setProj(projectNames);
    } catch (error) {
      console.log('Error fetching Projects:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://${ngrokUrlSwe}/api/figmas/create`, {
        projectName: item,
        figmaURL,
      });
      const figmaId = response.data.id;
      setFigmaId(figmaId);
      navigate('/figmaRead', { state: { figmaId } });
      setProjectName('');
      setFigmaUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <div className='form-style'>
        <h1>Project Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Projects</label>
            <Dropdown
              placeholder="Select Project"
              fluid
              selection
              options={proj.map((name, index) => ({
                key: index,
                text: name,
                value: name,
              }))}
              value={item}
              onChange={handleProjChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Figma URL</label>
            <input
              type='text'
              placeholder="Enter Figma URL"
              value={figmaURL}
              onChange={handleUrlChange}
              className={!isValidUrl ? 'error' : ''}
            />
            {!isValidUrl && (
              <p className="error-message">Invalid Figma URL</p>
            )}
          </Form.Field>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateFigmaDetails;
