import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentNotAvailable() {
  return (
    <div className='reviewModal'>
      <div>
      <h1>Sorry, this content isn't available right now</h1>
      </div>
      
     <div>
      <p>The link you followed may have expired, or the page may only be visible to an audience you are not in.</p>
      <Link to="/vans">Go back to the list of vans</Link>
      </div>
    </div>
  )
}
