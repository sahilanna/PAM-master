
// import React from 'react';
// import { useState } from 'react';
// import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';


// const FigmaCreate = ({ onOpen, onClose }) => {
//     const [url, setUrl] = useState('');
//   const [selectedUser, setSelectedUser] = useState('');
//   const [image, setImage] = useState(null);
  
//   const userList = [
//     { id: 1, name: 'User 1' },
//     { id: 2, name: 'User 2' },
//     { id: 3, name: 'User 3' },
//   ];
//   const handleUrlChange = (e) => {
//     setUrl(e.target.value);
//   };

//   const handleUserChange = (e, { value }) => {
//     setSelectedUser(value);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

  
//     setUrl('');
//     setSelectedUser('');
//     setImage(null);
//     onClose();
//   };


//   return (
//     <Modal onClose={onClose}>
//     <Modal.Header>Project Details</Modal.Header>
//     <Modal.Content>
//       <Form onSubmit={handleSubmit}>
//         <Form.Field>
//           <label>URL</label>
//           <input
//             type="text"
//             placeholder="Enter URL"
//             value={url}
//             onChange={handleUrlChange}
//           />
//         </Form.Field>
//         <Form.Field>
//           <label>User</label>
//           <Dropdown
//             placeholder="Select User"
//             fluid
//             selection
//             options={userList.map(user => ({
//               key: user.id,
//               text: user.name,
//               value: user.id
//             }))}
//             value={selectedUser}
//             onChange={handleUserChange}
//           />
//         </Form.Field>
//         <Form.Field>
//           <label>Image</label>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </Form.Field>
//         <Button type="submit">Submit</Button>
//       </Form>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button secondary onClick={onClose}>
//         Close
//       </Button>
//     </Modal.Actions>
//   </Modal>
//   );
// };

// export default FigmaCreate;

import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';

const FigmaCreate = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [image, setImage] = useState(null);

  const userList = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUserChange = (e, { value }) => {
    setSelectedUser(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here

    setUrl('');
    setSelectedUser('');
    setImage(null);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Modal.Header>Add Project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>URL</label>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
            />
          </Form.Field>
          <Form.Field>
            <label>User</label>
            <Dropdown
              placeholder="Select User"
              fluid
              selection
              options={userList.map((user) => ({
                key: user.id,
                text: user.name,
                value: user.id,
              }))}
              value={selectedUser}
              onChange={handleUserChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FigmaCreate;


