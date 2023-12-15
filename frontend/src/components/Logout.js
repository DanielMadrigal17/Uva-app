import axios from 'axios';

const Logout = ({ setCurrUser }) => {
    const logout = async () => {
        try {
        const response = await axios.delete('http://localhost:3001/logout', {
            headers: {
            'content-type': 'application/json',
            authorization: localStorage.getItem('token'),
            },
        });

        if (!response.status === 204) {
            throw new Error('Logout failed');
        }

        localStorage.removeItem('token');
        setCurrUser(null);
        } catch (error) {
        console.log('Error during logout:', error);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <div>
        <input type="button" value="Logout" onClick={handleClick} />
        </div>
    );
};

export default Logout;
