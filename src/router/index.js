import React, {lazy} from 'react'
import {Route, Routes} from 'react-router-dom'

const Home = lazy(() => import('../pages/home'))
const Paper = lazy(() => import('../pages/paper'))


export default function Router() {
    return <Routes>
        <Route
            path='/'
            element = { <Home/> }
            preload = { (...any) => console.log(any) }
        />
        <Route path=':paper' element = { <Paper /> } />
    </Routes>
}