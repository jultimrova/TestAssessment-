import React from 'react';

const Post = ({title, body, editPost, deletePost, id}) => {
    return (
        <>
            <section className="post-container">
                <h2>{title}</h2>
                <p className="post-content"> {body}</p>
                <button className="button" onClick={() => editPost(id)}>Edit</button>
                <button className="button" onClick={() => deletePost(id)}>Delete</button>
            </section>
        </>
    );
};

export default Post