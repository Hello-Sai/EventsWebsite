import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heart from 'react-animated-heart'
import {useNavigate} from 'react-router-dom'
const AddEvent = () => {
  // const [formData, setFormData] = useState({
  //   event: {
  //     name: 'Event Name',
  //     data: 'Event Data',
  //     time: 'Event Time',
  //     date: 'Event Date',
  //     location: 'Event Location',
  //     image: 'Event Image URL',
  //     isLiked: true,
  //   }
  // })
  const [name,setName] = useState("");
  const [data,setData] =useState("");
  const [time,setTime] =useState("");
  const [date,setDate] =useState("");
  const [image,setImage]=useState(null);
  const [location,setLocation] =useState("");
  const [isLiked,setIsLiked] =useState(false);
  // const [isClick, setClick] = useState(false);
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  
  const addEventInfo = async () => {
    let formData = new FormData();
    console.log(name,data,time,date,location,isLiked,image)
    formData.append('name',name)
    formData.append('data',data)
    formData.append('time',time)
    formData.append('date',date)
    // formData.append('image',image)
    formData.append('location',location)
    // formData.append('is_liked',isLiked)
    if(image !==null)
      formData.append('image',image)
    alert(JSON.stringify(formData))
    // let formData = new FormData()
    await axios({
      method:'post',
      url: 'http://localhost:8000/api/events/',
      data:formData,
      headers:{
        'Content-Type': 'multipart/form-data'
      }},)
      .then((response) => {
        
        console.log('Event created successfully', response.data);
        // window.history.replaceState(window.history.state, document.title, window.location.href);
        // Optionally, perform additional actions after successful post
      })
      .catch((error) => {
        console.error('Error creating event');
        console.error(error)
        navigator.clipboard.writeText(error.response.data)
        console.log(error.response.data)
        // Optionally, handle error cases
        alert(error.response.data)
      })
  }

  return (
    <form name='myform' encType="multipart/form-data">
      <div className='container border border-success' style={{padding:15}}>
      <h1 style={{textAlign:'center'}}>Event Managing System</h1>
      <div>
        <label className='form-label'>Name:</label>
        <input
          style={{outline:'black'}}
          className='form-control'
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className='form-label'>Data:</label>
        <input
          className='form-control'
          type="text"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          className='form-control'
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label className='form-label'>Date:</label>
        <input
          className='form-control'
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label className='form-label'>Location:</label>
        <input
          className='form-control'
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label className='form-label'>Image URL:</label>
        <input mut
          type="file"
          className='form-control'
          name="image"
          src={image}
          accept="image/jpeg,image/png,image/gif"
          onChange={(e) => {setImage(e.target.files[0])}} />
      </div>
      <div className='m-2'>
      
      </div>
      <div style={{textAlign:"center",margin:"auto"}}>
      <button  onClick={addEventInfo} className='btn btn-dark'>Submit</button>
      </div>
      </div>
      </form>
  );
};

export default AddEvent;
