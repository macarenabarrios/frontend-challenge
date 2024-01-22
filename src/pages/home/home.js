import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { format } from 'date-fns';

import useLocalStorage from '../../hooks/useLocalStorage';
import thumbnailImage from '../../assets/images/avatar.webp';

import './home.css';

function Home() {
  const [storedValue, setValue] = useLocalStorage('project', []);

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

  const handleDelete = (id) => {
    console.log('Delete clicked for ID:', id);
    const updatedProjects = storedValue.filter(project => project.id !== id);
    setValue(updatedProjects);
  };

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
          <button className="btn btn-danger btn-sm" onClick={handleBackClick}><span>+ Add project</span></button>
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
                {storedValue.map((value, index) => (
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
              {storedValue.map((value, index) => (
                <li key={index} className="project-list-item">
                  <div >
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
      </Container>
    </div >
  );
}

export default Home;
