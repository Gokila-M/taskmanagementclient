
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { toast, Toaster } from 'react-hot-toast';
import { createTask, updateTask } from '../Utility/Apiservices';

const CreateTask = () => {
  const location = useLocation();
  const taskData = location.state?.task;

  const [Taskname, setTaskname] = useState(taskData?.Taskname || '');
  const [Description, setDescription] = useState(taskData?.Description || '');
  const taskId = taskData?.id;

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!Taskname.trim() || !Description.trim()) {
      return toast.error("All fields are required");
    }

    const body = { Taskname, Description };

    let result;
    if (taskId) {
      result = await updateTask(taskId, body); 
    } else {
      result = await createTask(body); 
    }

    if (!result.ok) return toast.error(result.message || "Error");

    toast.success(taskId ? "Task updated successfully" : "Task created successfully");
    navigate("/dashboard/tasks");
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh', background: '#f0f0f0' }}
    >
      <MDBRow className="w-100 justify-content-center">
        <MDBCol md="6" lg="5" xl="4">
          <div
            className="bg-white p-5 shadow rounded"
            style={{
              borderRadius: '12px',
              textAlign: 'center',
              minWidth: '320px'
            }}
          >
            <h4 className="fw-bold mb-4">
              {taskId ? 'Update Task' : 'Add Task'}
            </h4>

            <MDBInput
  label="Enter Task Name"
  type="text"
  className="mb-3 bg-light"
  value={Taskname}
  onChange={(e) => setTaskname(e.target.value)}
/>
            <MDBInput
              label="Enter Description"
              type="textarea"
              className="mb-3 bg-light"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MDBBtn
              onClick={handleSubmit}
              color="primary"
              style={{ borderRadius: '25px', width: '120px' }}
            >
              Save
            </MDBBtn>
            <p
              className="mt-3 text-muted"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/dashboard/tasks')}
            >
              Cancel
            </p>
          </div>
        </MDBCol>
      </MDBRow>
      <Toaster />
    </MDBContainer>
  );
};

export default CreateTask;

