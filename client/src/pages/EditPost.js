import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client'; // Importing the Supabase client

const EditPost = ({ data }) => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, title: "", author: "", description: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Asynchronous function to update post in the database
    const updatePost = async (event) => {
        event.preventDefault(); // Prevent form submission
        
        try {
            await supabase
                .from('Posts')
                .update({ title: post.title, author: post.author, description: post.description })
                .eq('id', id); // Update post where id matches the current post's id

            // Redirect to the home page after successful update
            window.location = "/";
        } catch (error) {
            console.error('Error updating post:', error.message);
            // Handle error, e.g., display error message to the user
        }
    };

    // Asynchronous function to delete post from the database
    const deletePost = async (event) => {
        event.preventDefault(); // Prevent form submission
        
        try {
            await supabase
                .from('Posts')
                .delete()
                .eq('id', id); // Delete post where id matches the current post's id

            // Redirect to the home page after successful deletion
            window.location = "/";
        } catch (error) {
            console.error('Error deleting post:', error.message);
            // Handle error, e.g., display error message to the user
        }
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}></textarea>
                <br />
                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button> {/* Add onClick event handler for deletePost */}
            </form>
        </div>
    );
};

export default EditPost;
