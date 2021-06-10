import React from "react";

const Hero=({handleLogout}) => {
    return(
        <selection className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

        </selection>

    )
}
export default Hero;