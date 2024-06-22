import {useState,useEffect} from 'react'
import axios from 'axios'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton'
import myImage from '../images/reicon.png'
import React from 'react'
import Cookies from 'js-cookie';

export default function Events(props) {
  const[events,setEvents] = useState([])
  const [likedEvents, setLikedEvents] = useState({});

    // Check if the key is already stored, if not, add it
    const handleLike = async (eventId) => {
      
      // // await axios.get(`http://localhost:8000/api/events/${eventId}/`).then(res => console.log(res))
      // try {
      //   const response = await axios({
      //     method:"PATCH",
      //     url:`http://localhost:8000/api/events/${eventId}/`, 
      //     data:{ 'is_liked': !likedEvents[eventId],'id': eventId},      
      // });
      // console.log(response)
      //   // Handle response if needed
      // } catch (error) {
      //   console.error(error)
      //   // Handle error if needed
      // }
      await axios.post(`https://devsai.pythonanywhere.com/api/likes`,{is_liked:!likedEvents[eventId],id:eventId})
      .then(res => console.log(res))
      .catch(err => console.log(err))
      await setLikedEvents({
        ...likedEvents,
        [eventId]: !likedEvents[eventId] // Toggle liked status
      });
    };
  useEffect(() => {
        
    axios.get('https://devsai.pythonanywhere.com/api/events/' )
    .then(res => 
      {
        console.log(res.data)
        setEvents(res.data);
    }).catch(err => console.error(err))
    
  },[likedEvents])
      if(!props.id){
        console.log(props.id,props.state,props.event)
        return (
          <div className='container'>
            <h1>Events</h1>
        {!props.event ? ( events.map((event)=>(
              
              <div className='card mx-auto my-3'key={event.id} style={{ maxWidth: '1000px' }}>
      <div className='text-center'>
        <img className='card-img-top' src={event.image} alt={event.name} style={{ width: '80%', maxHeight: '350px' }} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{event.name} </h5>
        <p className='card-text'>{event.data}</p>
        <p className='card-text'>{event.date}</p>
        <p className='card-text'>{event.location}</p>
      </div>
     {props.state && <div
        className={`heart position-absolute top-0 end-0 p-2`}
        
      >
        <div className='m-2' 
        
        style={{ cursor: 'pointer' }}>
        <svg onClick={() => handleLike(event.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={event.is_liked.includes(parseInt(Cookies.get('id'))) ? "red" : ""} className="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg><br />
        <b style={{marginLeft:3,marginTop:3}}>{event.count}</b>
        </div>
      </div>}
    </div>
    
            ))):(events.filter(event => event.name.toLowerCase().includes(props.event)|event.data.toLowerCase().includes(props.event)|event.location.toLowerCase().includes(props.event)).map((event)=>(
              
              <div className='card mx-auto my-3'key={event.id} style={{ maxWidth: '1000px' }}>
      <div className='text-center'>
        <img className='card-img-top' src={event.image} alt={event.name} style={{ width: '80%', maxHeight: '350px' }} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{event.name}</h5>
        <p className='card-text'>{event.data}</p>
        <p className='card-text'>{event.date}</p>
        <p className='card-text'>{event.location}</p>
      </div>
     {props.state && <div
        className={`heart position-absolute top-0 end-0 p-2`}
        onClick={() => handleLike(event.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className='m-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={event.is_liked.includes(parseInt(Cookies.get('id'))) ? "red" : ""} className="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg><br />
        <b style={{marginLeft:3,marginTop:3}}>{event.count}</b>
        </div>
      </div>}
              </div>)))}
            
          </div>
        )}
        else{
          console.log(props.id,"events are",events)
          return(
            <div className='container'>
              <h1>My Events</h1> 
          {events.filter((event)=> event.user_id == props.id).map((event)=>(
            
          <div className='card mx-auto my-3'key={event.id} style={{ maxWidth: '1000px' }}>
      <div className='text-center'>
        <img className='card-img-top' src={event.image} alt={event.name} style={{ width: '80%', maxHeight: '350px' }} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{event.name} ({event.id})</h5>
        <p className='card-text'>{event.data}</p>
        <p className='card-text'>{event.date}</p>
        <p className='card-text'>{event.location}</p>
        <p className='card-text'>{event.is_liked}</p>
        <p className='card-text'>{event.count >0 && 'liked by '+event.count+' persons'}</p>
      </div>

     {/* {props.state && <div
        className={`heart position-absolute top-0 end-0 p-2`}
        onClick={() => handleLike(event.id)}
        style={{ cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={event.is_liked ? "red" : ""} className="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
      </div>} */}
    </div>))}
    </div>
          )
      }}