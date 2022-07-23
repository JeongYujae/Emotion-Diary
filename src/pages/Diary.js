import React, { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
const Diary = () => {
    //Path Variable
    const {id} = useParams();
    const navigate=useNavigate();

    //다이어리 리스트를 context로부터 불러오기
    const diaryList = useContext(DiaryStateContext);

    const [data,setData]=useState();

    //제목 바꾸기
    useEffect(()=>{
        const titleElement= document.getElementsByTagName('title')[0]
        titleElement.innerHTML= `${id}번째 하루 기록하기`
    },[])

    useEffect(()=>{
        if (diaryList.length >=1){
            const targetDiary= diaryList.find(
                (it)=> parseInt(it.id)=== parseInt(id))

        if (targetDiary){
            setData(targetDiary)
        }
        else {
            alert("없는 일기입니다 :(")
            navigate('/', {replace:true})
        };
    }
    },[diaryList, id]);

    if (!data) {
        return <div className="DiaryPage">로딩중..</div>
    }
    else{

        const curEmotionData = emotionList.find(
            (it)=> parseInt(it.emotion_id) === parseInt(data.emotion)
        )

        return(
            <div className="DiaryPage">
                <MyHeader 
                headText={`${getStringDate(new Date(data. date))}의 기록`}
                leftChild= {<MyButton text={'뒤로 가기'} onClick= {() => navigate(-1)}/>}
                rightChild={<MyButton text={'수정하기'} onClick={()=>{navigate(`/edit/${data.id}`)}}/> }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img}/>
                            <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
                        </div>
                    </section>

                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        ) 
    }

    
}

export default Diary