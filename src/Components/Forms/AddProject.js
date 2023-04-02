import React from 'react';
import { MultiSelect } from "react-multi-select-component";
import { Formik, Form, Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import { useEffect } from 'react';
import './AddProject.css'
import { useState } from 'react';
import FormikControl from './FormikControl';

const AddProject = () => {
  return (
    <div>
      <h1>File Upload Form</h1>
      <Formik
        initialValues={{ file: null }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <Field name="file">
              {({ field }) => (
                <div>
                  <label htmlFor="file">Choose a file:</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </Field>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;

// const validationSchema = Yup.object().shape({
//   ProjectName: Yup.string().required('*Required'),
//   ProjectId: Yup.string().required('*Required'),
//   ProjectDescription: Yup.string().required('*Required'),
//   HelpDocuments: Yup.string().required('*Required'),
//   AddPM: Yup.string().required("*Required"),
//   AddUser: Yup.string().required("*Required"),
// });


// const initialValues = {
//   ProjectName: '',
//   ProjectId: '',
//   ProjectDescription: '',
//   HelpDocuments:'',
//   AddPM: '',
//   AddUser: '',
// };

// const options = [
//     { label: "Github", value: "github" },
//     { label: "Figma", value: "figma" },
//     { label: "Slack", value: "slack",},
//   ];

// const dropdownPM = [
//     {label: 'Sachin', value: 'Sachin'},
//     {label: 'Bindu', value: 'Bindu'},
//     {label: 'Sahil', value: 'Sahil'},
//   ];
  
  
// const dropdownUser = [
//     {label: 'Hassain', value: 'Uer'},
//     {label: 'Sweda', value: 'Ur'},
//     {label: 'BBN', value: 'U'},
//   ];


// const AddProject = () => {
//     const [selected, setSelected] = useState([]);
//   const onSubmit = (values, { setSubmitting }) => {
//     console.log(values);
//     setSubmitting(false);

//   };
//   const [sel, setSel] = useState([]);
//   const onSubm = (values1, { setSubm }) => {
//     console.log(values1);
//     setSubm(false);
//   };

//   const [sele, setSele] = useState([]);
//   const onSub = (values2, { setSub }) => {
//     console.log(values2);
//     setSub(false);
//   };


//   return (
//     <div className = "form-control"> 
//       <h2>Add Project Form</h2>
//       <br/>      
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}   
//       >

//      { 
//         ({ isSubmitting }) => (
          
//           <Form>

//             <label>Project Name : </label>
//             <Field type="text" name="ProjectName" placeholder="ProjectName" />
//             <ErrorMessage name="ProjectName" component="div" />
//             <br/>
//             <br/>
  

//             <label>Project ID :</label>
//             <Field type="text" name="ProjectId" placeholder="ProjectId" />
//             <ErrorMessage name="ProjectId" component="div" />
//             <br/>
//             <br/>
          

//             <label>Project Description : </label>
//             <Field type="text" name="ProjectDescription" placeholder="ProjectDescription" />
//             <ErrorMessage name="ProjectDescription" component="div" />
//             <br/>
//             <br/>
        

//             <label>Select Tools</label>
//             {/* <pre>{JSON.stringify(selected)}</pre>  */}
             
//               <MultiSelect
//                 options={options}
//                 value={selected}
//                 onChange={setSelected}
//                 labelledBy="Select"
//               />
//             <br/>
//             <br/> 

//             <label>Select PM</label>
//             <MultiSelect
//                 options={dropdownPM}
//                 value={sel}
//                 onChange={setSel}
//                 labelledBy="Select"
//               />
//               <br/>
//               <br/>

//             <label>Select Users</label>
//             <MultiSelect
//                 options={dropdownUser}
//                 value={sele}
//                 onChange={setSele}
//                 labelledBy="Select"
//               />
//               <br/>

//             <label>Help Documents : </label> 
//             <Field type="file" name="HelpDocuments" placeholder="HelpDocuments" />
//             <ErrorMessage name="HelpDocuments" component="div" />
//             <br/>
//             <br/>
//             {/* const [selected, setSelected] = useState([]);  */}

//              <button type="submit" enabled={isSubmitting}>
//               Submit
//             </button>
//           </Form> 
//          )}
//       </Formik>       </div>
//   );
// };

// export default AddProject;

