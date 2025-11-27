import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Nav, Navbar, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../hooks/use-auth";

const NavBar = () => {
    const { t } = useTranslation("navbar");
    const { user, logout } = useAuth();

    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <NavbarToggle aria-controls="navbar" />
                <NavbarCollapse id="navbar">
                    <Nav>
                        <NavLink as={Link} to="/">{t("shopping-lists")}</NavLink>
                    </Nav>
                </NavbarCollapse>
                <span>
                    {user?.login}
                    {user && <Button className="btn btn-danger" style={{ marginLeft: 10 }} size="sm" onClick={logout}><FaSignOutAlt /></Button>}
                </span>
            </Container>
        </Navbar>
    )
}

export default NavBar