import React, { useEffect, useRef, useState } from "react";
import { getAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
} from "reactstrap";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import {
	loadParticularPostById,
	updatePostService,
} from "../services/post-service";
import { toast } from "react-toastify";

function UpdatePost() {
	const [categories, setCategories] = useState([]);
	const editor = useRef(null);

	const { postId } = useParams();
	console.log("update post id : " + postId);

	useEffect(() => {
		getAllCategories()
			.then((data) => {
				console.log(data);
				setCategories(data);
			})
			.catch((error) => console.log(error));
	}, []);

	const [post, setPost] = useState({});

	useEffect(() => {
		loadParticularPostById(postId)
			.then((data) => {
				setPost({ ...data, categoryId: data.category.categoryId });
			})
			.catch((error) => console.log(error));
	}, [postId]);

	function handleChange(event) {
		const { name, value } = event.target;
		setPost((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	const handleContentChange = (data) => {
		setPost((prevState) => {
			return {
				...prevState,
				content: data,
			};
		});
	};

	function updatePost(event) {
		event.preventDefault();
		updatePostService(post.postId, {
			...post,
			category: { categoryId: post.categoryId },
		})
			.then((data) => {
				console.log(data);
				toast.success("BLOG UPDATED !");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error occurred while updating blog !");
			});
	}

	const updateBlog = () => {
		return (
			<div className="wrapper">
				<Container>
					<Card>
						<CardHeader>
							<h1>Update your blog here !</h1>
						</CardHeader>
						<CardBody>
							<Form onSubmit={updatePost}>
								<FormGroup>
									<Label for="title">Post Title :</Label>
									<Input
										type="text"
										name="title"
										id="title"
										placeholder="Title here"
										onChange={handleChange}
										value={post.title}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="content">Post Content :</Label>
									<JoditEditor
										ref={editor}
										value={post.content}
										onChange={handleContentChange}
									/>
								</FormGroup>

								<FormGroup>
									<Label for="image">Select Image for post :</Label>
									<Input type="file" onChange={handleChange} />
								</FormGroup>

								<FormGroup>
									<Label for="categoryId">Enter Post Category : </Label>
									<Input
										id="categoryId"
										name="categoryId"
										type="select"
										onChange={handleChange}
										value={post.categoryId}
									>
										<option disabled value={0}>
											--Select Category--
										</option>

										{categories.map((category) => (
											<option
												value={category.categoryId}
												key={category.categoryId}
											>
												{category.categoryTitle}
											</option>
										))}
									</Input>
								</FormGroup>
								<Container className="text-center">
									<Button type="submit" color="primary">
										Update Post
									</Button>
									<Button onClick={""} className="ms-3" color="danger">
										Reset Content
									</Button>
								</Container>
							</Form>
						</CardBody>
					</Card>
				</Container>
			</div>
		);
	};
	return (
		<Base>
			<Container className="mt-3">{post && updateBlog()}</Container>
		</Base>
	);
}

export default UpdatePost;
