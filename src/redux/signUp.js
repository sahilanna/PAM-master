import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { ngrokUrl } from '../Assets/config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
      const response = await axios.post(`https://${ngrokUrl}/api/v1/auth/register`, {
        name,
        email,
        password,
        role
      });
      console.log(response.data);
      console.log(response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.token));

      
      console.log('success')
     
      const token=response.data;
      console.log(token)
      navigate('/PmReadNew')

    } catch (error) {
        
      
      console.log(error);
    }
  };

  return (
    <div style={{backgroundColor:'beige'}}>
    <div className="signup-container">
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            
          </select>
        </Form.Field>
        <Button type="submit" onClick={handleSubmit}>Signup</Button>
      </Form>
    </div>
    </div>
  );
};

export default Signup;
