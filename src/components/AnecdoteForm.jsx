import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import { UseNotificationDispatch } from '../NotificationContext'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = UseNotificationDispatch()
	const setNotification = (payload) => {
    dispatch({ payload, type: 'CREATE' })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
	}

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      setNotification('too short anecdote, must have length of 5 or more');
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    setNotification(`Created anecdote '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
