import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
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
import { currentLoggedInUser } from "../auth/auth";
import { getAllCategories } from "../services/category-service";
import { createPost, uploadImageForPost } from "../services/post-service";
import { toast } from "react-toastify";

function AddPost() {
	const [user, setUser] = useState({});
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);

	const editor = useRef(null);

	useEffect(() => {
		setUser(currentLoggedInUser());
	}, []);

	useEffect(() => {
		getAllCategories()
			.then((data) => {
				console.log(data);
				setCategories(data);
			})
			.catch((error) => console.log(error));
	}, []);

	const [post, setPost] = useState({
		title: "",
		content: "",
		categoryId: "",
	});

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

	//submitting post here into server

	const submitPost = (event) => {
		event.preventDefault();
		if (post.title.trim() === "") {
			alert("Post Title Required !");
			return;
		}
		if (post.content.trim() === "") {
			alert("Post Content Required !");
			return;
		}

		if (post.categoryId === "") {
			alert("Select any one category !");
			return;
		}

		createPost(post, user)
			.then((response) => {
				console.log(response);
				if (image !== null) {
					uploadImageForPost(image, response.postId)
						.then((data) => {
							console.log(data);
							toast.success("Image Uploaded !");
							setImage(null);
						})
						.catch((error) => {
							console.log(error);
							toast.error("Image not uploaded");
						});
				}
				toast.success("Post Uploaded Successfully !");
				setPost({
					title: "",
					content: "",
					categoryId: "",
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Something went wrong ...");
			});
	};

	const reset = () => {
		setPost({
			title: "",
			content: "",
			categoryId: "",
		});
	};

	const handleImageChange = (event) => {
		console.log(event.target.files[0]);
		setImage(event.target.files[0]);
	};

	return (
		<div className="wrapper">
			<Container>
				<Card>
					<CardHeader>
						<h1>What's going in your mind ?</h1>
					</CardHeader>
					<CardBody>
						<Form onSubmit={submitPost}>
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
								<Input type="file" onChange={handleImageChange} />
							</FormGroup>

							<FormGroup>
								<Label for="categoryId">Enter Post Category : </Label>
								<Input
									id="categoryId"
									name="categoryId"
									type="select"
									onChange={handleChange}
									defaultValue={0}
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
									Create Post
								</Button>
								<Button onClick={reset} className="ms-3" color="danger">
									Reset Content
								</Button>
							</Container>
						</Form>
					</CardBody>
				</Card>
			</Container>
		</div>
	);
}

export default AddPost;
