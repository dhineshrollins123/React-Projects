import { myAxios, privateAxios } from "./handler";

export const createPost = (post,user) => {

    const postBody = {
      title: post.title,
      content: post.content
    }

   return privateAxios.post("/api/user/"+user.userId+"/category/"+post.categoryId+"/posts",postBody)
   .then(response => response.data);
}

export const submitComment = (comment,postId)=>{
  const commentBody = {
    content: comment
  }
  return privateAxios.post(`/api/posts/${postId}/comments`,commentBody).then(response => response.data);
}

export const retrieveAllPostsWithDefaultPaging = ()=>{
  return myAxios.get("/api/posts/page").then(response => response.data);
}

export const retrieveAllPostsWithPaging = (pgNumber)=>{
  return myAxios.get("/api/posts/page?pageNumber="+pgNumber).then(response => response.data);
}

export const retrieveAllPosts = ()=>{
  return myAxios.get("/api/posts/list").then(response => response.data);
}

export const loadParticularPostById = (id)=>{
  return myAxios.get("/api/posts?postId="+id).then(response => response.data);
}
