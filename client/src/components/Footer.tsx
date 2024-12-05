import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const date = new Date();

  return (
    <footer className="bg-dark text-white" aria-label="Footer">
      <Container className="d-flex flex-column flex-md-row justify-content-between py-4">
        <div>
          <p>&copy; {date.getFullYear()} JavaJournal</p>
          <NavLink to="/contact" className="text-white no-underline" aria-label="Contact Us">
            Get In Touch 
            <FaEnvelope className="icon-spacing" />
            <FaFacebook className="icon-spacing" />
            <FaTwitter className="icon-spacing" />
            <FaInstagram className="icon-spacing" />
          </NavLink>
        </div>
        <div>
        </div>
        <div>
          <p>DEV & DESIGN BY: <br/>Mike Caiati<br/> Izzy Figueroa<br/>Nina DeLucia</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;