import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { deleteTask, getAllTask, getUserProfile } from '../Utility/Apiservices';
import toast from 'react-hot-toast';

const Task = () => {
  const [tasks, setTasks] = useState([]);
    const [profile, setProfile] = useState({});
  const navigate = useNavigate();
const ViewTask = async () => {
      let Tasksdata = await getAllTask();  
      if (!Tasksdata.ok) {
        return console.log(Tasksdata.message);      }
      setTasks(Tasksdata.data.tasks)  
    };

    const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    const result = await deleteTask(id);
    if (!result.ok) return alert(result.data?.message || "Delete failed");
    toast.success("Task deleted successfully");
    ViewTask(); 
  }
};
const loadProfile = async () => {
    const result = await getUserProfile();
    if (result.ok) {
        console.log(result.data.user);
        
      setProfile(result.data.user); 
    } else {
      console.log(result.data.message);
    }
  };
  
  useEffect(() => {
      ViewTask();
      loadProfile();
    }, []);  

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
    <MDBBtn
  color="primary"
  onClick={() => navigate('/dashboard')}
  size="sm"
  className="rounded-pill"
>
  <MDBIcon fas icon="arrow-left" className="me-2" />
  </MDBBtn>

  </div>
        <h3 className="text-primary fw-bold text-center w-100">Tasks Management</h3>
        {profile.isAdmin?<MDBBtn color="primary" rounded onClick={() => navigate('/Dashboard/createTask')}>
          <i className="fas fa-plus me-2"></i> Add Task
        </MDBBtn>:null}
      </div>

      <table className="table table-hover">
        <thead className="text-primary">
          <tr>
            <th>No</th>
            <th>Date & Time</th>
            <th>Task</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">No tasks found</td>
            </tr>
          )}
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>{task.Taskname}</td>
              <td>{task.Description}</td>
              <td>
  <MDBIcon
  fas
  icon="edit"
  className="text-info me-3"
  style={{ cursor: 'pointer' }}
  onClick={() =>
    navigate('/dashboard/createTask', {
      state: {
        task: {
          id: task._id,
          Taskname: task.Taskname,
          Description: task.Description,
        },
      },
    })
  }
/>

  <MDBIcon
    fas
    icon="trash"
    className="text-danger"
    style={{ cursor: 'pointer' }}
    onClick={() => handleDelete(task._id)}
  />
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
