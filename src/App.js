import React, { useEffect } from 'react';
import Buttons from './components/Buttons';
import AddEvent from './components/AddEvent';
import {useState} from 'react'
import Header from './components/Header';
import Cookies from 'js-cookie'
import Events from './components/Events';
import MyEvents from './components/MyEvents'
import LikedEvents from './components/LikedEvents'
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
axios.defaults.xsrfCookieName='csrftoken'
axios.defaults.xsrfHeaderName='X-CSRFToken'
axios.defaults.withCredentials = true
function App() {
  const API = axios.create({
    baseURL:"https://devsai.pythonanywhere.com/api"
  });
  const[currentUser,setCurrentUser] = useState(() => localStorage.getItem('userId')?true:false);

  const [event,setEvent]= useState(false);
  const [userId,setUserId]=useState(0)
  const [username,setUsername]=useState('')

  const filterEvents = async (value) =>{
    setEvent(value);
    console.log(value)
  }
  // const toggleForm = () => {
  //   !EventForm ?setEventForm(true):setEventForm(false);
  // };
  
  const [State,setState] = useState("events");
  useEffect(()=>{
     {
     Cookies.get('id') && API.get('/user')
    .then(function(res){
        setUserId(Cookies.get('id'));
        setUsername(res.data.username)
        console.log(res.data)
        setState('events')
    }).catch(function(error){
      console.log(error)
    })
  }},[currentUser])
  const toggleUser = () =>{
    setCurrentUser(!currentUser);
  }
  const toggleEvents = () =>{
    setEvent(!event);
    API.get('/events').then(res =>{console.log(res.data)})
  }
  const HandleLoginSubmit = async (e) =>{
    e.preventDefault();
    console.log(e)
   await API.post(`/login`,{
      username:e.target.username.value,
      password:e.target.password.value
    })
    .then(res => {
      localStorage.setItem("userId",Cookies.get('id'));
      console.log(res.data);
      setCurrentUser(true);
      setState('events');
      // toggleHeader(currentUser)
  }).catch(err=>{alert(JSON.stringify(err.response.data));})
  }
  
  const HandleRegistrationSubmit = async (e) =>{
    e.preventDefault();
    await API.post('register',{
      username:e.target.username.value,
      password:e.target.password.value
    }).then(res => alert(res.data)).catch(err =>{
      
       alert(err.response.data.username)})
  }
  const handleLogout = () =>{
    API.get(`logout`,{
      withCredentials:true
    })
    .then(function(res){
      localStorage.removeItem('userId')
      setCurrentUser(false);
      console.log(JSON.stringify(res.data));
      setState('login')

    }).catch(err => console.error(JSON.stringify(err)));
  }
  const toggleState = (State) =>{

    setState(State)
  }
  
  return (
    
    <div className="flexbox-container">
      {/* <div><Header /></div>
      <div><Buttons
            toggleState={() =>{
              setEventForm(false)
              setState(!State);
            }}
            toggleForm={toggleForm}
            toggleEvents={toggleEvents}
            value={[EventForm ? "close":"Create Event",event?"Hide":"Your Events",State?"Register":"Login"]}/></div>
      <div>{EventForm && <AddEvent />}</div>
      <div>{event && <Events />}</div>
      <h1 style={{marginTop:"8px"}}></h1>
      {!EventForm ? (!State?
      <Register onSubmit={HandleRegistrationSubmit}/>:
        <Login onSubmit={HandleLoginSubmit}/>

    ):(<></>)} */}<Buttons username={username} filterEvents={filterEvents} toggleState={toggleState} state={currentUser}/>
        {(() => {
            switch (State){
              case "register":
                return <Register onSubmit={HandleRegistrationSubmit}/>;
              case "login":
                return <Login onSubmit={HandleLoginSubmit}/>;
              case "events":
                return <Events event={event} state={currentUser}/>;
              case "createevent":
                return <AddEvent />;
                case "myevents":
                  return <Events id={userId} event={event}  state={true}/>;
              case "logout":
                return handleLogout();
              case "likes":
                return <LikedEvents />;
            }
        })()}
    </div>
  )
      }
export default App