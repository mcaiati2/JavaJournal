import { Row, Col, Container } from 'react-bootstrap';
// import { useQuery } from '@apollo/client';

// import { GET_ALL_COFFEES } from '../graphql/queries';
// import { Coffee } from '../interfaces';

function Landing() {
  // const { data: coffeeData } = useQuery(GET_ALL_COFFEES);

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
            </div>
            <button className="landing-btn">
              <a href="/coffee-info" className="white-text">SEARCH RECIPES</a>
            </button>
            {/* <h3>GET BREWING</h3>
            <a href="/" className="white-text landing-link">SEARCH RECIPES</a> */}
            {/* <button className="search-btn">SEARCH RECIPES</button> */}
          </div>
        </div>
      </Row>



      <Row className="center-content">
        <Col className="landing-section">
          <div className="about-img">
            <button className="landing-btn">
              <a href="/about" className="white-text">ABOUT US</a>
            </button>
          </div>
        </Col>
      </Row>


    </Container>
  )
}

export default Landing;