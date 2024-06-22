import {Component, useState,useEffect} from 'react'
import axios from 'axios'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton'

class LikedEvents extends Component{
    constructor(props) {
        super(props);
        this.state = {
          events: [],
        };
      }
      componentDidMount(){
        
        axios.get('https://devsai.pythonanywhere.com/api/likes' )
        .then(res => 
          {
            console.log(res.data)
            this.setState({
            events:res.data.events,
          })
        }).catch(err => console.error(err))
        
      }
      render() {

        return (
          <div className='container'>
            <h1 > Likes</h1>
            {this.state.events.map((event)=>(


                                        <div className='card mx-auto my-3'key={event.id} style={{ maxWidth: '1000px' }}>
                                        <div className='text-center'>
                                          <img className='card-img-top' src={`https://devsai.pythonanywhere.com/${event.image}`} style={{ width: '80%', maxHeight: '350px' }} />
                                        </div>
                                        <div className='card-body'>
                                          <h5 className='card-title'>{event.name} ({event.id})</h5>
                                          <p className='card-text'>{event.data}</p>
                                          <p className='card-text'>{event.date}</p>
                                          <p className='card-text'>{event.location}</p>
                                          <p className='card-text'>{event.is_liked}</p>
                                        </div>
                                        </div>

            ))}
            
          </div>
        )
      }
}
export default LikedEvents