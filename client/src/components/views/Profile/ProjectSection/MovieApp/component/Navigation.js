import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

function Navigation(){
    return(
        <div className="nav">
            <Link to="/profile/project/movieApp/Home">Home</Link>
            <Link to='/profile/project/movieApp/About'>About</Link>
            {/* route props에 값을 담아 보내는 방법 */}
        </div>
    );
}

export default Navigation;