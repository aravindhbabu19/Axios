
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Navi from './Navi';
import { useEffect, useState } from 'react';
import Newpost from './Newpost';
import {format} from 'date-fns'
import Postpage from './Postpage';
import api from './api/Posts'
import Missing from './Missing';
import EditPost from './EditPost';

function App() {
  const [search,setSearch]=useState('')
  const [Title,SetTitle]=useState('')
  const [Content,SetContent]=useState('')
  const [searchResult,setSearchResult]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editContent,setEditContent]=useState('')
  const navigate=useNavigate()
  const [post,setPost]=useState([])
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const id=post.length ?post[post.length-1].id+1:1
    const date=format(Date(),'dd-mm-yyyy')
    const addn={id,title:Title,date,content:Content}
    try{
      const response=await api.post('/post',addn)
    const result=[...post,response.data]
    setPost(result)
    navigate('/')
    }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`Error:${err.message}`);
      }
    }
  }
  const handleDelete=async(id)=>{
    try{
    const result=post.filter((po)=>po.id!==id)
    await api.delete(`post/${id}`)
    setPost(result)
    navigate('/')
    }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`Error:${err.message}`);
      }
    }
  }
  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response=await api.get('/post')
        setPost(response.data)
      }
      catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else{
          console.log(`Error:${err.message}`);
        }
      }
      
    }
    fetchPost()
  },[])
  useEffect(()=>{
    const result=post.filter((post)=>post.title.toLowerCase().includes(search)||post.content.toLowerCase().includes(search))
    setSearchResult(result) 
  },[post,search])

  const handleEdit=async(id)=>{
    const date=format(Date(),'dd-mm-yyyy')
    const updated={id,title:editTitle,date,content:editContent}
    try{
      const response=await api.put(`post/${id}`,updated)
      setPost(post.map((po)=>po.id===id ? {...response.data} :po))
      setEditTitle('')
      setEditContent('')
      navigate('/')
    }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`Error:${err.message}`);
      }
    }
  }
  return (
    <div>
      <Navi search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home post={searchResult} />} />
        <Route path='/New'>
        <Route index element={<Newpost handleSubmit={handleSubmit} Title={Title} SetTitle={SetTitle} Content={Content} SetContent={SetContent} />}/>
        <Route path=':id' element={<Postpage post={post} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path='/Abo' element={<About />} />
        <Route path='/edit/:id' element={<EditPost post={post} editTitle={editTitle} setEditTitle={setEditTitle} editContent={editContent} setEditContent={setEditContent} handleEdit={handleEdit} />} />
       <Route path='*
       ' element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
