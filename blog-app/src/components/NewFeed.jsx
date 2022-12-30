import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
	const [currentPageNumber, setCurrentPageNumber] = useState(0);

	useEffect(() => {
		retrieveAllPostsWithPaging(currentPageNumber)
			.then((data) => {
				console.log(data);
				setPostList({
					content: [...postList.content, ...data.content],
					lastPage: data.lastPage,
					pageNumber: data.pageNumber,
					pageSize: data.pageSize,
					totalElements: data.totalElements,
					totalPages: data.totalPages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [currentPageNumber]);

	retrieveAllPosts().then((data) => setPostSize(data.length));

	const changePageInfinite = () => {
		console.log("page changed...");
		setCurrentPageNumber(currentPageNumber + 1);
	};

	return (
		<div className="container-fluid">
			<Row>
				<Col md={{ size: 8, offset: 2 }}>
					{/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
					<marquee direction="right">
						<h2>Blog post ({postSize})</h2>
					</marquee>

					<InfiniteScroll
						dataLength={postList?.content?.length}
						next={changePageInfinite}
						hasMore={!postList.lastPage}
						loader={<h4 className="text-center py-3">Loading...</h4>}
						endMessage={
							<p className="py-3" style={{ textAlign: "center" }}>
								<b>Yay! You have seen all articles !</b>
							</p>
						}
					>
						{postList.content?.map((post, index) => {
							return <Post key={index} post={post} />;
						})}
					</InfiniteScroll>

					{/* <Container className="mt-4">
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
					</Container> */}
				</Col>
			</Row>
		</div>
	);
}

export default NewFeed;
