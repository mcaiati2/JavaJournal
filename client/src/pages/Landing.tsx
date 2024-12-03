import { Row, Col, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_ALL_COFFEES } from '../graphql/queries';
import { Coffee } from '../interfaces';

function Landing() {
  const { data: coffeeData } = useQuery(GET_ALL_COFFEES);

  return (
    <Container fluid={true}>
      <Row className="center-content">
        <Col className="landing-hero-image">
          <h1 className="text-center">JavaJournal</h1>
          <h3 className="text-center fw-light">Coffee good!</h3>
        </Col>
      </Row>

      <Container>
        <h3 className="fw-light mt-5">Drink it, okay?</h3>
        <hr />

      </Container>
    </Container>
  )
}

export default Landing;