import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaCoffee } from 'react-icons/fa';

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
          <p>DEV & DESIGN BY: <br/>
          <a href="https://github.com/mikecaiati" target="_blank" rel="noopener noreferrer" className="no-underline">
  <FaCoffee className="coffee-icon-spacing" /> Mike Caiati
</a><br/>
<a href="https://github.com/izzyfigueroa" target="_blank" rel="noopener noreferrer" className="no-underline">
  <FaCoffee className="coffee-icon-spacing" /> Izzy Figueroa
</a><br/>
<a href="https://github.com/ninadelucia" target="_blank" rel="noopener noreferrer" className="no-underline">
  <FaCoffee className="coffee-icon-spacing" /> Nina DeLucia
</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;