import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
      },
      transformRequest: [
        (data) => {
          return JSON.stringify(data);
        },
      ],
})

// USER OPERATIONS
export const createUser = payload => api.post('/register', payload)
export const logUser = payload => api.post('/login', payload)
export const logOutUser = () => api.get('/logout')
export const showCurrentUser = id => api.get(`/account/${id}`)
export const updateUser = (id, payload) => api.put(`/account/${id}`, payload)
export const deleteUser = id => api.delete(`/account/${id}`)

// POST OPERATIONS
export const createPost = payload => api.post('/feed', payload)
export const showPosts = () => api.get('/feed')
export const showSelectedPost = id => api.get(`/post/${id}`)
export const updateSelectedPost = (id, payload) => api.put(`/post/${id}`, payload)
export const deletePost = id => api.delete(`/post/${id}`)

const apis = {
    createUser,
    logUser,
    logOutUser,
    showCurrentUser,
    updateUser,
    deleteUser,
    createPost,
    showPosts,
    showSelectedPost,
    updateSelectedPost,
    deletePost
}


export default apis