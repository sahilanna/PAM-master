import React, { useState } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';

function AddFile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};

  const [modalfile, setModalFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState('');

  let dataa = sessionStorage.getItem('item');
  let user = JSON.parse(dataa);
  const accessToken = user.token;
  const headers = {
    AccessToken: accessToken,
    'Content-Type': 'application/zip',
  };

  const onClose = () => {
    navigate('/adminDashboard');
  };

  const handleModelFileSelect = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /\.(png|jpg|pdf)$/i; // Updated regular expression

    if (!allowedExtensions.test(file.name)) {
      setFileErrorMessage('Invalid file format. Only PNG, JPG, and PDF files are allowed.');
    } else {
      setModalFile(file);
      setFileErrorMessage('');
    }
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('projectFile', modalfile);

    const url = `https://${ngrokUrl}/api/projects/upload?projectId=${projectId}`;

    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log(response.data);
        resetFileInputs();
        navigate('/adminDashboard');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetFileInputs = () => {
    setModalFile(null);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}
    >
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project Name</label>
            <input name="name" placeholder={projectName} readOnly />
          </Form.Field>
          <Form.Field>
            <div>
              <label>Add Help document</label>
              <input className="text-center" type="file" onChange={handleModelFileSelect} />
              {modalfile && <div>{modalfile.name}</div>}
              {fileErrorMessage && <div style={{ color: 'red' }}>{fileErrorMessage}</div>}
            </div>
          </Form.Field>
          <Button type="submit" onClick={handleFileUpload}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default AddFile;






// import React, { useState } from 'react';
// import { Form, Modal, Button } from 'semantic-ui-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
//  import { ngrokUrl } from '../../../../Assets/config'; // Import the correct ngrokUrl or provide the value directly
// function AddFile() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId } = location.state || {};
//   const { projectName } = location.state || {};
//   const [modalfile, setModalFile] = useState('');
//   let dataa = sessionStorage.getItem('item');
//   let user = JSON.parse(dataa);
//   const accessToken = user.token;
//   const headers = {
//     AccessToken: accessToken,
//     'Content-Type': 'application/zip',
//   };
//   const onClose = () => {
//     navigate('/adminDashboard');
//   };
//   // const handleModelFileSelect = (e) => {
//   //   const filee = e.target.files[0];
//   //   setModalFile(filee);
//   //   console.log('hi', modalfile);
//   // };

//   const handleModelFileSelect = (e) => {
//     const file = e.target.files[0];
//     const allowedExtensions = /(\.png|\.jpg|\.pdf)$/i; // Regex pattern for allowed extensions
//     const fileExtension = file.name.split('.').pop(); // Extract the file extension
//     if (!allowedExtensions.test(fileExtension)) {
//       // File extension is not allowed
//       console.log('Invalid file format. Only PNG, JPG, and PDF files are allowed.');
//       return;
//     }
//     setModalFile(file);
//   };


//   const data = new FormData();
//   if (modalfile) {
//     data.append('projectFile', modalfile);
//     console.log('hiiii', data);
//   }
//   const handleFileUpload = () => {
//     const url = `https://${ngrokUrl}/api/projects/upload?projectId=${projectId}`;
//     axios
//       .post(url, data, { headers })
//       .then((response) => {
//         console.log(response.data);
//         resetFileInputs();
//         navigate('/adminDashboard');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//   const resetFileInputs = () => {
//     setModalFile(null);
//   };
//   return (
//     <Modal
//       open={true}
//       onClose={onClose}
//       style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}
//     >
//       <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
//       <div style={{ paddingLeft: '442px' }}>
//         <Button secondary onClick={onClose}>
//           X
//         </Button>
//       </div>
//       <Modal.Content>
//         <Form>
//           <Form.Field>
//             <label style={{ textAlign: 'left' }}>Project Name</label>
//             <input name="name" placeholder={projectName} readOnly />
//           </Form.Field>
//           <Form.Field>
//             <div>
//               <label>Add Help document</label>
//               <input className="text-center" type="file" onChange={handleModelFileSelect} />
//               {modalfile && <div>{modalfile.name}</div>}
//             </div>
//           </Form.Field>
//           <Button type="submit" onClick={handleFileUpload}>
//             Submit
//           </Button>
//         </Form>
//       </Modal.Content>
//       <Modal.Actions></Modal.Actions>
//     </Modal>
//   );
// }
// export default AddFile;




// import React, {useState} from 'react'
// import { Form, Modal,Button } from 'semantic-ui-react'
// import {useNavigate, useLocation } from 'react-router-dom'
// import axios from 'axios';
// import { ngrokUrlSwe, ngrokUrl } from '../../../../Assets/config';

// import api from '../../api';
// function AddFile() {
//     const navigate = useNavigate();
//     const { state } = useNavigate();
//     const location = useLocation();
//     const { projectId } = location.state || {};
//     const {projectName}= location.state|| {};
//     const[modalfile,setmodalFile]=useState('')
//     let dataa = sessionStorage.getItem("item");
//     let user = JSON.parse(dataa);
//     const accessToken=user.token
//     const headers={
//       AccessToken:accessToken,
//       contentType: "application/zip"
//     }
//     const onClose = () => {
//       navigate('/adminDashboard');
//     };
//     const handleModelFileSelect = (e) => {
//       const filee = e.target.files[0];
//       //console.log(filee)
//       setmodalFile(filee);
//       //console.log('hi',modalfile)
//     };
//     const data = new FormData();
//     if (modalfile) {
//       data.append('projectFile', modalfile);
//       // console.log(modalfile)
//       console.log('hiiii',data)
//     }
//     const handleFileUpload = () => {
//      const url = `http://${ngrokUrl}/api/projects/upload?projectId=${projectId}`;
//      axios.post(url,data,projectId,{headers})
//      .then((response) => {
//        console.log(response.data);
//        resetFileInputs();
//      })
//      .catch((error) => {
//        console.error(error);
//      });
//     }
//     const resetFileInputs = () => {
//       setmodalFile(null);
//     };
//     return (
//       <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
//         <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
//         <div style={{ paddingLeft: '442px' }}>
//           <Button secondary onClick={onClose}>
//             X
//           </Button>
//         </div>
//         <Modal.Content>
//           <Form >
//             <Form.Field>
//               <label style={{ textAlign: 'left' }}>Project Name</label>
//               <input name='name' placeholder={projectName} readOnly />
//             </Form.Field>
//             <Form.Field>
//             <div>
//               <label>Add Help document</label>
//               <input className='text-center' type="file" onChange={handleModelFileSelect} />
//               {File && <div>{File.name}</div>}
//             </div>
//             </Form.Field>
//             <Button type='submit' onClick={handleFileUpload}>Submit</Button>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions></Modal.Actions>
//       </Modal>
//     );
//   }
//   export default AddFile