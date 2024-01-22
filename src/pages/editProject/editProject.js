import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

import useLocalStorage from '../../hooks/useLocalStorage';

import './editProject.css';

function EditProject() {
  const { id } = useParams();
  const [storedValue, setValue] = useLocalStorage('project', []);
  const navigate = useNavigate();

  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Elimina la inicialización de formData
  const [formData, setFormData] = useState({});

  // UseEffect para cargar los datos del proyecto al montar el componente
  useEffect(() => {
    // Buscar el proyecto con el ID correspondiente en el almacenamiento local
    const projectToEdit = storedValue.find(project => project.id === id);

    // Si se encuentra el proyecto, establecer los valores en el estado local
    if (projectToEdit) {
      setFormData({
        id: projectToEdit.id,
        projectName: projectToEdit.projectName,
        description: projectToEdit.description,
        projectManager: projectToEdit.projectManager,
        assignedTo: projectToEdit.assignedTo,
        status: projectToEdit.status,
      });
    } else {
      console.log(`Project with ID ${id} not found`);
    }
  }, [id, storedValue]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const editedValue = {
      ...formData,
      creationDate: new Date(),
    };

    // Verificar si hay un proyecto con el mismo ID en storedValue
    const index = storedValue.findIndex((project) => project.id === id);

    if (index !== -1) {
      const updatedProjects = [...storedValue];
      updatedProjects[index] = editedValue;
      setValue(updatedProjects);
      setShouldNavigate(true);
    } else {
      console.log(`Project with ID ${formData.id} not found`);
    }

    console.log('Submit the edited project:', editedValue);
  };

  useEffect(() => {
    if (shouldNavigate) {
      // Realizar la navegación después de actualizar el almacenamiento local
      navigate('/');
    }
  }, [shouldNavigate, navigate]);

  // Vrifica que formData tenga un valor antes de renderizar
  if (!formData) {
    return null;
  }
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
          <span className="projects-title">Edit project</span>
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
                Save changes
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default EditProject;