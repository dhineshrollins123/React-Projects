import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideBar from "../components/CategorySideBar";
import NewFeed from "../components/NewFeed";

const Home = () => {
	return (
		<Base>
			<Container className="mt-3">
				<Row>
					<Col md={2} className="pt-5">
						<CategorySideBar />
					</Col>

					<Col md={10}>
						<div className="home">
							<NewFeed />
						</div>
					</Col>
				</Row>
			</Container>
		</Base>
	);
};

export default Home;
