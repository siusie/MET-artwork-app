import { Container, Nav, Navbar, NavDropdown, Button, Form, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {

    const router = useRouter();
    const [searchField, setSearch] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    function logout() {
        setExpanded(false);
        removeToken();
        router.push('/login');
    }


    async function submitForm(e) {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearch("");
        setExpanded(false);
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    }

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className="fixed-top" expanded={expanded} >
                <Container>
                    <Navbar.Brand>🖼&nbsp;Artwork Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="basic-navbar-nav"  >
                        <Nav className="me-auto">
                            <Link href="/" passHref ><Nav.Link active={router.pathname === "/"} onClick={() => setTimeout(() => { setExpanded(false) }, 1000)}>Home</Nav.Link></Link>
                            {token && <Link href="/search" passHref ><Nav.Link active={router.pathname === "/search"} onClick={() => setTimeout(() => { setExpanded(false) }, 500)}>Advanced Search</Nav.Link></Link>}
                        </Nav>
                        &nbsp;
                        <Nav>
                            {!token && <Link href="/register" passHref ><Nav.Link active={router.pathname === "/register"} onClick={() => setTimeout(() => { setExpanded(false) }, 500)}>Register</Nav.Link></Link>}

                            {!token && <Link href="/login" passHref ><Nav.Link active={router.pathname === "/login"} onClick={() => setTimeout(() => { setExpanded(false) }, 500)}>Login</Nav.Link></Link>}
                        </Nav>
                        {token && <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <Button variant="primary" type="submit" size='sm'>Search</Button>
                        </Form>}
                        &nbsp;
                        {token && <Nav>
                            <NavDropdown title={token.userName} id="basic-nav-dropdown" >
                                <Link href='/favourites' passHref >
                                    <Nav.Link onClick={() => setTimeout(() => { setExpanded(false) }, 500)} ><NavDropdown.Item href="/favourites" active={router.pathname === "/favourites"} >Favourites</NavDropdown.Item></Nav.Link>
                                </Link>
                                <Link href='/history' passHref >
                                    <Nav.Link onClick={() => setTimeout(() => { setExpanded(false) }, 500)}><NavDropdown.Item href="/history" active={router.pathname === "/history"} >
                                        Search History
                                    </NavDropdown.Item></Nav.Link>
                                </Link>
                                <Nav.Link onClick={logout}>
                                    <Dropdown.Item>
                                        Logout
                                    </Dropdown.Item>
                                </Nav.Link>
                            </NavDropdown>
                        </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar><br /><br />
        </>
    );
}