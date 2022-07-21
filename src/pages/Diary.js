import React from "react";
import {useParams} from 'react-router-dom';

const Diary = () => {
    //Path Variable
    const {id} = useParams();

    return(
        <div>
            Diary.js
        </div>
    )
}

export default Diary