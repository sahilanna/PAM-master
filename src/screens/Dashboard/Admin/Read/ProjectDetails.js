import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Segment,
  Container,
  List,
  Tab,
} from "semantic-ui-react";
import DialogBox from "../../DialogBox/DialogBox";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../network/api";
import { ngrokUrl } from "../../../../network/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import CustomSidebar from "../../SideBar/SideBar";
import ProjectUsers from "./projectUsers";
import ProjectPms from "./projectPms";
import OtpModal from "./otpModal";

const ProjectDetails = ({
  project,
  onClose,
  showAddEmployeeButton,
  showAddFileButton,
  onAddFile,
}) => {
  const { projectId } = useParams();
  const { projectName } = useParams();
  const [showAddUserProject, setShowAddUserProject] = useState(false);
  const [driveData, setDriveData] = useState("");

  const [count, setCount] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addFile = async (projectId, projectName) => {
    navigate("/addFile", { state: { projectId, projectName } });
  };

  console.log(showAddUserProject);
  console.log(driveData);
  console.log(setCount);
  console.log(setDriveData);
  console.log(setShowAddUserProject);
  console.log(setOtp);
  const panes = [
    {
      menuItem: "Users",
      render: () => (
        <Tab.Pane>
          <ProjectUsers projectId={projectId} projectName={projectName} />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "PM",
      render: () => (
        <Tab.Pane>
          <ProjectPms projectId={projectId} projectName={projectName} />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "Help Documents",
      render: () => (
        <Tab.Pane>
          <div className="help-documents">
            <Button
              data-testid="add-file"
              color="blue"
              floated="left"
              onClick={() => addFile(projectId, projectName)}
            >
              Add File
            </Button>
            {namesFile.length > 0 ? (
              <ul className="file-list">
                {namesFile.map((filename) => (
                  <li key={filename.id} className="file-item">
                    <div className="file-info">
                      <a
                        href="#"
                        onClick={() => downloadFile(filename.fileName)}
                      >
                        {filename.fileName}
                      </a>
                    </div>
                    <div className="delete-button">
                      <button
                        data-testid="delete-file"
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteFile(filename.helpDocumentId)
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-files">No files available</div>
            )}
          </div>
        </Tab.Pane>
      ),
    },
  ];
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const [namesFile, setNamesFile] = useState([]);
  const [repo, setRepo] = useState([]);
  const [figmaLink, setFigmaLink] = useState([]);
  const [projectData, setProjectData] = useState([]);
  console.log(repo);
  const deleteProject = async (projectId) => {
    try {
      await api.delete(`https://${ngrokUrl}/projects/delete/${projectId}`);
      navigate("/adminDashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayFile();
  }, []);
  useEffect(() => {
    Details();
  }, []);
  const Details = async () => {
    try {
      const result = await api.get(
        `https://${ngrokUrl}/projects/${projectId}/details`,
        {}
      );
      setProjectData(result.data);
      console.log(projectData);
      console.log(count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/OTP/send`, {
        phoneNumber: "+91 9928931610",
      });
      console.log(otpResponse);
      if (otpResponse.data === "OTP sent") {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
      } else if (otpResponse.response === false) {
        console.log("OTP generation failed");
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
      const otpSubmissionResponse = await api.post(
        `https://${ngrokUrl}/OTP/verify`,
        {
          otp: otp,
        }
      );
      console.log(otpSubmissionResponse);
      if (otpSubmissionResponse.data === true) {
        await api.delete(`https://${ngrokUrl}/projects/delete/${projectId}`);
        setShowOTPMoal(false);
      } else if (!otpSubmissionResponse.data) {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const displayFile = async () => {
    try {
      const result = await api.get(
        `https://${ngrokUrl}/projects/files?projectId=${projectId}`
      );
      if (Array.isArray(result.data)) {
        setNamesFile(result.data);
        console.log(namesFile);
      } else {
        console.log("Invalid data format: ", result.data);
      }
    } catch (error) {
      console.log("Error retrieving files: ", error);
    }
  };

  const handleDeleteProject = () => {
    setShowConfirmDialog(true);
  };
  const confirmDeleteProject = () => {
    deleteProject(projectId);
    setShowConfirmDialog(false);
  };
  const cancelDeleteProject = () => {
    setShowConfirmDialog(false);
  };

  const downloadFile = async (filename) => {
    await api
      .get(
        `https://${ngrokUrl}/projects/files/${filename}?projectId=${projectId}`,
        {
          responseType: "blob",
          contentType: "application/zip",
        }
      )
      .then((result) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "file.data");
        document.body.appendChild(link);
        link.click();
        link.remove();
        navigate("/adminDashboard");
      })
      .catch((error) => {
        console.log(error, "hi");
      });
  };

  const handleDeleteFile = async (helpDocumentId) => {
    try {
      await api.delete(`https://${ngrokUrl}/projects/files/${helpDocumentId}`);
      // Remove the deleted file from the namesFile list
      setNamesFile((prevNamesFile) =>
        prevNamesFile.filter((file) => file.helpDocumentId !== helpDocumentId)
      );
    } catch (error) {
      console.log("Error deleting file: ", error);
    }
  };
  function formatDate(isoDate) {
    const dateObject = new Date(isoDate);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return dateObject.toLocaleString("en-US", options);
  }

  const loadRepo = async () => {
    try {
      const response = await api.get(
        `https://${ngrokUrl}/repositories/project/${projectId}`,
        {}
      );
      setRepo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRepo();
  }, []);
  const loadFigma = async () => {
    try {
      const response = await api.get(
        `https://${ngrokUrl}/figmas/project/${projectId}`,
        {}
      );
      setFigmaLink(response.data);
      console.log(figmaLink);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFigma();
  }, []);

  return (
    <>
      <div className="parent-admin">
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 auto", width: "250px" }}>
            <CustomSidebar />
          </div>
          <div>
            <Container>
              <Header as="h1" attached="top" block className="project-heading1">
                <div>{projectName}</div>
                <Button
                  data-testid="delete-project"
                  color="red"
                  onClick={handleDeleteProject}
                  className="delete-button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>

                <DialogBox
                  onClose={cancelDeleteProject}
                  onConfirm={confirmDeleteProject}
                  title="Delete Project"
                  afterConfirm={() => navigate("/AdminDashboard")}
                />
              </Header>
              <Segment attached className="left-aligned-segment">
                <List divided relaxed>
                  <List.Item key={projectId}>
                    <List.Content>
                      <List.Header>
                        Description:{" "}
                        <span className="description-value">
                          {projectData.projectDescription}
                        </span>
                      </List.Header>
                      <br />

                      <List.Header>
                        Project Manager:{" "}
                        <span className="description-value">
                          {projectData.pmName}{" "}
                        </span>
                      </List.Header>
                      <br />

                      <List.Header>
                        Repositories:{" "}
                        <span className="description-value">
                          {projectData.repositories &&
                          projectData.repositories.length > 0 ? (
                            projectData.repositories.map((repo) => (
                              <span key={repo.name}>
                                {repo.name}
                                {repo !==
                                projectData.repositories[
                                  projectData.repositories.length - 1
                                ]
                                  ? ", "
                                  : ""}
                              </span>
                            ))
                          ) : (
                            <span>N/A</span>
                          )}
                        </span>
                      </List.Header>
                      <br />

                      <List.Header>
                        Figma Link:{" "}
                        {projectData?.figma?.figmaURL ? (
                          <a
                            href={projectData.figma.figmaURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {projectData.figma.figmaURL}
                          </a>
                        ) : (
                          <span className="description-value">N/A</span>
                        )}
                      </List.Header>
                      <br />

                      <List.Header>
                        Drive Link:{" "}
                        {projectData?.googleDrive?.driveLink ? (
                          <a
                            href={projectData.googleDrive.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {projectData.googleDrive.driveLink}
                          </a>
                        ) : (
                          <span className="description-value">N/A</span>
                        )}
                      </List.Header>
                      <br />

                      <List.Header>
                        Created on :{" "}
                        <span className="description-value">
                          {formatDate(projectData.lastUpdated)}{" "}
                        </span>
                      </List.Header>
                      <br />
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>

              <Tab
                menu={{ fluid: true, horizontal: true, tabular: true }}
                panes={panes}
              />
            </Container>
          </div>
        </div>
        <DialogBox
          show={showConfirmDialog}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <OtpModal
          open={showOTPMoal}
          onClose={handleOTPClose}
          onSubmit={handleOTPSubmit}
          errorMessage={errorMessage}
        />
      </div>
    </>
  );
};
export default ProjectDetails;
