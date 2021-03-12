import React, { memo } from 'react'
import Tr from './Tr'
import { withStyles, css} from '../../../ui/withStyles'
const Table=memo(({onClick,tableData,dispatch,styles}) =>{
    return (
        <table {...css(styles.table)}>
            {Array(tableData.length).fill().map((tr,i)=><Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} >{''}</Tr>)}
        </table>
    )
});

export default withStyles(()=>({
    table : {
        borderCollapse : 'collapse'
    }

}))(Table)
