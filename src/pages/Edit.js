import React from "react";
import {useSearchParams, useNavigate} from 'react-router-dom'

const Edit = () => {

    //Query String 처리 (주소 뒤에 있는 ? id 나 mode)
    const [searchParams, setSearchParams]=useSearchParams();

    const id =searchParams.get('id')

    const mode = searchParams.get('mode')


    //페이지를 이동시키는 함수 제공
    //Link 태그처럼 클릭 안해도 강제로 넘길 수 있다
    const navigate= useNavigate();


    return(
        <div>
            Edit.js
            {/* 쿼리 스트링 자체를 실시간으로 변경시켜 줄 수 있다 */}
            <button onClick={()=>setSearchParams({mode:'dark'})}>모드 바꾸기</button>


            <button onClick={()=>navigate("/home")}>홈으로 이동하기</button>

            <button onClick={()=>navigate(-1)}>뒤로 가기</button>


            

        </div>
    )
}

export default Edit