import React, { memo, useCallback, useEffect, useRef } from 'react';
import {CLICK_CELL} from './TikTakTok'
import {withStyles,css} from '../../../ui/withStyles';
const Td = memo(({rowIndex,cellIndex,dispatch,cellData, styles})=>{

    // const ref = useRef([]);
    // useEffect(() => {
    //     //비교
    //     // console.log(rowIndex===ref.current[0], cellIndex===ref.current[1], dispatch===ref.current[2], cellData===ref.current[3])
    //     // //true true true false
    //     // console.log(cellData,ref.current[3])
    //     ref.current = [rowIndex,cellIndex,dispatch,cellData]
    // }, [rowIndex,cellIndex,dispatch,cellData])

    const onClickTd = useCallback(()=>{
        if(cellData){
            return;
        }
        dispatch({type : CLICK_CELL, row: rowIndex, cell:cellIndex})
    },[cellData])

    return(
        <td {...css(styles.td)} onClick={onClickTd}>{cellData}</td>
    )
});

export default withStyles(()=>({
    td : {
        border: '1px solid black',
        width: '40px',
        height: '40px',
        textAlign: 'center'
    }
}))(Td);