// src/Body.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Body.css';
import blogimg from '../../assets/hitchcock.jpg'

const GET_RECENT_POSTS = gql`
  {
    posts {
      id
      title
      excerpt
      createdAt
      featuredImage {  
        url
      }
    }
  }
`;

const Body = () => {
    const { loading, error, data } = useQuery(GET_RECENT_POSTS);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error fetching posts: {error.message}</p>;

    return (
        <div className="body-container">
            <div className="main-content">
            <div className="image-container">
          <img src={blogimg} alt="Blog Image" className="content-image" />
        </div>
        
        <div className="content-text">
          <h2>A CHRONICLE OF ADVENTURES & MISADVENTURES BY A MODERN EXPLORER</h2>
          <p>
            Using exploration to help foster a more sustainable world through adventure and food.
          </p>
        </div>

            </div>

            <div className="recent-posts-container">
                <h2 className="recent-posts-title">Recent Posts</h2>
                <div className="posts-list">
                    {data.posts.length === 0 ? (
                        <p>No recent posts available.</p>
                    ) : (
                        data.posts.map(post => (
                            <div key={post.id} className="post-item">
                                {post.featuredImage && (
                                    <img
                                        src={post.featuredImage.url}
                                        alt={post.title}
                                        className="post-item-image"
                                    />
                                )}
                                <h3 className="post-item-title">{post.title}</h3>
                                <p className="post-item-excerpt">{post.excerpt}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Body;