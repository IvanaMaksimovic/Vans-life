// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import {nanoid} from "nanoid";

// export default function ReviewsOld() {

//   const [formData, setFormData] = useState({
//     firstName:"", lastName: "", comment: ""
//   });

//   const [comments, setComments] = useState([]);

//   const [editId, setEditId] = useState(null);

//   const [editMode, setEditMode] = useState(false);

  
//   const [modal, setModal] = useState({
//     message: "Are you sure you want to delete this comment?",
//     isLoading: true
// })



//   function handleChange(event) {
//     setFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
//   }


//   function handleSubmit(event) {
//     event.preventDefault();

//     if(formData.firstName === "" || formData.lastName === "" || formData.comment === "") {
//       return;
//     };

//     const newComment = {
//       id: editMode ? editId : nanoid(),
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       comment: formData.comment
//     };

//     let updatedComment;

//     if(editMode){
//       updatedComment = comments.map(comm => comm.id === editId ? newComment : comm);
//     } else {
//       updatedComment = [newComment, ...comments];
//     }

//     setComments(updatedComment);
//     localStorage.setItem("comments", JSON.stringify(updatedComment));

//     setFormData({
//       firstName: "",
//       lastName: "",
//       comment: ""
//     });

//     setEditMode(false);
//       }

//    useEffect(() => {
//    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
//    setComments(storedComments);
//    }, []);

//    function handleDelete(event, id) {
//     event.stopPropagation();
//     const updatedComments = comments.filter(comm => comm.id !== id);
//     setComments(updatedComments);
//     localStorage.setItem("comments", JSON.stringify(updatedComments));

//     setFormData({
//       firstName: "",
//       lastName: "",
//       comment: ""
//     });
//    }

//    function handleEdit(event, id) {
//     const editedComment = comments.find(comm => comm.id === id);
//     if(editedComment) {
//     setFormData({
//       firstName: editedComment.firstName,
//       lastName: editedComment.lastName,
//       comment: editedComment.comment
//     })
//   };
//     setEditMode(true);
//     setEditId(id);
//    }


//   const placeForComments = 
//   <div className="section-for-comments">
//  <h2>Comments:</h2>
//   {
//   comments ? 
  
//       <ul>
//         {comments.map(comment => (
//           <>
//           <li key={comment.id}>
//             <p className="place-for-details-about-user">{comment.firstName} {comment.lastName}:</p> 
//             <p className="place-for-comments">{comment.comment}</p>
//           </li>

//                   <button className="deleteButton" onClick={(event) => handleDelete(event, comment.id)}>Delete</button>
//                   <button className="editButton" onClick={(event) => handleEdit(event, comment.id)}>Edit</button>

//                   </>

//         ))}
//       </ul>

//       : <p>There are no comments available</p>
//         }
//   </div>


//   return (
//     // <div className='reviewModal'>
//     //   <div>
//     //   <h1>Sorry, this content isn't available right now</h1>
//     //   </div>
      
//     //  <div>
//     //   <p>The link you followed may have expired, or the page may only be visible to an audience you are not in.</p>
//     //   <Link to="/">Go back to the home page</Link>
//     //   </div>
//     // </div>


//     <div className='reviewPage'>

//     <form onSubmit={handleSubmit}>
//       <h4>Leave your comment...</h4>
//       <input
//       type="text"
//       placeholder="First name"
//       onChange={handleChange}
//       name="firstName"
//       value={formData.firstName}
//       />

//       <input 
//       type="text"
//       placeholder="Last name"
//       onChange={handleChange}
//       name="lastName"
//       value={formData.lastName}
//       />

//       <textarea 
//       placeholder="Enter your comment here"
//       value={formData.comment}
//       onChange={handleChange}
//       name="comment"
//       rows={10}
//       />

//       <button>Submit</button>

//       <p className="title-in-review">Add your review here...</p>
//     </form>

//     {placeForComments modal={modal}}
//     </div>

//   )
// }
