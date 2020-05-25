import React, {useState, useRef, useEffect} from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import ModifyPost from "./ModifyPost"

const BASE_URL = 'https://simple-blog-api.crew.red';

const DisplayAllPosts = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [isCreateNewPost, setIsCreateNewPost] = useState(false);
    const [isModifyPost, setIsModifyPost] = useState(false);
    const [editPostId, setEditPostId] = useState("");


    // Initialize useRef
    const getTitle = useRef();
    const getBody = useRef();

    const savePostTitleToState = event => {
        setTitle(event.target.value);
    };

    const savePostBodyToState = event => {
        setBody(event.target.value);
    };

    const toggleCreateNewPost = () => {
        setIsCreateNewPost(!isCreateNewPost);
    };

    const toggleModifyPostComponent = () => {
        setIsModifyPost(!isModifyPost)
    };

    const editPost = id => {
        setEditPostId(id);
        console.log(id)
        toggleModifyPostComponent();
    };

    const deletePost = id => {
        const modifiedPost = allPosts.filter(eachPost => {
            return eachPost.id !== id;
        });
        setAllPosts(modifiedPost);
    };
    const updatePost = (event) => {
        event.preventDefault();
        const updatedPost = allPosts.map(eachPost => {
            if (eachPost.id === editPostId) {
                console.log([eachPost.id, editPostId] )
                return {
                    ...eachPost,
                    title: title || eachPost.title,
                    body: body || eachPost.body
                };
            }
            console.log(eachPost)
            return eachPost;
        });
        setAllPosts(updatedPost);
        toggleModifyPostComponent();
    };

    const savePost = event => {
        event.preventDefault();
        const id = Date.now();
        setAllPosts([...allPosts, { title, body, id }]);
        console.log(allPosts);
        setTitle("");
        setBody("");
        getTitle.current.value = "";
        getBody.current.value = "";
        toggleCreateNewPost();
    };
    if (isCreateNewPost) {
        return (
            <>
                <CreateNewPost
                    savePostTitleToState={savePostTitleToState}
                    savePostBodyToState={savePostBodyToState}
                    getTitle={getTitle}
                    getBody={getBody}
                    savePost={savePost}
                    deletePost={deletePost}
                />
            </>
        );
    }
    else if (isModifyPost) {
        const post = allPosts.find(post => {
            return post.id === editPostId;
        });

        return (
            <ModifyPost
                title={post.title}
                body={post.body}
                updatePost={updatePost}
                savePostTitleToState={savePostTitleToState}
                savePostBodyToState={savePostBodyToState}
            />
        );
    }
    return (
        <>
            {!allPosts.length ? (
                <section className="no-post">
                    <h1>No Post Found!</h1>
                    <h3>There is nothing to see here.</h3>
                    <br />
                    <br />
                    <section className="button-wrapper">
                        <button onClick={toggleCreateNewPost} className="button">Create New</button>
                    </section>
                </section>
            ) : (
                <div><h1>All Posts</h1>
                    <section className="all-post">
                        {allPosts.map(eachPost => {
                            return (
                                <Post
                                    id={eachPost.id}
                                    key={eachPost.id}
                                    title={eachPost.title}
                                    body={eachPost.body}
                                    editPost={editPost}
                                    deletePost={deletePost}
                                />
                            );
                        })}
                        <section className="button-wrapper">
                            <button onClick={toggleCreateNewPost} className="button">Create New</button>
                        </section>
                    </section>

                </div>
            )}

        </>
    );
};
export default DisplayAllPosts;