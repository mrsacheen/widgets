import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search'

const items = [
    {
        title:'What is React',
        content:'React is front end JavaScript Library'
    },
    {
        title:'Why React?',
        content:'React is favorite among all developers'
    },
    {
        title:'How to use React',
        content: 'React is used by building components'
    }
];

function App(){
    return(
        <div>
            {/* <Accordion items={items}/> */}
            <Search/>
            
        </div>
    );
}

export default App;
