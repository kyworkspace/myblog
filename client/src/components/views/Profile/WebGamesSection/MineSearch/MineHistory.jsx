import React, { memo, useContext, useMemo } from 'react'
import { TableContext } from './MineFind'

const MineHistory=memo(() =>{
    const {history} = useContext(TableContext);
    return useMemo(() => <ul>
            {history && history.map((v)=>{
                return <li>가로 : {v.row} 세로 : {v.cell} 지뢰수 : {v.mine} 진행시간 : {v.time}초 결과 : {v.result}</li>
            })}
        </ul>, [history])
})

export default MineHistory
