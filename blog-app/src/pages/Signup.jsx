import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Base from "../components/Base";
import { signUp } from "../services/user-service";

const Signup = () => {
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		about: "",
	});

	const navigate = useNavigate();

	const [error, setError] = useState({
		errors: {},
		isError: false,
	});

	// submit data
	function submitForm(event) {
		event.preventDefault();
		console.log(data);
		signUp(data)
			.then((response) => {
				console.log(response);
				toast.success("User is Registered Sucessfully !");
				navigate("/login");
			})
			.catch((error) => {
				setError({
					errors: error,
					isError: true,
				});
				toast.error("Please Enter Valid Data !");
				console.log(error);
			});
	}

	function resetData() {
		setData({
			name: "",
			email: "",
			password: "",
			about: "",
		});
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setData((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	return (
		<div className="bgImage">
			<Base>
				<Container>
					<Row className="mt-4">
						<Col sm={{ size: 4, offset: 4 }}>
							<Card color="secondary" inverse>
								<CardHeader>
									<h3>Fill the details to Register !!</h3>
								</CardHeader>
								<CardBody>
									<Form onSubmit={submitForm}>
										{/* name field */}

										<FormGroup>
											<Label color="secondary" for="name">
												Enter Name :
											</Label>
											<Input
												id="name"
												name="name"
												placeholder="Name"
												type="text"
												onChange={handleChange}
												value={data.name}
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
												Enter Email :
											</Label>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												type="email"
												onChange={handleChange}
												value={data.email}
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
												Enter Password :
											</Label>

											<Input
												id="password"
												name="password"
												placeholder="Password"
												type="password"
												onChange={handleChange}
												value={data.password}
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
											<Label for="about">Enter About :</Label>

											<Input
												id="about"
												name="about"
												placeholder="About"
												type="textarea"
												style={{ height: "100px" }}
												onChange={handleChange}
												value={data.about}
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
											<Button color="dark">Register</Button>
											<Button
												onClick={resetData}
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
			</Base>
		</div>
	);
};

export default Signup;
