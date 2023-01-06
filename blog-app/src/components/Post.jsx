import { DeleteOutlineRounded } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { currentLoggedInUser } from "../auth/auth";
import userContext from "../context/userContext";


function Post(props) {
	const [user, setUser] = useState({});
	const userContextData = useContext(userContext);

	useEffect(() => {
		setUser(currentLoggedInUser());
	}, []);

	return (
		<Card style={{position: "relative"}} className="shadow-sm border-0 mt-3">
			<CardBody>
				<h2>{props.post.title}</h2>
				<CardText
					dangerouslySetInnerHTML={{
						__html: props.post.content.substring(0, 40) + "....",
					}}
				/>
				<div className="text-center">
					<Link
						to={"/posts/" + props.post.postId}
						className="btn btn-secondary"
					>
						Read More
					</Link>

					{userContextData.user.login &&
						props.enabled &&
						user.userId === props.post.user.userId && (
							<Button color="danger" className="border-0 m-0" style={{position: "absolute",right: "20px", top: "18px",padding: 0}}
								onClick={() => props.deletePost(props.post.postId)}
							>
								<DeleteOutlineRounded />
							</Button>
						)}

						{userContextData.user.login &&
						props.enabled &&
						user.userId === props.post.user.userId && (
							<Button
								// onClick={() => props.deletePost(props.post.postId)}
								tag={Link}
								to={`/user/update-blog/${props.post.postId}`}
								color="warning ms-2"
							>
								Update
							</Button>
						)}
				</div>
			</CardBody>
		</Card>
	);
}

export default Post;
