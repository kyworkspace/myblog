import React,{memo, useContext} from 'react'
import { TableContext } from './MineFind'
import Tr from './Tr'
import {withStyles,css} from '../../../ui/withStyles';

const Table = memo(({styles}) => {
    const {tableData} = useContext(TableContext)
    return (
        <table {...css(styles.table)}>
            {Array(tableData.length).fill().map((tr,i)=><Tr  key={`tr${i}`} rowIndex={i}/>)}
        </table>
    )
})

export default withStyles(()=>({
    table : {
        borderCollapse: 'collapse',
    }
}))(Table)
