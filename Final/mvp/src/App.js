import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Navbar, Nav
} from 'react-bootstrap';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Request from './Request'
import Report from './Report'

function App() {
  return (
    <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">SMV Parking Request</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to='/request'>
              Request
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/report'>
              Report
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Switch>
      <Route path="/request">
        <Request />
      </Route>
      <Route path="/report">
        <Report />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>
  );
}

function Home() {
  return (
    <h1>Home</h1>
  )
}
export default App;
