import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from '../requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { UseNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const dispatch = UseNotificationDispatch()
  const setNotification = (payload) => {
    dispatch({ payload, type: 'CREATE' })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }

  const voteMutation = useMutation({ 
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    setNotification(`Voted for anecdote '${anecdote.content}'`)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isPending) {
    return <span>Loading...</span>
  }

  if (result.isError) {
    return <span>Anecdote service not available due to problems in the server ({result.error.message})</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
