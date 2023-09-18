import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../SideBar/SideBar';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DialogBox from '../../DialogBox/DialogBox';
import Pagination from '../../Pagination/Pagination';
import { Button, Modal, Form } from 'semantic-ui-react';
import '../Figma/FigmaRead.css'


function RepoRead(onClose) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const itemsPerPage = 4;
  let data = sessionStorage.getItem('item');
  let user = JSON.parse(data);
  console.log(user);
  console.log(user.token);
  useEffect(() => {
    loadItem();
  }, []);
  useEffect(() => {
    handlePaginate(1);
  }, [item]);
  const loadItem = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/repositories/get`);
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setCurrentPageData(filteredProjects.slice(0, itemsPerPage));
  };
  const createOnclick = () => {
    navigate('/CreateRepo');
  };
  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate('/Create');
  };
  const toggleDrawer1 = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate('/AddPm');
  };
  const deleteUser = async (repoId) => {
    setSelectedRepoId(repoId);
    console.log(selectedRepoId);
    setShowConfirmDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/OTP/send`, {
        phoneNumber: '+91 9928931610',
      });
      console.log(otpResponse);
      if (otpResponse.data === 'OTP sent') {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
        setErrorMessage('')
      } else if (otpResponse.response === false) {
        console.log('OTP generation failed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/OTP/verify`, {
        otp: otp,
      });
      console.log(otpSubmissionResponse);
      if (otpSubmissionResponse.data === true) {
        await api.delete(`https://${ngrokUrl}/repositories/delete/${selectedRepoId}`);
        setShowOTPMoal(false);
        loadItem();
      } else if (!otpSubmissionResponse.data) {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log('error',error.response.data)
      if(error.response.data==='Error' || error.status==500){
        setErrorMessage('There are collaborators in this repo. Remove them to delete this repo')
      }
      else{
        setErrorMessage('')
      }
    }
  };
  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };
 
  return (
    <div className='parent-admin'>
      <Sidebar />
      <div className='admin-child'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginBottom: '30px',
            marginLeft: '40px',
            marginRight: '30px',
          }}
        >
          <div className='ui left icon input'>
            <input
              type='text'
              placeholder='Search Repo...'
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className='users icon'></i>
          </div>
          <div>
            <button className='ui button' onClick={createOnclick}>
              Create Repository
            </button>
            <button className='ui button' onClick={toggleDrawer}>
              Add Project Git
            </button>
            <button className='ui button' onClick={toggleDrawer1}>
              Add Collaborators
            </button>
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className='ui celled table'>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Repo Name</th>
                    <th>Repo Description</th>
                    <th className='text-center'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.length === 0 ? (
                    <tr>
                      <td colSpan='4'>No data available</td>
                    </tr>
                  ) : (
                    currentPageData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className='text-center'>
                          <button
                            className='btn btn-danger mx-2'
                            onClick={() => deleteUser(item.repoId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <DialogBox
    show={showConfirmDialog}
    onClose={handleCancelDelete}
    onConfirm={handleConfirmDelete}
    
  />
  <Modal
    open={showOTPMoal}
    onClose={handleOTPClose}
    style={{ width: '500px', height:'300px' }}
    className="centered-modal-OTP"
  >
    <Modal.Header>Enter OTP</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleOTPSubmit}>
        <div className="form-field">
          <label>OTP sent to '+91 9928931610'</label>
          <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
        </div>
        <p>{errorMessage}</p>
        <Button type="submit" primary>
          Submit OTP
        </Button>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={handleOTPClose}>Cancel</Button>
    </Modal.Actions>
  </Modal>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className='pagination' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination data={filteredProjects} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default RepoRead;