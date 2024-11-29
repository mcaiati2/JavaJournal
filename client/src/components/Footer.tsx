import { Container } from 'react-bootstrap';

function Footer() {
  const date = new Date();

  return (
    <footer className="bg-light">
      <Container className="d-flex justify-content-between py-5">
        <p>Copyright &copy; {date.getFullYear()}</p>
        <p>Dev & Design By Mike Caiati.</p>
      </Container>
    </footer>
  )
}

export default Footer;