import {Row, Col, Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '../graphql/queries';
import { Post } from '../interfaces';

function Landing() {
  const {data: postData} = useQuery(GET_ALL_POSTS);

  return (
    <Container fluid={true}>
      <Row>
        <Col className="landing-hero-image" xs="12" md="6"></Col>
        <Col className="d-flex flex-column justify-content-center hero-text" xs="12" md="6">
          <h1 className="text-center">Petstagram</h1>
          <h3 className="text-center fw-light">The fun hangout where your pets can socialize!</h3>
        </Col>
      </Row>

      <Container>
        <h3 className="fw-light mt-5">See what pets are saying!</h3>
        <hr />

        {postData && !postData.getAllPosts.length && (
          <p>No posts have been added yet. Log in to create a post for your pet!</p>
        )}

        <Row className="my-3">
          {postData && postData.getAllPosts.map((post: Post) => (
            <Col lg="12" key={post._id} className="my-2 landing-post">
              <h3 className="fw-light">{post.title}</h3>
              <p className="text-secondary">{post.body}</p>
              <p className="text-secondary">Added By: {post.pet?.name}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}

export default Landing;