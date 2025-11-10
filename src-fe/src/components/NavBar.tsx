import { Container, Nav, Navbar, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <NavbarToggle aria-controls="navbar" />
                <NavbarCollapse id="navbar">
                    <Nav>
                        <NavLink as={Link} to="/">ShoppingLists</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default NavBar