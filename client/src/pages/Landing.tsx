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
            <h3>GET BREWING</h3>
            <a href="/" className="white-text landing-link">SEARCH RECIPES</a>
            {/* <button className="search-btn">SEARCH RECIPES</button> */}
          <div className="search-recipes">
          </div>
        </div>
      </Row>


    </Container>
  )
}

export default Landing;