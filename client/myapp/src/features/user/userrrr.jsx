import React from 'react';

import { useGetUsersQuery } from './userApiSlice';


//להוספה מה שבהערה
// import { useAddBlogMutation } from './blogApiSlice';

// const [addBlog, {isError, isSuccess, error}] =useAddBlogMutation()

// const handleSubmit = (e) => {
//     e.preventDefault();
//     addBlog(formData)
//     };

const UserList = () => {
    console.log("afwtgysfdgfty");
    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    console.log(users);
    return (
        <div className="user-list">
            {users.map((user) => (

                {}
            ))}
        </div>
    );
};
export default UserList;