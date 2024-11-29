import { useStore } from '../store';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectRoute(props: any) {
  const {state} = useStore()!;
  const location = useLocation();

  // If the user is logged in, keep them from visiting the auth form pages
  if (!state.loading && state.user && location.pathname.match(/(register|login)/gi)) {
    return <Navigate to="/dashboard" />
  }

  // If the user is not logged in and they try to visit a user related page, take them to the login page
  if (!state.loading && !state.user && location.pathname.match(/(pet|post|dashboard)/gi)) {
    return <Navigate to="/login" />
  }

  return props.children;
}

export default ProtectRoute;