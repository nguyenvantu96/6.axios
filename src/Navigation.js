import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,useHistory, useParams
} from "react-router-dom";
import Main from "./Main";
import Pokemon from "./Pokemon";
export default function Navigation() {
    const [list, setList] = useState([])
    const addList = (newPost) => {
        setList([newPost,...list])
    }
    return (
        <Router>
            <Route exact path="/" render={() => <Main list={list} />} />
            <Route path='/about' render={() =>
                <About addList={addList} />}
            />
            <Route  path='/pokemon'>
                <Pokemon/>
            </Route>
            <Route path='/edit/:id' render={()=>  <About addList={addList} /> }/>
        </Router>
    );
}
const About = (props) => {
    let history = useHistory()
    let param = useParams()

    return  <div>Đây là trang giới thiệu
<button
        
        onClick={()=> history.push('/')}
        >back</button>
        <button
        
        onClick={()=> props.addList({hello:'ccc'})}
        >add</button>

    </div>
}
  
