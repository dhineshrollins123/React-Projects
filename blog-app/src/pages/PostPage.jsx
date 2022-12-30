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

		if(comment.trim()===""){
			toast.error("Type something !");
			return;
		}
		submitComment(comment, postId)
			.then((response) => {
				console.log(response);
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
										<Card className="my-3 border-0 rounded-0" key={index}>
											<CardText>{comment.content}</CardText>
										</Card>
									);
								})}

								<Card>
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