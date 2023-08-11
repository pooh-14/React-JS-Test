import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import AddTodo from './Components/AddTodo';
import AllTodo from './Components/AllTodo';
import SingleTodo from './Components/SingleTodo';
import OwnedTodo from './Components/OwnedTodo';

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/addtodo' element={<AddTodo/>}/>
        <Route exact path='/alltodo' element={<AllTodo/>}/>
        <Route exact path='/singletodo/:id' element={<SingleTodo/>}/>
        <Route exact path='/ownedtodo' element={<OwnedTodo/>}/>
      </Routes>
    </div>
  );
}

export default App;
