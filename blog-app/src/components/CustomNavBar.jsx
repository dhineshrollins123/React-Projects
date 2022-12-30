import React, { useEffect, useState } from "react";
import { NavLink as ReactNavLink, useNavigate } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";
import { currentLoggedInUser, doLogOut, isLoggedIn } from "../auth/auth";

function CustomNavBar(args) {
	const [isOpen, setIsOpen] = useState(false);

	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState(undefined);

	const navigate = useNavigate();

	const logout = () => {
		doLogOut(() => {
			setIsLogin(false);
			navigate("/");
		});
	};

	useEffect(() => {
		setIsLogin(isLoggedIn());
		setUser(currentLoggedInUser());
	}, [isLogin]);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar expand="md" fixed="" color="dark" dark {...args}>
				<NavbarBrand>MyBlogs</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink tag={ReactNavLink} to="/">
								News Feed
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={ReactNavLink} to="/user/dashboard">
								Upload Blog
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={ReactNavLink} to="/about">
								About
							</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								More
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Contact Us</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Youtube</DropdownItem>
								<DropdownItem>Instagram</DropdownItem>
								<DropdownItem>LinkedIn</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>

					<Nav navbar>
						{isLogin && (
							<>
								<NavbarText className="px-3">{user?.email}</NavbarText>
								<NavItem>
									<NavLink tag={ReactNavLink} to="/user/profile">
										Profile
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink onClick={logout}>Logout</NavLink>
								</NavItem>
							</>
						)}

						{!isLogin && (
							<>
								<NavItem>
									<NavLink tag={ReactNavLink} to="/login">
										Login
									</NavLink>
								</NavItem>

								<NavItem>
									<NavLink tag={ReactNavLink} to="/register">
										SignUp
									</NavLink>
								</NavItem>
							</>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default CustomNavBar;