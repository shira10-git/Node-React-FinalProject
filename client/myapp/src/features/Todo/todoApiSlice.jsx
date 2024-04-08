import apiSlice from "../../app/apiSlice"
const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query({
            query: (done) => ({
                url: '/api/todos/' + done,

            }),
            providesTags: ["Todos"]
        }),
        addTodo: build.mutation({
            query: (todo) => ({
                url: "api/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: build.mutation({
            query: (_id) => ({
                url: "api/todos",
                method: "DELETE",
                body: { "_id": _id }
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: build.mutation({
            query: (todo) => ({
                url: "api/todos",
                method: "PUT",
                body: todo
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
})
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApiSlice
