import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import React, { useEffect, useReducer, useRef } from 'react';

const reducer = (state,action)=>{
  let newState=[];

  switch(action.type){
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      const newItem= {
        ...action.data
      }
      newState=[newItem,...state];
      break;
    }
  
    case 'REMOVE':{
      newState=state.filter((it)=>it.id!==action.targetId)
      break;
    }

    case 'EDIT':{
      newState= state.map((it)=>it.id === action.data.id ? {...action.data}: it)
      break;
    }

    default:
      return newState;
  }

  localStorage.setItem('diary',JSON.stringify(newState))
  return newState;
  // newState를 반환해주어야 새로운 리스트에 반영이 된다
}

export const DiaryStateContext= React.createContext();
export const DiaryDispatchContext= React.createContext();



function App() {
  
  useEffect(()=>{
    const localData= localStorage.getItem('diary');
    if (localData) {
      const diaryList= JSON.parse(localData).sort((a,b)=> parseInt(b.id)-parseInt(a.id));


      if (diaryList.length >=1) {
        dataId.current= parseInt(diaryList[0].id) +1
        dispatch({type: 'INIT', data:diaryList})
      }
      

    }
    else {
      
    }

  },[]);
 

  // useEffect(()=>{
  //   // 객체를 저장하는 방법
  //   // localStorage.setItem("Key",JSON.stringify({value:30}))

  //   // 객체를 불러올 때는 다 문자열 형태로 저장됨 parse 로 감싸면 객체를 살려서 올 수 있음
  //   // localStorage
  // })

  const [data,dispatch] = useReducer(reducer,[]);

  const dataId = useRef(0);

  //CREATE

  const onCreate = (date,content,emotion) =>{
    dispatch({
      type:'CREATE',
      data:{
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current+=1

  }

  //REMOVE

  const onRemove= (targetId) => {
    dispatch({type:'REMOVE', targetId})
  }

  //EDIT

  const onEdit = (targetId,date,content,emotion) => {
    dispatch({type:'EDIT',data:{
      id:targetId,
      date: new Date(date).getTime(),
      content,
      emotion,
    }})

  }

  return (
    // BrowserRouter 로 감싼다 -> url과 mapping 될 수 있다
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter> 
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/new' element={<New/>}/>
              <Route path='/edit/:id' element={<Edit/>}/>
              <Route path='/diary/:id' element={<Diary/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
