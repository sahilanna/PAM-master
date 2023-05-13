// import React, { useState } from 'react';
// import addPm from './addPm';
// import Create from './Create';

// const ParentComponent = () => {
//   const [formData, setFormData] = useState(null);
//   const [projectName, setProjectName] = useState('');

// //   const handleForm1Submit = (data) => {
// //     setFormData(data);
// //   };
// const handleSubmit = (name) => {
//     setProjectName(name);
//   };
  
//   return (
//     <div>
//       <h1>Form Example</h1>
//       {/* {!formData ? <Create onSubmit={handleForm1Submit} /> : <addPm formData={formData} />} */}
//       {!projectName ? (
//         <Create onSubmit={handleSubmit} />
//       ) : (
//         <addPm projectName={projectName} />
//       )}
//     </div>
//   );
// };

// export default ParentComponent;
