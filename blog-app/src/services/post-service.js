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

export const uploadImageForPost = (image,postId) => {
  let obj = new FormData();
  obj.append("image",image);
  return privateAxios.post(`/api/posts/image/upload/${postId}`,obj).then(response => response.data);
}

export const getParticularUserPosts = (userId) =>{
  return myAxios.get(`/api/user/${userId}/posts`).then(response => response.data);
}

export const deleteParticularPost = (postId) =>{
  return privateAxios.delete(`/api/posts?postId=${postId}`).then(response => response.data);
}


export const updatePostService = (postId,post) => {
  console.log("post updating : ",JSON.stringify(post));
  return privateAxios.put(`/api/posts?postId=${postId}`,post).then(response => response.data);
}