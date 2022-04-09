import { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import NavbarMenu from './../layout/NavbarMenu';

function ProtectedRoute({ component: Component }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <NavbarMenu />
          <Component />
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default ProtectedRoute;
