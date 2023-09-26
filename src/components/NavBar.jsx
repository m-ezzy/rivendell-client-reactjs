import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavLink } from "react-bootstrap";

// NavBar MenuBar ToolBar Header
export default () => {
	const [currentMenu, setCurrentMenu] = useState(0);
	const menuNames = ['search', 'chats', 'groups', 'account', 'logout']; //menus //navData
	// let items = navData.map(item => {
	// 	return <NavLink><Link to={item.path}>{item.name}</Link></NavLink>;
	// });

	return (
		<Navbar expand="lg" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/">Rivendell</Navbar.Brand>
			</Container>
			<Nav>
				<NavLink as={'div'}><Link to="/search">search</Link></NavLink>
				<NavLink as={'div'}><Link to="/chats">chats</Link></NavLink>
				<NavLink as={'div'}><Link to="/groups">groups</Link></NavLink>
				{/* <NavLink as={'div'}><Link to="/conversation">conversation</Link></NavLink> */}
				<NavLink as={'div'}><Link to="/account">account</Link></NavLink>
				{/* { items } */}
			</Nav>
		</Navbar>
	);
}
