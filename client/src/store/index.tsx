import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@apollo/client';

import { GET_USER } from '../graphql/queries';

interface StoreProviderProps {
  children: React.ReactNode;
}

interface StateValue {
  loading: boolean;
  user: any;
}

interface ContextValue {
  state: StateValue;
  setState: React.Dispatch<React.SetStateAction<StateValue>>;
}

const StoreContext = createContext<ContextValue | undefined>(undefined);

const initialState = {
  loading: true,
  user: null
}

export function StoreProvider(props: StoreProviderProps) {
  const [state, setState] = useState(initialState);
  const {data, loading} = useQuery(GET_USER);

  useEffect(() => {
    
    if (!loading) {
      setState({
        ...state,
        loading: false,
        user: data.getUser.user
      })
    }

  }, [data]);

  return (
    <StoreContext.Provider value={{
      state: state,
      setState: setState
    }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)