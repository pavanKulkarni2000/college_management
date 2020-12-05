import React, { useState } from 'react';
import Header from './Header';
import Nav from "./Nav"

export default function Home(){
    const [navOpen, setNav]=useState(false);
    return (
        <div>
            <Header navOpen={navOpen} onClickMenu={setNav}/>
            <Nav open={navOpen} onChange={setNav}/>
        </div>
    );
}