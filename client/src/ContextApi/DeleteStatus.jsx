import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetLoaderFalse } from '../features/Contact/ContactSlice';

function useDeleteStatus() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetLoaderFalse());
  }, []);

  return {
    status: true
  };
}

export default useDeleteStatus;
