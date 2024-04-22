import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const EditPost = ({post,editTitle,setEditTitle,editContent,setEditContent,handleEdit}) => {
    const {id}=useParams();
    const posts=post.find(po=>(po.id).toString()===id);
    useEffect(()=>{
        if(posts){
            setEditTitle(posts.title)
            setEditContent(posts.content)
        }
    },[posts,setEditTitle,setEditContent])
  return (
    <div>
        {editTitle &&
        <>
        <h2>Edit Post</h2>
        <form onSubmit={handleEdit}>
            <label htmlFor="title">Title</label>
            <input type='text' id='title' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
            <label htmlFor="content">Content</label>
            <input type='text' id='content' value={editContent} onChange={(e)=>setEditContent(e.target.value)} />
            <button type='submit' onClick={()=>handleEdit(posts.id)}>Edit</button>
        </form>
        </>
        }
        {!editTitle &&
        <>
        <h2>Post not found</h2>
        <p>Please visit home page</p>
        </>}
    </div>
  )
}

export default EditPost