import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import { doLogOut } from "../auth/auth";
import userContext from "../context/userContext";
import { getUser, updateUserService } from "../services/user-service";
import Base from "./Base";
function UpdateProfile() {
	const [user, setUser] = useState({});
	const [error, setError] = useState({
		errors: {},
		isError: false,
	});

   const {userId} = useParams();
   const navigate = useNavigate();

   const userContextData = useContext(userContext);


   useEffect(() => {
      getUser(userId).then((user) => {
         setUser({...user});
         userContextData.setUser({login:true, data: user})
      }).catch(err => console.log(err))
   },[userId]);

	function handleChange(event) {
		const { name, value } = event.target;

		setUser((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

   // here submitting form
   function updateUserDetails(event){
      event.preventDefault();
      updateUserService(userId,user).then(data => {
         console.log(data);
         toast.success("User Profile Updated !");
         // navigate(`/user/profile/${userId}`);
         doLogOut(() => {
            userContextData.setUser({login: false})
            navigate("/");
         });
         
      }).catch(err => {
         setError({
            errors: error,
            isError: true,
         });
         toast.error("Profile Updatation Failed !");
         console.log(err);
      })
   }

	const updateUserProfile = () => {
		return (
			<Container>
				<Row className="mt-4">
					<Col sm={{ size: 4, offset: 4 }}>
						<Card color="secondary" inverse>
							<CardHeader>
								<h3>Fill the details here to Update User Profile !!</h3>
							</CardHeader>
							<CardBody>
								<Form onSubmit={updateUserDetails}>
									{/* name field */}

									<FormGroup>
										<Label color="secondary" for="name">
											Your Name :
										</Label>
										<Input
											id="name"
											name="name"
											placeholder="Name"
											type="text"
											onChange={handleChange}
											value={user.name}
											invalid={
												error.errors?.response?.data?.name ? true : false
											}
										/>
										<FormFeedback>
											{error.errors?.response?.data?.name}
										</FormFeedback>
									</FormGroup>

									{/* email field */}

									<FormGroup>
										<Label color="dark" for="email">
											Your Email :
										</Label>
										<Input
											id="email"
											name="email"
											placeholder="Email"
											type="email"
											onChange={handleChange}
											value={user.email}
											invalid={
												error.errors?.response?.data?.email ? true : false
											}
										/>

										<FormFeedback>
											{error.errors?.response?.data?.email}
										</FormFeedback>
									</FormGroup>

									{/* password field */}

									<FormGroup>
										<Label color="primary" for="password">
											Password :
										</Label>

										<Input
											id="password"
											name="password"
											placeholder="Password"
											type="password"
											onChange={handleChange}
											value={user?.password}
											invalid={
												error.errors?.response?.data?.password ? true : false
											}
										/>
										<FormFeedback>
											{error.errors?.response?.data?.password}
										</FormFeedback>
									</FormGroup>

									{/* about field */}

									<FormGroup>
										<Label for="about">Your About :</Label>

										<Input
											id="about"
											name="about"
											placeholder="About"
											type="textarea"
											style={{ height: "100px" }}
											onChange={handleChange}
											value={user.about}
											invalid={
												error.errors?.response?.data?.about ? true : false
											}
										/>

										<FormFeedback>
											{error.errors?.response?.data?.about}
										</FormFeedback>
									</FormGroup>

									{/* submit & data reset button */}

									<Container className="text-center">
										<Button color="dark">Update</Button>
										<Button
											onClick={""}
											className="ms-3"
											type="reset"
											color="secondary"
										>
											Reset
										</Button>
									</Container>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	};

	return <Base>
      {updateUserProfile()}
   </Base>;
}

export default UpdateProfile;
