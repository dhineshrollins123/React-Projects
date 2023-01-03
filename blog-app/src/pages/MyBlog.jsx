import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { currentLoggedInUser } from "../auth/auth";
import Base from "../components/Base";
import Post from "../components/Post";
import {
	deleteParticularPost,
	getParticularUserPosts,
} from "../services/post-service";

function MyBlog() {
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setUser(currentLoggedInUser());
		if (user.userId !== undefined) {
			getParticularUserPosts(user.userId)
				.then((data) => setPosts([...data]))
				.catch((error) => console.log(error));
		}
	}, [user.userId]);

	function deletePost(postId) {
		deleteParticularPost(postId)
			.then((data) => {
				console.log(data);
				let newPosts = posts.filter((p) => p.postId !== postId);
				setPosts([...newPosts]);
				toast.success("Post deleted successfully !");
			})
			.catch((err) => {
				console.log(err);
				toast.error("Error occurred while deleting post !");
			});
	}

	return (
		<Base>
			<Container className="my-3">
				{posts.length <= 0 ? (
					<h1 className="text-center">You did not upload any posts !</h1>
				) : (
					<h2>Posts Count : {posts.length}</h2>
				)}

				{posts.map((post, index) => {
					return (
						<Post
							enabled="true"
							key={index}
							post={post}
							deletePost={deletePost}
						/>
					);
				})}
			</Container>
		</Base>
	);
}

export default MyBlog;
