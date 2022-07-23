import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";


const Edit = () => {

    //받아온 데이터를 state 값으로 활용할거야

    const [originData, setOriginData]= useState();

    const navigate=useNavigate()

    //edit 할 id 값 가져오고
    const {id} = useParams();

    //원본 데이터 받아오기
    const diaryList= useContext(DiaryStateContext);

    //제목 바꾸기
    useEffect(()=>{
        const titleElement= document.getElementsByTagName('title')[0]
        titleElement.innerHTML= `parseInt(${id})+1번째 하루 수정하기`
    },[])

    //id 와 diaryList가 변경될 때만 
    useEffect(()=>{
        if (diaryList.length  >=1 ) {
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id))
            console.log(targetDiary)

        if (targetDiary) {
            setOriginData(targetDiary)

        }
        else {
            navigate('/', {replace:true})
        }
        }

        

    }, [id, diaryList])

    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}

        </div>
    )
}

export default Edit