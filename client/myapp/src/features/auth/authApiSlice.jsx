import apiSlice from "../../app/apiSlice"
const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (loginData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: loginData
            })
        })
    })
})
export const {  useLoginMutation } = authApiSlice
