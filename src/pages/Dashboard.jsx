import { useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { Nav, NavLink, Navbar, NavItem, NavbarBrand, Container, Row, Col } from 'react-bootstrap';
import { useUser } from "../contexts/User";
import NavBar from "../components/NavBar";

export default function Dashboard() {
	const { user } = useUser();
	const params = useParams();
	console.log(params);
	// const location = useLocation();
	// setCurrent(location.pathname.split('/')[1]);
	return (
		user ? 
		<Container fluid="xxl">
			<Row>
				<NavBar />
			</Row>
			<Row>
				<Outlet />
			</Row>
		</Container>
		:
		<div>Loading...</div>
		// <Navigate to="/login" />
	);
}
