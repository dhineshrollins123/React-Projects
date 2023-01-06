import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Container,
	Table,
} from "reactstrap";
import { currentLoggedInUser } from "../auth/auth";

const ViewUserProfile = ({user}) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(currentLoggedInUser());
	}, []);

	return (
		<Card className="text-center mt-3">
			<CardHeader style={{ fontWeight: "bold", fontSize: "40px" }}>
				USER INFORMATION
			</CardHeader>
			<CardBody>
				<Container>
					<img
						className="img-fluid rounded-circle"
						style={{ maxWidth: "200px", maxHeight: "200px" }}
						src="/images/profile.png"
						alt="user-profile-pic"
					/>
					{user && (
						<Table bordered responsive hover striped className="mt-2">
							<tbody>
								<tr>
									<td className="fw-bold">USER ID</td>
									<td>DKR_{user.userId}</td>
								</tr>

								<tr>
									<td className="fw-bold">USERNAME</td>
									<td>{user.name}</td>
								</tr>

								<tr>
									<td className="fw-bold">EMAIL ID</td>
									<td>{user.email}</td>
								</tr>

								<tr>
									<td className="fw-bold">ABOUT</td>
									<td>{user.about}</td>
								</tr>

								<tr>
									<td className="fw-bold">ROLE</td>
									<td>
										{user.roles?.map((role) => {
											return <div key={role.roleId}>{role.roleName}</div>;
										})}
									</td>
								</tr>
							</tbody>
						</Table>
					)}
				</Container>
			</CardBody>
			{currentUser && currentUser.userId === user.userId && (
				<CardFooter className="bg-white border-0 pb-3">
					<Button tag={Link} to={`/user/update-profile/${currentUser.userId}`} color="warning">Update Profile</Button>
				</CardFooter>
			)}
		</Card>
	);
};

export default ViewUserProfile;
