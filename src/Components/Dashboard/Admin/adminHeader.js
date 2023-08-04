import React, { useState, useEffect } from 'react';
import { ngrokUrl } from '../../../Assets/config';
import api from '../api';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserAstronaut, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css'; 

function AdminHeader() {
  const [users, setUsers] = useState('');
  const [pms, setPms] = useState('');
  const [projects, setProjects] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/users/count/user`);
        setUsers(response.data);
        console.log('result', users);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPms = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/users/count/project_manager`);
        setPms(response.data);
        console.log('result', pms);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };
    fetchPms();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/projects/count/active`);
        setProjects(response.data);
        console.log('result', projects);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Grid columns={3} stackable>
      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <FontAwesomeIcon icon={faProjectDiagram} style={{ color: 'blue' }} />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='medium' style={{ color: 'blue', fontWeight: 'bold' }} />
              <span style={{ color: 'blue', fontWeight: 'bold' }}>Projects</span>
              <Placeholder.Line length='short' style={{ color: 'blue' }} />
              <span style={{ color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>{projects}</span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <FontAwesomeIcon icon={faUserAstronaut} style={{ color: 'green' }} />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='medium' style={{ color: 'green', fontWeight: 'bold' }} />
              <span style={{ color: 'green', fontWeight: 'bold' }}>Users</span>
              <Placeholder.Line length='short' style={{ color: 'green' }} />
              <span style={{ color: 'green', fontSize: '24px', fontWeight: 'bold' }}>{users}</span>
            </Placeholder.Paragraph>
          </div>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised className="project-managers-box"> 
          <div>
            <Placeholder.Header>
              <FontAwesomeIcon icon={faUserCircle} style={{ color: 'orange' }} />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <span style={{ color: 'orange', fontWeight: 'bold' }}>Project Managers</span>
              <Placeholder.Line style={{ color: 'orange' }} />
              <span style={{ color: 'orange', fontSize: '24px', fontWeight: 'bold' }}>{pms}</span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default AdminHeader;
