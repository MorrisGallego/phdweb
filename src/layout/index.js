import React, {Suspense, StrictMode} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import '../styles.css';
import 'typeface-nunito';
import 'animate.css'

import Apollo from '../context/apollo'
import Routes from "../router"
import { AuthenticationProvider } from "../context/authentication";
import { usePersonalInfo } from "../fetcher";

const Loading = () => <p className="text-primary-200 text-xl mt-32 sm:text-4xl select-none animate__animated animate__heartBeat animate__infinite">Loading...</p>
function Progress({duration}) {
    return <div className = 'fixed top-0 left-0 bg-primary-900 h-1 shadow' style = {{
        animationDuration: `${duration}ms`,
        animationName: 'progressBar',
        animationTimingFunction: 'linear'
    }}/>
}

function Layout() {
    const data = usePersonalInfo()

    return (
        <main className='text-primary-900 flex-1 relative sm:rounded-lg shadow mt-32 p-4 pt-32 sm:p-12 sm:pt-32 h-full w-full max-w-5xl bg-white flex flex-col items-center'>
            <img className='-mt-56 w-48 h-48 rounded-full border-8 border-white select-none shadow-outline-big pointer-events-none' src = {data?.image}  alt='me' />
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes />
                </Suspense>
            </Router>
        </main>
    );
}

export default function Container() {
    return (
        <StrictMode>
            <Apollo>
                <AuthenticationProvider>
                    <Layout />
                </AuthenticationProvider>
            </Apollo>
        </StrictMode>
    );
}

export { Loading, Progress }