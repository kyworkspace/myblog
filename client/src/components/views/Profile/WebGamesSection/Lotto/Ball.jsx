import React, { memo, PureComponent } from 'react';
import {withStyles,css} from '../../../ui/withStyles';
const Ball=memo((props)=>{
    const {number,styles}=props;
    let background;
        if(number <= 10){
            background="red";
        }else if(number<=20){
            background="orange";
        }else if(number<=30){
            background="yellow";
        }else if(number<=40){
            background="blue";
        }else{
            background="green";
        }

    return (
        <div className="ball" {...css(styles.Ball)} style={{background}}>
                {number}
            </div>
    )
})
export default withStyles(()=>({
    Ball:{
        display : 'inline-block',
        border : '1px solid black',
        borderRadius : '20px',
        width : '40px',
        height : '40px',
        lineHeight : '40px',
        fontSize : '20px',
        textAlign : 'center',
        marginRight : '20px',
    }
}))(Ball);