import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, currUser, ...rest }) => {
    return (
        <Route
        {...rest}
        element={currUser ? <Element /> : <Navigate to="/" replace />}
        />
    );
};

export default ProtectedRoute;
