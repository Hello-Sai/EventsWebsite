import React, { Component, useState } from 'react'
import 'bootstrap'
import Header from './Header'

// const Buttons = ({ toggleEvents,toggleForm,value,toggleState }) => {
//   return (
//     <div className='container'>
//     <div className='text-end'>
//       <button onClick={toggleForm} className="btn btn-primary" >{value[0]}</button>
//       <button className='btn btn-success' onClick={toggleEvents} >{value[1]}</button>

//       <button className='btn btn-info' onClick={toggleState}>{value[2]}</button>
//     </div>
    
//     </div>
//   )
// }

// export default Buttons


export default function Buttons({toggleState,state,filterEvents,username}) {
  const searchEvent = async (e) =>{
    filterEvents(e.target.value)
  }
  return (
    // <div className='container-fluid'>
    //     <div className='text-start' ><div style={{color: '#f44336',fontSize:30,fontStretch:50}}>Event Site</div>
    //     <div>
    //       <button className="btn btn-light  rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2   me-1" onClick={() =>toggleState('login')}>{ 'login'}</button>
    //       <button className="btn btn-light  rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2   me-1" onClick={() =>toggleState('register')}>{ 'register'}</button>
    //       <button className='btn btn-light  rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2   me-1' onClick={() =>toggleState('events')}>{'Events'} </button>
    //       <button className='btn btn-light  rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2   me-1' onClick={() =>toggleState('likes')}>{'likes'} </button>
    //       <button className='btn btn-light  rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2   me-1' onClick={() =>toggleState('createevent')}>{'create event'}</button>
    //     </div>
    //     </div>
    // </div>
    <div className='container-fluid mt-1'>
    <div className='row align-items-center border-bottom' style={{borderBlockEndColor:"#dde",marginBottom:10}}>
        <div className='col'>
            <div style={{color: '#f44336', fontSize: 30, fontStretch: 50}}>Event Site <span style={{color:"black"}}>&nbsp;{state &&`Hello, ${username}`}&nbsp;&nbsp;</span></div>
            
        </div>
        <div className='col'>
          <input type='search' className='form-control'placeholder='Search' onChange={searchEvent}/>
        </div>
        <div className='col-auto'>
            
            {!state && <button className="btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1" onClick={() => toggleState('login')}>Login</button>}
            {!state &&<button className="btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1" onClick={() => toggleState('register')}>Register</button>}
            <button className='btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1' onClick={() => toggleState('events')}>Events</button>
            {state &&<button className='btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1' onClick={() => toggleState('likes')}>Likes</button>}
            {state && <button className="btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1" onClick={() => toggleState('myevents')}>My Events</button>}
            {state && <button className='btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1' onClick={() => toggleState('createevent')}>Create Event</button>}
            {state && <button className="btn btn-light rounded-pill bg-grey border border-secondary ps-3 pe-3 mb-2 me-1" onClick={() => toggleState('logout')}>logout</button>}
        </div>
    </div>
</div>

  )
}
