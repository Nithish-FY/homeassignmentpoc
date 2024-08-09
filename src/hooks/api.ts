import { useState, useEffect, useCallback } from 'react';

type UseFetchOptions = RequestInit;

interface UseFetchReturn<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

const useFetch = <T>(url: string, options: UseFetchOptions = {}): UseFetchReturn<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}
			const result: T = await response.json();
			setData(result);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		return () => {
			fetchData();
		};
	}, []);

	return { data, loading, error, refetch: fetchData };
};

export default useFetch;
