import CustomNavBar from "./CustomNavBar";

const Base = ({ children }) => {
	return (
		<div className="container-fluid p-0 m-0">
			<CustomNavBar />
			{children}
			{/* <div
				className="text-center p-3 py-5 text-muted"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					position: "relative",
					width: "100%",
					bottom: "1px",
				}}
			>
				©CopyRights Reserved 2022 By DK ROLLINS
			</div> */}
		</div>
	);
};

export default Base;
