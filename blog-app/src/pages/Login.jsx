import { useContext, useState } from "react";
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
import { doLogin, isLoggedIn } from "../auth/auth";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { login } from "../services/user-service";

const Login = () => {
	const [data, setData] = useState({
		userName: "",
		password: "",
	});

	const [errors, setError] = useState({
		error: {},
		isError: false,
	});

	const userContextData = useContext(userContext);

	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;

		setData((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}
	function submitForm(event) {
		event.preventDefault();
		login(data)
			.then((response) => {
				doLogin(response, () =>
					console.log("Login detail is saved into local storage")
				);
				toast.success("Login Successfully !");
				userContextData.setUser({
					data: response.user,
					login: true,
				});
				navigate("/user/myblogs");
			})
			.catch((error1) => {
				if (error1.response?.data?.message != null) {
					toast.error(error1.response.data.message);
				} else {
					toast.error("Error Occured !");
				}
				setError({
					error: error1,
					isError: true,
				});

				console.log(error1);
			});
	}

	function resetData() {
		setData({
			userName: "",
			password: "",
		});
	}

	return (
		!userContextData.user.login && (
			<div className="bgImage">
				<Base>
					<Container>
						<Row className="mt-4">
							<Col sm={{ size: 4, offset: 4 }}>
								<Card color="dark" inverse>
									<CardHeader>
										<h3 className="text-center">Login Here !</h3>
									</CardHeader>
									<CardBody>
										<Form onSubmit={submitForm}>
											{/* email field */}

											<FormGroup>
												<Label for="email">Enter Email ID :</Label>

												<Input
													type="email"
													placeholder="Enter email here"
													id="email"
													name="userName"
													onChange={handleChange}
													value={data.userName}
													invalid={
														errors.error?.response?.data?.userName
															? true
															: false
													}
													valid={
														errors.error?.response?.data?.userName
															? false
															: true
													}
												/>

												<FormFeedback>
													{errors.error?.response?.data?.userName}
												</FormFeedback>
											</FormGroup>

											{/* password field */}

											<FormGroup>
												<Label for="password">Enter Password :</Label>

												<Input
													type="password"
													placeholder="Enter password here"
													id="password"
													name="password"
													onChange={handleChange}
													value={data.password}
													invalid={
														errors.error?.response?.data?.password
															? true
															: false
													}
													valid={
														errors.error?.response?.data?.password
															? false
															: true
													}
												/>
												<FormFeedback>
													{errors.error?.response?.data?.password}
												</FormFeedback>
											</FormGroup>

											<Container className="text-center">
												<Button className="mt-4 mb-4" color="warning">
													Login
												</Button>
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
		)
	);
};

export default Login;
