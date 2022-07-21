import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';


function App() {
  return (
    // BrowserRouter 로 감싼다 -> url과 mapping 될 수 있다
    <BrowserRouter>

    {/* 컴포넌트 자체도 전달이 가능함 */}
    <MyHeader headText={"APP"} 
    leftChild={<MyButton text={'예시 버튼'} onClick={()=>alert('버튼 클릭')}/>}
    rightChild={<MyButton text={'버튼 2'} type='positive'/>}
    
    />
    

    
    <div className="App">
      <h2>
        This is APP Page
      </h2>

      {/* url이 바뀌면 Routes 안에 있는 요소들만 변경됨 */}
      <MyButton text={'버튼'} onClick={()=>alert("클릭됨")} type={"positive"}/>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<New/>}/>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/diary/:id' element={<Diary/>}/>
      </Routes>
      
    </div>

    </BrowserRouter>
  );
}

export default App;
