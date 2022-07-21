import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const ControlMenu = ({value, onChange, optionList}) => {
    return(
        <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
            {optionList.map((it,idx)=> (
            <option value={it.value} key={idx}>
                {it.name}
            </option>
                
                ))}

        </select>
    )
}

const filterOptionList = [
    {value:"all", name:"매일"},
    {value:"good", name:"좋은 하루만"},
    {value:"bad", name:"안 좋은 하루만"},

]

const sortOptionList = [
    {value:"latest",name:"최신순"},
    {value:"oldest",name:"오래된 순"},
]


const DirayList = ({diaryList}) => {
    const navigate= useNavigate()
    const [sortType,setSortType]= useState('latest')
    const [filter, setFilter]= useState("all");


    const getProcessedDiaryList= () => {

        const filterCallBack= (item) => {
            if (filter=== "good") {
                return parseInt(item.emotion) >3
            }
            else {
                return parseInt(item.emotion)<=3
            }

        }

        const compare= (a,b) => {
            if (sortType==="latest"){
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        
        };

        // stringfy -> JSON 화 시켜서 문자로 바꾸고  parse ->  다시 json 파일로 바꾸기
        // 그대로 복사됨
        const copyList= JSON.parse(JSON.stringify(diaryList))

        const filteredList= filter==="all" ? copyList : copyList.filter((it)=>filterCallBack(it));
        //감정 별로 나눠 놓고, 시간 순으로 정렬하면 감정 필터에도 시간 필터가 적용이 된다
        const sortedList= filteredList.sort(compare);
        return sortedList;
        
}

    return(
        <div className="DiaryList">

            <div className="menu_wrapper">
                <div className="left_col">
                <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
                <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
                </div>
                <div className="right_col">
                <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={()=>navigate('/new')}/>
                </div>

            </div>
            
            
            {getProcessedDiaryList().map((it)=>
            (<DiaryItem key={it.id} {...it}/>
        ))}

        </div>
    )
}

DirayList.defaultProps= {
    diaryList: []
}
export default DirayList