// import { useEffect, useRef } from 'react';
import { useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';


function Landing() {
  

  // const aboutDiv = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (aboutDiv.current) {
  //       const aboutDivTop = aboutDiv.current.getBoundingClientRect().top;
  //       if (aboutDivTop < window.innerHeight) {
  //         aboutDiv.current.style.opacity = '1';
  //         aboutDiv.current.style.transform = 'translateX(0)';
  //       }
  //     }
  //   });
  // }, []);

  return (
    <Container fluid={true}>
      <Row className="center-content">
        <Col className="landing-hero-image">
          <h1 className="text-center">JavaJournal</h1>
          {/* <h3 className="text-center">Get Pouring</h3> */}
        </Col>
      </Row>



      <Row className="center-content">
        <div className='landing-section'>
          <div className="side-flex">
            <div className="search-recipes">
              <button className="landing-btn">
                <a href="/coffee-info" className="white-text"><h4>SEARCH RECIPES</h4></a>
              </button>
            </div>
            {/* <h3>GET BREWING</h3>
            <a href="/" className="white-text landing-link">SEARCH RECIPES</a> */}
            {/* <button className="search-btn">SEARCH RECIPES</button> */}
          </div>
        </div>
      </Row>



      <Row className="center-content">
        <Col className="landing-section">
          {/* <div className="about-img" ref={aboutDiv}> */}
          <div className="about-img">
            <button className="landing-btn">
              <a href="/about" className="white-text"><h4>ABOUT US</h4></a>
            </button>
          </div>
        </Col>
      </Row>


    </Container>
  )
}

export default Landing;