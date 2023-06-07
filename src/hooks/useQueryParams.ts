import { useSearchParams } from 'react-router-dom';

// Convert querystring to object
export default function useQueryParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}
