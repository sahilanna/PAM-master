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


function RepoRead() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
      const response = await api.get(`https://${ngrokUrl}/api/repositories/get`);
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
    setSearchQuery(e.target.value);
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
    try {
      await api.delete(`https://${ngrokUrl}/api/repositories/${repoId}`);
      setShowConfirmDialog(false);
      loadItem();
    } catch (error) {
      console.log(error);
    }
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
                            onClick={() => setShowConfirmDialog(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <DialogBox
                            show={showConfirmDialog === item.id}
                            onClose={() => setShowConfirmDialog(null)}
                            onConfirm={() => deleteUser(item.repoId)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className='pagination'>
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