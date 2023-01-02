import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllCategories } from "../services/category-service";

function CategorySideBar() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getAllCategories()
			.then((data) => {
				setCategories([...data]);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error while loading categories !");
			});
	}, []);
	return (
		<div>
			<ListGroup>
				<ListGroupItem tag={Link} to="/" action="true" className="border-0">
					All Blogs
				</ListGroupItem>

				{categories &&
					categories.map((category) => {
						return (
							<ListGroupItem
								tag={Link}
								to={"/categories/" + category.categoryId}
								key={category.categoryId}
								action="true"
								className="border-0 shadow-0 mt-1"
							>
								{category.categoryTitle}
							</ListGroupItem>
						);
					})}
			</ListGroup>
		</div>
	);
}

export default CategorySideBar;
