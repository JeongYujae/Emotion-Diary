import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id,emotion,content,date}) => {

    const navigate= useNavigate();

    const strDate= new Date(parseInt(date)).toLocaleDateString();

    const goDetail= () => {
        navigate(`/diary/${id}`)
    }

    const goEdit= () => {
        navigate(`/edit/${id}`)
    }

    return(
        <div className="DiaryItem">
            <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
            </div>
            <div className="info_wrapper">
                <div className="diary_date">{strDate}</div>

                <div className="diary_content_preview">
                    {content.slice(0,25)}
                </div>

            </div>

            <div>
                <div className="btn_wrapper" >
                    <MyButton onClick={goEdit}text={'수정하기'}/>
                </div>

            </div>

        </div>
    )
}

// 텍스트랑 이미지 자체를 랜더링하지 말고 리스트만 재랜더링
export default React.memo(DiaryItem)
