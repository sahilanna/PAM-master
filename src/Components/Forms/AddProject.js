import React from 'react';
import { Formik, Form, Field } from 'formik';
import './AddProject.css'



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

