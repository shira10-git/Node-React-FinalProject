import apiSlice from "../../app/apiSlice"
const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/users'
            }),
            providesTags: ["Users"]
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: build.mutation({
            query: (_id) => ({
                url: "api/users",
                method: "DELETE",
                body: { "_id": _id }
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["Users"],
        }),
        getUserById: build.mutation({
            query: (_id) => ({
                url: "api/users/"+_id,
                method: "GET",
              
            }),
            invalidatesTags: ["Users"],
        }),
    }),
})
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation, useGetUserByIdMutation } = userApiSlice
