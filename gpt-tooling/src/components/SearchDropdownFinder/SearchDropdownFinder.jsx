import React, { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Input } from 'react-daisyui'
import supabaseClient from '~/utils/supabase/supabaseBrowserClient'

function SearchDropdownFinder({
  userId,
  onSearch,
  onSelect
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const supabase = supabaseClient()

  useEffect(() => {
    const fetchAgents = async () => {
      if (query.length === 0) {
        setResults([])
        return
      }

      const { data, error } = await onSearch({ supabase, user_id: userId, query })

      if (error) {
        console.error('Error fetching agents', error)
      } else {
        setResults(data)
      }
    }

    const debouncedFetch = debounce(fetchAgents, 300)
    debouncedFetch()

    return () => debouncedFetch.cancel()
  }, [query])

  const onSelectOption = async ({ supabase, user_id: userId, id }) => {
    onSelect({ supabase, user_id: userId, id })
    setQuery('')
    setResults([])
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for agents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="join-item w-full"
      />
      {results.length > 0 ? (
        <ul>
          {results.map(({ id, title }) => {
            return (
              <li key={id} className="cursor-pointer" onClick={async () => await onSelectOption({ supabase, user_id: userId, id })}>
                {title}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default SearchDropdownFinder
