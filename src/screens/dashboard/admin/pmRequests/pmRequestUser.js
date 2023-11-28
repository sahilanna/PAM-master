import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../sidebar/adminSidebar/adminSidebar";
import { NGROK_URL } from "../../../../network/config";
import api from "../../../../network/api";
import "../figma/figmaRead/figmaRead.css";
import logger from "../../../../utils/logger.js";

function PmRequestUser() {
  const [requestData, setRequestData] = useState([]);
  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;
  const accessToken = user ? user.token : null;

  const headers = { AccessToken: accessToken };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/request/allActive`);
      setRequestData(response.data);

      logger.info("Chekcing requestData of active", requestData);
      requestData.forEach((request) => {
        const projectId = request.project.projectId;

        logger.info("Checking ProjectId: ", projectId);
      });
    } catch (error) {
      logger.error("Error fetching Users:", error);
    }
  };

  const AcceptRequest = async (accessRequestId, id, projectId) => {
    try {
      const response = await api.put(
        `https://${NGROK_URL}/request/update/${accessRequestId}`,
        { allowed: true },
        { headers }
      );

      if (response.status === 200 || response.status === 204 || response.status === 201) {
        const secondResponse = await api.put(
          `https://${NGROK_URL}/projects/${projectId}/users/${id}`
        );

        if (
          secondResponse.status === 200 ||
          secondResponse.status === 204 ||
          secondResponse.status === 201
        ) {
          toast.success("User added successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });

          fetchData();
        } else {
          toast.error("Failed to add user. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Failed to update request. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      logger.error("Error updating request:", error);
      toast.error("Failed to update request. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const DeclineRequest = async (accessRequestId) => {
    try {
      const response = await api.put(
        `https://${NGROK_URL}/request/update/${accessRequestId}`,
        { allowed: false },
        { headers }
      );
      if (response.status === 200 || response.status === 204) {
        toast.error("Access denied", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        fetchData();
      }
    } catch (error) {
      logger.error("Error adding user:", error);
    }
  };

  return (
    <div className="admin-screen">
      <AdminSidebar />
      <div className="admin-child-screen">
        <div className="admin-read">
          {requestData.length > 0 ? (
            <Table className="ui-celled-table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Project Manager</Table.HeaderCell>
                  <Table.HeaderCell>Project</Table.HeaderCell>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {requestData.map((item) => (
                  <Table.Row key={item.accessRequestId}>
                    <Table.Cell>{item.pmName}</Table.Cell>
                    <Table.Cell>{item.project?.projectName}</Table.Cell>
                    <Table.Cell>{item.user?.name}</Table.Cell>
                    <Table.Cell>{item.requestDescription}</Table.Cell>
                    <Table.Cell>
                      <Button
                        data-testid="green"
                        color="green"
                        onClick={() =>
                          AcceptRequest(item.accessRequestId, item.user.id, item.project.projectId)
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        data-testid="red"
                        color="red"
                        onClick={() => DeclineRequest(item.accessRequestId)}
                      >
                        Decline
                      </Button>
                      <ToastContainer />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <h2>No requests right now!</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default PmRequestUser;
