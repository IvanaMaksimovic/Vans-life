import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { nanoid } from "nanoid";
import Comments from './components/Comments';

export default function Reviews() {

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", comment: ""
    });

    const [comments, setComments] = useState([]);

    const [editId, setEditId] = useState(null);

    const [editMode, setEditMode] = useState(false);

    const [modal, setModal] = useState({
        message: "",
        isLoading: false
    });

    const [deletingDecision, setDeletingDecision] = useState();

    const idCommentsRef = useRef();

    const firstNameRef = useRef(null);


    function handleChange(event) {
        setFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
    
        if (formData.firstName === "" || formData.lastName === "" || formData.comment === "") {
            return;
        }
    
        const newComment = {
            id: editMode ? editId : nanoid(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            comment: formData.comment
        }
    
        let updatedComments;
    
        if (editMode) {
            const editedIndex = comments.findIndex(comm => comm.id === editId);
            if (editedIndex !== -1) {
                const tempComments = [...comments];
                tempComments.splice(editedIndex, 1); 
                updatedComments = [newComment, ...tempComments];
            }
        } else {
            updatedComments = [newComment, ...comments];
        }
            setComments(updatedComments);
            localStorage.setItem("comments", JSON.stringify(updatedComments));
            setFormData({
            firstName: "",
            lastName: "",
            comment: ""
        });
        setEditMode(false);
    }

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
        setComments(storedComments);
    }, []);

    function handleEdit(event, id) {
        const editedComment = comments.find(comm => comm.id === id);
        if (editedComment) {
            setFormData({
                firstName: editedComment.firstName,
                lastName: editedComment.lastName,
                comment: editedComment.comment
            });
            firstNameRef.current.focus();
            window.scrollTo(0, 0);
        };
        setEditMode(true);
        setEditId(id);
    }

    const handleModal = (message, isLoading) => {
        setModal({
            message: message,
            isLoading: isLoading
        })
    }

    const areYouSureDeleteModal = (type) => {
        if(type) {
                setDeletingDecision(type);
                const updatedComments = comments.filter(comm => comm.id !== idCommentsRef.current);
                setComments(updatedComments);
                localStorage.setItem("comments", JSON.stringify(updatedComments));
        
                setFormData({
                    firstName: "",
                    lastName: "",
                    comment: ""
                });
                handleModal("", false);
            } else {
                handleModal("", false);
                setDeletingDecision(false);
            }
    }

    function handleDelete(event, id) {
        console.log("Hello");
        idCommentsRef.current = id;

        event.stopPropagation();
        handleModal("Are you sure you want to delete this message?", true);
    }
        

    return (
        <div className='reviewPage'>

            <form onSubmit={handleSubmit}>
                <h4>Leave your comment...</h4>
                <input
                    type="text"
                    placeholder="First name"
                    onChange={handleChange}
                    name="firstName"
                    value={formData.firstName}
                    ref={firstNameRef}
                />

                <input
                    type="text"
                    placeholder="Last name"
                    onChange={handleChange}
                    name="lastName"
                    value={formData.lastName}
                />

                <textarea
                    placeholder="Enter your comment here"
                    value={formData.comment}
                    onChange={handleChange}
                    name="comment"
                    rows={10}
                />

                <button>Submit</button>

                <p className="title-in-review">Add your review here...</p>
            </form>

            <Comments 
            comments={comments} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            modal={modal} 
            areYouSureDeleteModal={areYouSureDeleteModal}/>
        </div>

    )
}
