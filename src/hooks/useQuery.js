import { useEffect, useState } from 'react'

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDate()
  }, dependencies)

  const fetchDate = async (query) => {
    try {
      const res = await promise(query)
      setData(res?.data?.data || [])
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchDate
  }
}

export default useQuery
