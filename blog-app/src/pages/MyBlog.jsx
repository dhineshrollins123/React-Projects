import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { currentLoggedInUser } from "../auth/auth";
import Base from "../components/Base";
import Post from "../components/Post";
import { getParticularUserPosts } from "../services/post-service";

function MyBlog() {
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setUser(currentLoggedInUser());
		getParticularUserPosts(user.userId)
			.then((data) => setPosts([...data]))
			.catch((error) => console.log(error));
	}, [user]);
   
	return (
		<Base>
			<Container className="my-3">
				<h2>Posts Count : {posts.length}</h2>
				{posts.map((post, index) => {
					return <Post key={index} post={post} />;
				})}
			</Container>
		</Base>
	);
}

export default MyBlog;
