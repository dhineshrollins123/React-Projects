import React from "react";
import { useEffect, useState } from "react";
import {
	Col,
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
} from "reactstrap";
import {
   retrieveAllPosts,
	retrieveAllPostsWithDefaultPaging,
	retrieveAllPostsWithPaging,
} from "../services/post-service";
import Post from "./Post";

function NewFeed() {
	const [postList, setPostList] = useState({
		content: [],
		lastPage: false,
		pageNumber: "",
		pageSize: "",
		totalElements: "",
		totalPages: "",
	});

   const [postSize, setPostSize] = useState(0);

	useEffect(() => {
		retrieveAllPostsWithDefaultPaging()
			.then((data) => {
				console.log(data);
				setPostList(data);
			})
			.catch((error) => {
				console.log(error);
			});

         retrieveAllPosts()
         .then((data)=> setPostSize(data.length));
	}, []);

	return (
		<div className="container-fluid">
			<Row>
				<Col md={{ size: 8, offset: 2 }}>
					 {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
					<marquee direction="right"><h2>Blog post ({postSize})</h2></marquee>
					{postList.content.map((post) => {
						return (
							<Post
								key={post.postId}
								post={post}
							/>
						);
					})}

					<Container className="mt-4">
						<Pagination>
							<PaginationItem
								onClick={() => {
									retrieveAllPostsWithDefaultPaging()
										.then((data) => setPostList(data))
										.catch((error) => console.log(error));
								}}
							>
								<PaginationLink first />
							</PaginationItem>

							<PaginationItem
								disabled={postList.pageNumber === 0}
								onClick={() => {
									if (postList.pageNumber !== 0) {
										retrieveAllPostsWithPaging(postList.pageNumber - 1)
											.then((data) => setPostList(data))
											.catch((error) => console.log(error));
									}
								}}
							>
								<PaginationLink previous />
							</PaginationItem>

							{[...Array(postList.totalPages)].map((item, index) => {
								return (
									<PaginationItem
										onClick={() => {
											retrieveAllPostsWithPaging(index)
												.then((data) => setPostList(data))
												.catch((error) => console.log(error));
										}}
										key={index}
										active={index === postList.pageNumber}
									>
										<PaginationLink>{index + 1}</PaginationLink>
									</PaginationItem>
								);
							})}

							<PaginationItem
								disabled={postList.lastPage}
								onClick={() => {
									if (!postList.lastPage) {
										retrieveAllPostsWithPaging(postList.pageNumber + 1)
											.then((data) => setPostList(data))
											.catch((error) => console.log(error));
									}
								}}
							>
								<PaginationLink next />
							</PaginationItem>

							<PaginationItem
								onClick={() => {
									retrieveAllPostsWithPaging(postList.totalPages - 1)
										.then((data) => setPostList(data))
										.catch((error) => console.log(error));
								}}
							>
								<PaginationLink last />
							</PaginationItem>
						</Pagination>
					</Container>
				</Col>
			</Row>
		</div>
	);
}

export default NewFeed;
