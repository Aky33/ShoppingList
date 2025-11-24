import { Container, Nav, Navbar, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation("navbar");

    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <NavbarToggle aria-controls="navbar" />
                <NavbarCollapse id="navbar">
                    <Nav>
                        <NavLink as={Link} to="/">{t("shopping-lists")}</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default NavBar