import React from 'react';
import { Carousel, Container, Button } from 'react-bootstrap';
import hematobieg from '../image/Hematobieg.png';
import phonecatalog from '../image/phonecatalog.png';
import welcome from '../image/welcometothemet.png';
import todo from '../image/todo.png';
import listofposts from '../image/listofposts.jpg';
import game from '../image/game.png';

const images = {
  hematobieg,
  phonecatalog,
  welcome,
  todo,
  listofposts,
  game,
};

function Projects({ darkMode, t }) {
  return (
    <section id="projekty" className="d-flex align-items-center projects-section min-vh-100 py-5">
      <Container>
        <h2 className="text-center">{t.projects}</h2>
        <Carousel className="project-carousel">
          {t.projectsList.map((project, index) => (
            <Carousel.Item key={index} interval={2000}>
              <img
                className="d-block w-100 project-image"
                src={images[project.image]}
                alt={project.title}
              />
              <div className={`text-center mt-3 project-description ${darkMode ? 'dark' : 'light'}`}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
                <Button
                  variant="primary"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Demo
                </Button>
                <Button
                  variant="primary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 GitHub
                </Button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default Projects;
