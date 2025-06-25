import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { toast, Toaster } from 'react-hot-toast';
import { createTask, updateTask } from '../Utility/Apiservices';
import { useLocation } from 'react-router-dom';

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
  result = await updateTask(taskId, body); // update
} else {
  result = await createTask(body); // create
}

  if (!result.ok) return toast.error(result.message || "Error");

  toast.success(id ? "Task updated successfully" : "Task created successfully");
  navigate("/dashboard/tasks");
};



  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <MDBRow className="w-100 justify-content-center">
        <MDBCol md="6" lg="5" xl="4">
          <div className="bg-white p-4 shadow rounded">
            {taskId?<h4 className="text-center text-primary fw-bold mb-4">Update Task</h4>:<h4 className="text-center text-primary fw-bold mb-4">New Tak Create</h4>}
            <MDBInput
              wrapperClass="mb-3"
              label="Task Name"
              type="text"
              size="lg"
              value={Taskname}
              onChange={(e) => setTaskname(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Description"
              textarea
              rows={4}
              size="lg"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex justify-content-between">
             <MDBBtn color="secondary" size="lg" onClick={() => navigate('/dashboard/tasks')}>
              Cancel
            </MDBBtn>
            <MDBBtn color="success" size="lg" onClick={handleSubmit}>
              Submit
            </MDBBtn>
    </div>
          </div>
        </MDBCol>
      </MDBRow>
      <Toaster />
    </MDBContainer>
  );
};

export default CreateTask;
