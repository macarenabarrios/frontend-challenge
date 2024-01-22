import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Row, Col, Dropdown, Modal, Button } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { format } from 'date-fns';

import useLocalStorage from '../../hooks/useLocalStorage';
import thumbnailImage from '../../assets/images/avatar.webp';

import './home.css';

function Home() {
  const [storedValue, setValue] = useLocalStorage('project', []);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/create');
  };

  // Menu open
  const [menuOpen, setMenuOpen] = useState(Array(storedValue.length).fill(false));

  const handleToggleMenu = (index) => {
    setMenuOpen((prev) => {
      const newState = prev.map((value, i) => (i === index ? !value : false));
      return newState;
    });
  };

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/edit/${id}`);
  };

  // Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleShowDeleteModal = (id) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleDelete = (id) => {
    handleShowDeleteModal(id);
  };

  const confirmDelete = () => {
    console.log('Deleting project ID:', projectToDelete);
    const updatedProjects = storedValue.filter((project) => project.id !== projectToDelete);
    setValue(updatedProjects);
    handleCloseDeleteModal();
  };

  // Search
  const filteredProjects = storedValue.filter((project) => {
    const projectName = project.projectName && project.projectName.trim().toLowerCase();
    const searchTermLower = searchTerm.toLowerCase().trim();
    return projectName && (projectName.includes(searchTermLower) || projectName === searchTermLower);
  });

  return (
    <div className="home-container">
      {/* Línea separadora */}
      <hr />
      {/* Parte de abajo del navbar */}
      <div className="navbar-bottom">
        <div className="navbar-left">
          <span className="projects-title">My Projects</span>
        </div>
        <div className="navbar-right">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-danger btn-sm btn-sm-responsive" onClick={handleBackClick}><span>+ Add project</span></button>
        </div>
      </div>
      {/* Contenedor para centrar el contenido */}
      <Container>
        <Row>
          {/* Columna para pantallas medianas y grandes */}
          <Col md={12} lg={12} className="d-none d-md-block">
            <Table bordered className="centered-table">
              <thead>
                <tr>
                  <th>Project Info</th>
                  <th>Project Manager</th>
                  <th>Assigned to</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {searchTerm
                  ? filteredProjects.map((value, index) => (
                    <tr key={index}>
                      <td >
                        <div className="project-info">
                          <span className="name">{value.projectName}</span>
                          <p className="date">Creation date: {format(new Date(value.creationDate), 'dd/MM/yyyy HH:mm a')}</p>
                        </div>
                      </td>
                      <td>
                        <div className='info-container'>
                          <img
                            src={thumbnailImage} alt="Assigned To" className="thumbnail" />
                          {value.projectManager}
                        </div>
                      </td>
                      <td>
                        <div className='info-container'>
                          <img src={thumbnailImage} alt="Assigned To" className="thumbnail" />
                          {value.assignedTo}
                        </div>
                      </td>
                      <td>{value.status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-light option-btn"
                          onClick={() => handleToggleMenu(index)}
                          aria-expanded={menuOpen[index]}
                          aria-controls={`project-options-menu-${value.id}`}
                        >
                          <FaEllipsisV />
                        </button>
                        {menuOpen[index] && (
                          <Dropdown.Menu show={menuOpen[index]} id={`project-options-menu-${value.id}`}>
                            <Dropdown.Item onClick={() => handleEdit(value.id)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(value.id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        )}
                      </td>
                    </tr>
                  ))
                  : storedValue.map((value, index) => (
                    <tr key={index} >
                      <td >
                        <div className="project-info">
                          <span className="name">{value.projectName}</span>
                          <p className="date">Creation date: {format(new Date(value.creationDate), 'dd/MM/yyyy HH:mm a')}</p>
                        </div>
                      </td>
                      <td>
                        <div className='info-container'>
                          <img
                            src={thumbnailImage} alt="Assigned To" className="thumbnail" />
                          {value.projectManager}
                        </div>
                      </td>
                      <td>
                        <div className='info-container'>
                          <img src={thumbnailImage} alt="Assigned To" className="thumbnail" />
                          {value.assignedTo}
                        </div>
                      </td>
                      <td>{value.status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-light option-btn"
                          onClick={() => handleToggleMenu(index)}
                          aria-expanded={menuOpen[index]}
                          aria-controls={`project-options-menu-${value.id}`}
                        >
                          <FaEllipsisV />
                        </button>
                        {menuOpen[index] && (
                          <Dropdown.Menu show={menuOpen[index]} id={`project-options-menu-${value.id}`}>
                            <Dropdown.Item onClick={() => handleEdit(value.id)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(value.id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          {/* Fin Columna para pantallas medianas y grandes */}
          {/* Columna para pantallas pequeñas */}
          <Col xs={12} md={8} className="custom-col d-block d-md-none mx-0 mt-5" >
            <ul className="project-list">
              {/* Lista de proyectos */}
              {searchTerm
                ? filteredProjects.map((value, index) => (
                  <li key={index} className="project-list-item">
                    <div>
                      <h3>{value.projectName}</h3>
                      <p className="date">Creation date: {format(new Date(value.creationDate), 'dd/MM/yyyy HH:mm a')}</p>
                      <div className='info-container'>
                        <img
                          src={thumbnailImage}
                          alt="Thumbnail"
                          className="thumbnail"
                        />
                        <p className="assigned-to">{value.assignedTo}</p>
                      </div>
                    </div>

                    <div className="project-list-item-options">
                      <button type="button"
                        className="btn btn-light option-btn"
                        onClick={() => handleToggleMenu(index)}
                        aria-expanded={menuOpen[index]}
                        aria-controls={`project-options-menu-${value.id}`}
                      >
                        <FaEllipsisV />
                      </button>
                      {menuOpen[index] && (
                        <Dropdown.Menu show={menuOpen[index]} id={`project-options-menu-${value.id}`}>
                          <Dropdown.Item onClick={() => handleEdit(value.id)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(value.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      )}
                    </div>
                  </li>
                ))
                : storedValue.map((value, index) => (
                  <li key={index} className="project-list-item">
                    <div>
                      <h3>{value.projectName}</h3>
                      <p className="date">Creation date: {format(new Date(value.creationDate), 'dd/MM/yyyy HH:mm a')}</p>
                      <div className='info-container'>
                        <img
                          src={thumbnailImage}
                          alt="Thumbnail"
                          className="thumbnail"
                        />
                        <p className="assigned-to">{value.assignedTo}</p>
                      </div>
                    </div>

                    <div className="project-list-item-options">
                      <button type="button"
                        className="btn btn-light option-btn"
                        onClick={() => handleToggleMenu(index)}
                        aria-expanded={menuOpen[index]}
                        aria-controls={`project-options-menu-${value.id}`}
                      >
                        <FaEllipsisV />
                      </button>
                      {menuOpen[index] && (
                        <Dropdown.Menu show={menuOpen[index]} id={`project-options-menu-${value.id}`}>
                          <Dropdown.Item onClick={() => handleEdit(value.id)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(value.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </Col>
          {/* Fin Columna para pantallas pequeñas */}
        </Row>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this project?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div >
  );
}

export default Home;
