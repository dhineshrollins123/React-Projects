import { useContext } from "react";
import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
	const user = useContext(userContext);
	return (
		<Base>
			<h1>This is from about . </h1>
			<h1>Welcome {user.name}</h1>
		</Base>
	);
};

export default About;
