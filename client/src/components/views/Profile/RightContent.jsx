import React, { memo } from 'react'
import {withStyles, css} from '../ui/withStyles'
const RightContent=memo((props) =>{
    const {styles} = props;
    return (
        <div 
        {...css(styles.RightContent)}
        // style={{width : '100%', maxHeight : '750px'}}
        >
            {props.children}
        </div>
    )
})

export default  withStyles(()=>({
    RightContent:{
        width : '100%',
        maxHeight : '750px',

        [`@media (min-width:1090px)`]:{
            width : '1700px'
        },
        [`@media (max-width:767px)`]:{
            width : '400px'
        }
    }

}))(RightContent)
