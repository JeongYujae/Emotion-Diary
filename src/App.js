import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import React, { useReducer, useRef } from 'react';

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
  return newState;
  // newState를 반환해주어야 새로운 리스트에 반영이 된다
}

export const DiaryStateContext= React.createContext();
export const DiaryDispatchContext= React.createContext();

const dummyData= [
  {
    id:1,
    emotion:3,
    content:'1번 일기',
    date: new Date().getTime()
  },

  {
    id:2,
    emotion:4,
    content:'2번 일기',
    date: new Date().getTime()+1
  },
  {id:3,
  emotion:1,
  content:'3번 일기',
  date: new Date().getTime()+2
  },
  {id:4,
    emotion:2,
    content:'4번 일기',
    date: new Date().getTime()+1000000000000

  }
]

function App() {

  const [data,dispatch] = useReducer(reducer,dummyData);

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
