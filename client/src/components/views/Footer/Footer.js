import React from 'react'
import {Icon} from 'antd';
import {withStyles,css} from '../ui/withStyles'
function Footer({styles}) {
    return (
        <div {...css(styles.footer)}>
           <p> Happy Coding  <Icon type="smile" /></p>
        </div>
    )
}

export default withStyles(()=>({
    footer :{
        height: '80px', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', fontSize:'1rem',

        [`@media (max-width:780px)`]:{
            display:'none'
        }
    }

}))(Footer)
