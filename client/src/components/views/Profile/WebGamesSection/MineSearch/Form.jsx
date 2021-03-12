import { Button, Input, InputNumber } from 'antd';
import React, { useState, useCallback, useContext, memo } from 'react'
import {START_GAME, TableContext} from './MineFind'
//useContext를 사용하여 컨텍스트 내의 값을 사용할수 있도록 함

const Form = memo(() => {
    const [row, setRow] = useState(10)
    const [cell, setCell] = useState(10)
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext)

    const onChangeRow= useCallback((number)=>{
        setRow(number)
    },[]) 
    const onChangeCell = useCallback((number)=>{
        setCell(number)
    },[])
    const onChangeMine= useCallback((number)=>{
        setMine(number)
    },[])

    const onClickBtn = useCallback(() => {
        if(mine>=row*cell){
            alert("지뢰의 갯수가 칸보다 같거나 많으면 안됩니다.");
            return ;
        }
        dispatch({ type: START_GAME, row, cell, mine });
      }, [row, cell, mine]);


    return (
        <div style={{width : '100%'}}>
            <InputNumber 
                formatter={row => `세로 ${row}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={row => row.replace(/\$\s?|(,*)/g, '')}
                defaultValue={row}
                onChange={onChangeRow}
                style={{width:'50%'}}
             />
            <InputNumber 
                formatter={cell => `가로 ${cell}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={cell => cell.replace(/\$\s?|(,*)/g, '')}
                defaultValue={cell}
                onChange={onChangeCell}
                style={{width:'50%'}}
             />
             <br/>
             <InputNumber 
                formatter={mine => `지뢰 ${mine}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={mine => mine.replace(/\$\s?|(,*)/g, '')}
                defaultValue={mine}
                onChange={onChangeMine}
                style={{width:'100%'}}
             />
             <Button type="primary" style={{float:'right'}}onClick={onClickBtn}
             >시작</Button>
        </div>
    )
})

export default Form
