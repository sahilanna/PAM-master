import React from 'react';

function DriveReadUI() {
  return (
    <div className='parent-admin'>
        <Sidebar/>
        <div className='admin-child'>
          <br/>
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
            <div className="ui left icon input">
              <input type="text" placeholder="Search Project" value={searchQuery} onChange={handleSearchChange} />
              <i className="users icon"></i>
            </div>
            <button className="ui button" onClick={createDrive}>
              Create Drive
            </button>
          </div>
          <div style={{ marginLeft: '20px', marginRight: '30px' }}>
    {isLoading ? (
      <LoadingPage />
    ) : (
      <>
        {filteredProjects.length === 0 ? (
          <p>No data available</p>
        ) : (
          <>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Project Name</th>
                  <th>Drive Link</th>
                  <th className="text-center">Delete Drive</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((project, index) => (
                  <tr key={project.driveId}>
                    <td>{index + 1}</td>
                    <td>{project.projectDTO.projectName}</td>
                    <td>
                      <a href={project.driveLink} target="_blank" rel="noopener noreferrer">
                        {project.driveLink}
                      </a>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-danger mx-2" onClick={() => setShowConfirmDialog(project.driveId)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <DialogBox
                        show={showConfirmDialog === project.driveId}
                        onClose={() => setShowConfirmDialog(null)}
                        onConfirm={() => handleDeleteUrl(project.driveId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='pagination' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
            </div>
          </>
        )}
      </>
    )}
  </div>
        </div>
        <div className='model-container'>
          <div className="modal-content-container">
            {showModal && <CreateDriveDetails onClose={closeModal} driveURL={driveURL} driveId={driveId} projectId={projectId} />}
          </div>
        </div>
      </div>
    );
  
}

export default DriveReadUI;
