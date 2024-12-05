import { Container } from 'react-bootstrap';

function Footer() {
  const date = new Date();

  return (
    <footer className="bg-dark">
      <Container className="d-flex justify-content-between py-5">
        <p>Copyright &copy; {date.getFullYear()} <br></br><br></br> CONTACT US: <br></br>123.456.7890 <br></br>email@email.com</p>


        <p>DEV & DESIGN BY: <br></br><br></br>Mike Caiati <br></br>Izzy Figueroa <br></br>Nina DeLucia </p>
      </Container>
    </footer>
  )
}

export default Footer;