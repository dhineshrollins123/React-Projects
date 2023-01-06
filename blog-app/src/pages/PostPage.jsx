import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	CardText,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import { isLoggedIn } from "../auth/auth";
import Base from "../components/Base";
import {
	loadParticularPostById,
	submitComment,
} from "../services/post-service";

function PostPage() {
	const { postId } = useParams();
	const [post, setPost] = useState({});
	const [comment, setComment] = useState("");

	useEffect(() => {
		loadParticularPostById(postId)
			.then((data) => {
				setPost(data);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error while loading post");
			});
	}, [postId, comment]);

	const date = new Date(post.addedDate);
	let addedDate = date.toLocaleString();

	const handleChange = (event) => {
		const comment = event.target.value;
		setComment(comment);
	};

	const handleClick = () => {
		console.log("com : " + comment);
		if (!isLoggedIn()) {
			toast.error("Please Login !");
			return;
		}

		if (comment.trim() === "") {
			toast.error("Type something !");
			return;
		}
		submitComment(comment, postId)
			.then((response) => {
				toast.success("Comment Added !");
				setComment("");
			})
			.catch((error) => {
				console.log(error);
				toast.error("While adding comment error occurred !");
			});
	};

	return (
		<Base>
			<div className="bgcolor border-0">
				<Container className="pt-4">
					<Link style={{ textDecoration: "none" }} to={"/"}>
						{"<"}Back
					</Link>
					/ <h6 style={{ display: "inline-flex" }}>{post.title}</h6>
					<Row>
						<Col md={{ size: 12 }}>
							<Card className="mt-3 ps-2">
								{post && (
									<CardBody>
										{/* <h1>This is from PostPage.</h1> */}

										<CardText>
											Posted By <b>{post?.user?.name}</b> on <b>{addedDate}</b>
										</CardText>
										<CardText>
											<span className="text-muted">
												Category : {post?.category?.categoryTitle}
											</span>
										</CardText>

										<div
											style={{
												width: "100%",
												height: "1px",
												background: "#e2e2e2",
											}}
											className="divider mb-3"
										></div>

										{post.imageName !== null &&
											post.imageName?.trim() !== "" && (
												<div className="text-center">
													<img
														style={{
															width: "30%",
															height: "30%",
														}}
														src={`http://localhost:8080/api/posts/image/${post.imageName}`}
														alt="not-found"
													/>
												</div>
											)}

										<h1>{post.title}</h1>
										<CardText
											className="mt-3"
											dangerouslySetInnerHTML={{ __html: post.content }}
										/>
									</CardBody>
								)}
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 6, offset: 2 }}>
							<Card className="mt-3 bgcolor border-0">
								<CardText style={{ fontSize: "25px", fontWeight: "bold" }}>
									Comments ({post?.postComments?.length})
								</CardText>

								{post.postComments?.map((comment, index) => {
									return (
										<Card style={{position: "relative"}} className="my-3 border-0 rounded-0" key={index}>
											<div style={{display: "inline"}}>
											<CardText style={{width: "25%",position: "relative", top: "8px"}} className="text-uppercase fw-bold badge bg-primary text-wrap">{comment?.userDto?.name}</CardText>
											<CardText className="ms-2">{comment.content}</CardText>
											</div>
										</Card>
									);
								})}

								<Card className="mb-5">
									<CardBody>
										<Input
											name="comment"
											className="my-4"
											type="textarea"
											placeholder="Add Comment here..."
											onChange={handleChange}
											value={comment}
										/>
										<Button onClick={handleClick} color="primary">
											Add
										</Button>
									</CardBody>
								</Card>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</Base>
	);
}

export default PostPage;
