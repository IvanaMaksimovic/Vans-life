import React from 'react';
import Modal from '../../../../components/Modal';

export default function Comments({comments, handleDelete, handleEdit, modal, areYouSureDeleteModal}) {


    return (
        <>
        {modal.isLoading && <Modal message={modal.message} onModal={areYouSureDeleteModal} />}
        <div className="section-for-comments">
            <h2>Comments:</h2>
            {
                comments ?

                    <ul>
                        {comments.map(comment => (
                            <> 
                                <li key={comment.id}>
                                    <p className="place-for-details-about-user">{comment.firstName} {comment.lastName}:</p>
                                    <p className="place-for-comments">{comment.comment}</p>

                                    
                                <button className="deleteButton" onClick={(event) => handleDelete(event, comment.id)}>Delete</button>
                                <button className="editButton" onClick={(event) => handleEdit(event, comment.id)}>Edit</button>

                                </li>
                            </>

                        ))}
                    </ul>

                    : <p>There are no comments available</p>
            }
        </div>
        </>
    )
}
