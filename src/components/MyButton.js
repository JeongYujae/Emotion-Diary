import React from "react";

const MyButton = ({text, type, onClick}) =>{

    //버튼 타입을 통제하는 방법 -> 이상한 type 이 오면 그냥 디폴트로 바꿔버려!
    const btnType=['positive', 'negative'].includes(type)? type : 'default'

    return(
        // class 이름을 동적으로 바꿔서 각각의 type 에 따른 다른 디자인
        <button className={["MyButton",  `MyButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>

    )
}

MyButton.defaultProps={
    type:"default"
}

export default MyButton