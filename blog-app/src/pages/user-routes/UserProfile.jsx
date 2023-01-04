import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Base from "../../components/Base";
import ViewUserProfile from "../../components/ViewUserProfile";
import { getUser } from "../../services/user-service";

function UserProfile() {
	const { userId } = useParams();
	const [user, setUser] = useState({});

	useEffect(() => {
		getUser(userId)
			.then((data) => {
				setUser({...data});
			})
			.catch((err) => console.log(err));
	}, [userId]);
	
	return (
		<Base>
			<Row>
				<Col md={{ size: 8, offset: 2 }}>
        {console.log("prof user : "+JSON.stringify(user))} 
					<ViewUserProfile user={user} />
				</Col>
			</Row>
		</Base>
	);
}

export default UserProfile;
