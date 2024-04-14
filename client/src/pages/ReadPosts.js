import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // Assuming Card component is defined
import { supabase } from '../client'; // Importing supabase client

const ReadPosts = () => {
    const [posts, setPosts] = useState([]); // State variable to store posts

    useEffect(() => { // useEffect hook to fetch posts when component mounts
        fetchPosts(); // Fetch posts when component mounts
    }, []); // Run effect only once when component mounts

    const fetchPosts = async () => { // Asynchronous function to fetch posts from Supabase
        try {
            const { data, error } = await supabase.from('Posts').select(); // Fetch all posts from 'Posts' table
            if (error) {
                throw error; // Throw error if there's any issue fetching posts
            }
            setPosts(data); // Update state with fetched posts
        } catch (error) {
            console.error('Error fetching posts:', error.message); // Log error message to console
        }
    };

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ? // Check if posts exist and are not empty
                posts.map((post, index) => // Map through posts array
                    <Card key={index} id={post.id} title={post.title} author={post.author} description={post.description} /> // Render Card component for each post
                ) : <h2>{'No Challenges Yet 😞'}</h2> // Render message if no posts
            }
        </div>
    );
};

export default ReadPosts;
