import React from 'react';
import './About.css';

function About(props){
    console.log(props)
    return (
        <div className="about__container">
            <span>
                "인생은 마라톤"
            </span>
            <span>
                어딘가에서
            </span>
        </div>
    )
}

export default About;