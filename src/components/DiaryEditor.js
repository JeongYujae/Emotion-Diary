import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader"
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "./../App.js"

const emotionList = [
    {
        emotion_id:1,
        emotion_img:process.env.PUBLIC_URL+`/assets/emotion1.png`,
        emotion_descript: "최고"
    },
    {
        emotion_id:2,
        emotion_img:process.env.PUBLIC_URL+`/assets/emotion2.png`,
        emotion_descript: "좋음"
    },
    {
        emotion_id:3,
        emotion_img:process.env.PUBLIC_URL+`/assets/emotion3.png`,
        emotion_descript: "보통"
    },
    {
        emotion_id:4,
        emotion_img:process.env.PUBLIC_URL+`/assets/emotion4.png`,
        emotion_descript: "별로"
    },
    {
        emotion_id:5,
        emotion_img:process.env.PUBLIC_URL+`/assets/emotion5.png`,
        emotion_descript: "최악"
    }
]

export const getStringDate= (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  
};



const  DiaryEditor = ({isEdit, originData}) => {

    const contentRef= useRef();
    const [content, setContent]=useState("")
    const [emotion, setEmotion] = useState(3)
    const [date,setDate] = useState(getStringDate(new Date()));
    

   

    const navigate= useNavigate();

    // context provider 의 값 가져다 쓰기

    const {onCreate, onEdit} = useContext(DiaryDispatchContext)
    const handleClickEmote = (emotion) => {
        setEmotion(emotion)

    }

    const handleSubmit = () => {
        if (content.length <1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if(!isEdit) {
                onCreate(date,content,emotion);
            }
            else{
                onEdit(originData.id, date, content, emotion)
            }
        }

        navigate("/", {replace:true})

    }

    //isEdit 이 변경 될 때 -> 즉, 수정하러 왔을 때만 시행해준다
    //내용 그대로 받아주고 시작
    useEffect(()=>{
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);

        }

    },[isEdit, originData])


    

    return(
        <div className="DiaryEditor">
            <MyHeader headText={isEdit? "수정하기" : "새로운 하루 기록하기"} leftChild={<MyButton text={'뒤로 가기'} onClick={()=>{navigate(-1)}}/>}/>

            <div>

                <section>
                    <h4>
                        오늘은 언제인가요?
                    </h4>

                    <div className="input_box">
                        <input className="input_date" value={date} onChange={(e)=>setDate(e.target.value)} type="date" />
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=>(
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected = {it.emotion_id === emotion}/>
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="오늘 하루는 어땠나요?" 
                        ref={contentRef} value={content} onChange={(e)=>setContent(e.target.value)}/>

                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <MyButton text={'취소하기'} onClick={()=>navigate(-1)}/>
                        <MyButton text={'작성하기'} type= {'positive'} onClick={handleSubmit}/>
                    </div>
                </section>

            </div>
        </div>

        
    )
    
}

export default DiaryEditor