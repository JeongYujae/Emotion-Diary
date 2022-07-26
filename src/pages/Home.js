import React, { useContext, useEffect, useState } from "react";
import MyHeader from "./../components/MyHeader"
import MyButton from "./../components/MyButton"
import { DiaryStateContext } from "../App";
import DirayList from "./../components/DiaryList";

const Home = () => {

    const diaryList= useContext(DiaryStateContext)

    const [data,setData]= useState([]);

    const [curDate,setCurDate]=useState(new Date())
    const headText=`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`


    useEffect(()=>{
        const titleElement= document.getElementsByTagName('title')[0]
        titleElement.innerHTML= `오늘의 나였던 내일의 나에게`
    },[])

    useEffect(()=>{
        if (diaryList.length >=1){
        const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(),1).getTime();

        const lastDay= new Date(curDate.getFullYear(), curDate.getMonth()+1, 0,23,59,59).getTime();

        setData(
            diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
          );
        }

    }, [diaryList, curDate])
    //diaryList 가 바뀌면 다시 랜더링이 필요하기 때문


    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
        
        )
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        )
    }


    return(
        <div>
            <MyHeader 
            headText={headText}
            leftChild={<MyButton text ={'<'} onClick={decreaseMonth}/>}
            rightChild={<MyButton text={'>'} onClick={increaseMonth}/>}
            />

            <DirayList diaryList={data}/>

        </div>
    )
}

export default Home