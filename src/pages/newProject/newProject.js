import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import useLocalStorage from '../../hooks/useLocalStorage';

import './newProject.css';

function NewProject() {

  const [storedValue, setValue] = useLocalStorage('project', []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    projectManager: '',
    assignedTo: '',
    status: 'Not Started',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formDataWithId = {
      ...formData,
      id: uuidv4(),
      creationDate: new Date(),
    };
    console.log(formDataWithId);
    setValue([...storedValue, formDataWithId]);
    setFormData({
      projectName: '',
      description: '',
      projectManager: '',
      assignedTo: '',
      status: '',
    });
  };

  console.log("storedValue", storedValue);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className='newProject-container'>
      {/* Línea separadora */}
      <hr />
      {/* Parte de abajo del navbar */}
      <div className="navbar-bottom">
        <div className="navbar-left">
          <Button variant="light" className="btn btn-ligth btn-sm custom-btn" onClick={handleBackClick}>
            <FaArrowLeft className="mr-2" /> Back
          </Button>
          <span className="projects-title">Add project</span>
        </div>
      </div>

      <div className="content-container">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form className="border p-4 new-project-form" onSubmit={onSubmit}>
              {/* Contenido del formulario */}

              <Form.Group controlId="projectName" >
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="projectManager">
                <Form.Label>Project Manager</Form.Label>
                <Form.Control
                  as="select"
                  name="projectManager"
                  value={formData.projectManager}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>Select a person</option>
                  <option>Manager 1</option>
                  <option>Manager 2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="assignedTo">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  as="select"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>Select a person</option>
                  <option>Person 1</option>
                  <option>Person 2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Form.Control>
              </Form.Group>

              <Button variant="danger" type="submit" className="create-btn">
                Create project
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default NewProject;