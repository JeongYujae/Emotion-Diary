import DiaryEditor from "../components/DiaryEditor"
import React, {useEffect} from "react"

const New = () => {
    //제목 바꾸기
    useEffect(()=>{
        const titleElement= document.getElementsByTagName('title')[0]
        titleElement.innerHTML= `새로운 하루 기록하기`
    },[])
    return(
        <DiaryEditor/>
    )
}

export default New


