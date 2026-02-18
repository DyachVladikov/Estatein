import { useState, useEffect } from 'react';

import type { Error } from '@/interfaces/interfaces';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error,
}

type Routes = "reviews" | "estates" | "emails" | "faqs"

const useApi = <T,>(router:Routes): ApiState<T> => {

    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error>({HasError: false, status: 200})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        fetch(`http://localhost:3002/api/${router}`).then(response => {

            if(!response.ok)
                {
                    setError({
                       HasError: true,
                        message: "Some wrong",
                        status: response.status,
                        })
                }
                 else {
                    return response.json()
                }
            }).then(data => {
                setData(data)
            }).finally(() => 
                setLoading(false))
        
    }, [router])

    return {
        data:data,
        error: error,
        loading: loading,
    }

    
};

export default useApi;
