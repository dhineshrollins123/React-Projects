import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideBar from "../components/CategorySideBar";
import Post from "../components/Post";
import { getParticularCategoryposts } from "../services/category-service";

function Categories() {
	const { categoryId } = useParams();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getParticularCategoryposts(categoryId)
			.then((data) => {
				setPosts([...data]);
			})
			.then((error) => {
				console.log(error);
			});
	}, [categoryId]);

	return (
		<Base>
			<Container className="mt-3">
				<Row>
					<Col md={2} className="pt-5">
						<CategorySideBar />
					</Col>

					<Col md={10}>
						{/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
						<marquee direction="right">
							<h2>Blog post ({posts?.length})</h2>
						</marquee>
						{posts &&
							posts?.map((post, index) => {
								return <Post key={index} post={post} />;
							})}

						{posts.length <= 0 && (
							<h2>This category does not having any posts.</h2>
						)}
					</Col>
				</Row>
			</Container>
		</Base>
	);
}

export default Categories;
