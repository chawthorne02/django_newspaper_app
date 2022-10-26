import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";


function Header({ superState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
    navigate("/");
  };


  return (
    <>
      <Navbar expand="lg" className="header">
        <Container className="navbar-container">
          <Navbar.Brand className="app-logo" href="/">
            News For Thought
          </Navbar.Brand>
          <div className="desk-nav">
            <Nav className="me-auto desk-nav-links">
            {!superState.auth && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
              {superState.auth && !superState.admin && (
                <>
                  <Nav.Link href="/create">Create Article</Nav.Link>
                  <Nav.Link href="/articles/user">My Articles</Nav.Link>
                </>
              )}
              {superState.admin && (
                <>
                  <Nav.Link href="/articles/admin">Review Articles</Nav.Link>
                </>
              )}
              {superState.auth && (
                <Nav.Link href="/" onClick={(e) => logout(e)}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
            {superState.avatar && (
              <img className="profile-picture" src={superState.avatar} alt="" />
            )}
          </div>
        </Container>
      </Navbar>


      <Nav className="me-auto mobile-nav">
        {!superState.auth && (
          <>
            <Nav.Link className="footer-link" href="/login">
              Login
            </Nav.Link>
          </>
        )}
        {superState.auth && !superState.admin && (
          <>
            <Nav.Link className="footer-link" href="/create">
              Create Article
            </Nav.Link>
            <Nav.Link className="footer-link" href="/articles/user">
              My Articles
            </Nav.Link>
          </>
        )}
        {superState.admin && (
          <>
            <Nav.Link className="footer-link" href="/articles/admin">
              Review Articles
            </Nav.Link>
          </>
        )}
        {superState.auth && (
          <Nav.Link className="footer-link" href="/" onClick={(e) => logout(e)}>
            Logout
          </Nav.Link>
        )}
      </Nav>
    </>
  );
}

export default Header;





// { <Navbar expand="lg">
//       <Container>
//         <Navbar.Brand href="/" className="main-title">News For Thought</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/login">Login</Nav.Link>
//             {/* <Nav.Link href="/register/">Register</Nav.Link> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar> */}