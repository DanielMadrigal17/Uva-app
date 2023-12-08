const Logout = ({ setCurrUser }) => {
    const logout = async () => {
        try {
            const response = await fetch("http://localhost:3001/logout", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            localStorage.removeItem("token");
            setCurrUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleClick = e => {
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
