import { Row, Col, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_ALL_COFFEES } from '../graphql/queries';
import { Coffee } from '../interfaces';

function Landing() {
  const { data: coffeeData } = useQuery(GET_ALL_COFFEES);

  return (
    <Container fluid={true}>
      <Section className="center-content">
        <div className="landing-hero-image">
          <h1 className="text-center">JavaJournal</h1>
          <h3 className="text-center fw-light">Coffee good!</h3>
        </div>
      </Section>

      <Container>
        <h3 className="fw-light mt-5">Drink it, okay?</h3>
        <hr />

        {coffeeData && !coffeeData.getAllCoffees.length && (
          <p>No coffee has been added yet. Log in to start roasting!</p>
        )}

        <Row className="my-3">
          {coffeeData && coffeeData.getAllCoffees.map((coffee: Coffee) => (
            <Col lg="12" key={coffee._id} className="my-2 landing-post">
              <h3 className="fw-light">{coffee.title}</h3>
              <p className="text-secondary">{coffee.body}</p>
              <p className="text-secondary">{coffee.shop?.name}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}

export default Landing;