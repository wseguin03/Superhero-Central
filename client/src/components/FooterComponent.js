import React from 'react';
import { Nav } from 'react-bootstrap';
import './FooterComponent.css';
const FooterComponent = () => {
    return (
        <footer className='footer'>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/policy/securityAndPrivacyPolicy">Security And Privacy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/policy/dmcaNoticeAndTakedownPolicy">DMCA Policy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/policy/acceptableUsePolicy">Acceptable Use Poliy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/policy/more">More</Nav.Link>

            </Nav.Item>
          </Nav>
        </footer>
    );
};

export default FooterComponent;

// return (
//     <footer>
//         <Link to="/policy/securityAndPrivacyPolicy">Sacurity And Privacy</Link>
//         <Link to="/policy/dmcaNoticeAndTakedownPolicy">DMCA Policy</Link>
//         <Link to="/policy/acceptableUsePolicy">Acceptable Use Policy</Link>
//     </footer>
// );