import { Link } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";

function Post(props) {
	return (
		<Card className="shadow-sm border-0 mt-3">
			<CardBody>
				<h2>{props.post.title}</h2>
				<CardText dangerouslySetInnerHTML={{__html: props.post.content.substring(0,40)+"...."}} />
				<div>
					<Link to={"/posts/"+props.post.postId} className="btn btn-secondary">Read More</Link>
				</div>
			</CardBody>
		</Card>
	);
}

export default Post;
