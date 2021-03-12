import React, { useEffect, useRef, useState } from 'react'
import {withStyles, css} from '../../../ui/withStyles'

const rspCoord = {
    바위 : {
        position : '0',
        image : 'RockPostion'
    },
    가위 : {
        position : '-142',
        image : 'ScissorsPostion'
    },
    보 : {
        position : '-284',
        image : 'PaperPostion'
    },
}
const scores= {
    바위 : 0,
    가위 : 1,
    보 : -1,
}
const computerChoice=(imgCoord)=>{
    let obj = Object.entries(rspCoord);
    let ret = obj.find(x=>x[1].position===imgCoord)[0]
    return ret
}
function RSPHooks(props) {
    const {styles} = props;
    const [result , setResult] = useState('')
    const [score , setScore] = useState(0)
    const [imgCoord , setImgCoord] = useState('0')
    const [image, setimage] = useState('RockPostion')
    const [buttonDisable , setButtonDisable] = useState(false)

    const interval = useRef();

    const changeHand =()=>{
        if(imgCoord===rspCoord.바위.position){
            setImgCoord(rspCoord.가위.position)
            setimage(rspCoord.가위.image)
        }else if(imgCoord===rspCoord.가위.position){
            setImgCoord(rspCoord.보.position)
            setimage(rspCoord.보.image)
        }else if(imgCoord === rspCoord.보.position){
            setImgCoord(rspCoord.바위.position)
            setimage(rspCoord.바위.image)
        }
    }
    const onClickBtn =(choice)=>()=>{
        clearInterval(interval.current);
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)];
        console.log(cpuScore)
        const diff = myScore - cpuScore;
        setButtonDisable(true)
        if(diff===0){
            setResult('비겼습니다.')
        }else if([-1,2].includes(diff)){
            setResult('이겼습니다.')
            setScore((prevScore)=>{
                return prevScore+1;
            })
        }else {
            setResult('졌습니다.')
            setScore((prevScore)=>{
                return prevScore-1;
            })
        }
        setTimeout(()=>{
            //2초정도 기다렸다가 진행
            setButtonDisable(false)
            interval.current = setInterval(changeHand,100)
        },1000)
    }
    useEffect(()=>{
        interval.current = setInterval(changeHand,100)
        return ()=>{ clearInterval(interval.current);}
    },[imgCoord])
    

    return (
        <>
            <div  {...css(styles.computer, styles[image])} ></div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')} disabled={buttonDisable} >바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')} disabled={buttonDisable}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')} disabled={buttonDisable}>보</button>
                <div>{result}</div>
                <div>현재 {score}점</div>
        </>
    )
}

export default withStyles(()=>({
    computer : {
        width : '142px',
        height : '200px',
        backgroundPosition : '0 0'
    },
    RockPostion :{
        background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`
    },
    ScissorsPostion :{
        background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) -142px 0`
    },
    PaperPostion :{
        background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) -284px 0`
    }


}))(RSPHooks)