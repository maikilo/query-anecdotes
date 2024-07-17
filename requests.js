import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (anecdote) => 
  axios.post(baseUrl, anecdote).then(res => res.data)

export const update = (anecdote) => 
  axios.post(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)