import CustomNavBar from "./CustomNavBar";

const Base = ({ children }) => {
	return (
		<div className="container-fluid p-0 m-0">
			<CustomNavBar />
			{children}
		</div>
	);
};

export default Base;
