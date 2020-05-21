import React, {useEffect} from 'react';

import Markdown from 'react-markdown';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {
    ArrowCircleLeftOutline,
    DocumentOutline,
    DocumentReportOutline,
    DocumentAddOutline,
    CodeOutline,
    DesktopComputerOutline,
    ShareOutline,
    ClipboardListOutline,
    ClipboardCheckOutline,
    AtSymbolOutline,
    GlobeOutline,
    LockClosedOutline
} from 'heroicons-react';
import { Progress } from '../../layout'

import { useClipboard } from 'use-clipboard-copy';
import useWebShare from 'react-use-web-share';
import { usePaper } from '../../fetcher';
import { getColor } from '../../utils';

import '../../styles.css';

function Icon({type, ...props}) {
    switch (type) {
        case 'ARTICLE':    return <DocumentReportOutline {...props}/>;
        case 'APPENDIX':   return <DocumentAddOutline {...props}/>;
        case 'REPOSITORY': return <CodeOutline {...props}/>;
        case 'SHOWCASE':   return <DesktopComputerOutline {...props}/>;
        case 'CITATION':   return <AtSymbolOutline {...props}/>;
        case 'URL':        return <GlobeOutline {...props}/>;
        default:           return <DocumentOutline {...props}/>;
    }
}

function Visibility({visibility, ...props}) {
    switch (visibility) {
        case 'PRIVATE':   return <LockClosedOutline {...props}/>;
        case 'PUBLIC':
        default:          return null;
    }
}

function Paper() {
    const url = window.location.href;
    const { paper } = useParams();
    const clipboard = useClipboard({copiedTimeout: 600});
    const webshare = useWebShare();
    const navigate = useNavigate();
    const fullPaper = usePaper(paper);

    useEffect(() => {
        if(fullPaper == null) {
            const timeout = setTimeout(() => navigate('/', { replace: true }), 3000)
            return () => clearTimeout(timeout)
        }
    }, [navigate, fullPaper])

    if(fullPaper == null) {
        return (
            <>
                <Progress duration = {3000}/>
                <nav className = 'text-primary-300 absolute top-0 left-0 p-4 flex flex-col sm:flex-row sm:space-x-4 select-none cursor-pointer'>
                    <Link className = 'hover:text-primary-900' to = '/'>
                        <ArrowCircleLeftOutline size = {36} />
                    </Link>
                </nav>
                <p className="text-primary-200 text-4xl mt-32 select-none animate__animated animate__heartBeat">Not Found!</p>
                <div className="p-16 sm:p-0 text-primary-200 text-2xl mt-32 sm:text-2xl select-none animate__animated animate__heartBeat">
                    <p>The requested page does not exist, or wasn't found.</p>
                    <p>You will be redirected soon.</p>
                </div>
            </>
        )
    } else {
        const { title, figures, abstract, authors, resources, publisher: { name: publisher }} = fullPaper
        const copy = () => {clipboard.copy(url)}
        const share = () => {webshare.share({title, url})}

        return(
            <>
                <nav className = 'text-primary-300 absolute top-0 left-0 p-4 flex flex-col sm:flex-row sm:space-x-4 select-none cursor-pointer'>
                    <Link className = 'hover:text-primary-900' to = '/'>
                        <ArrowCircleLeftOutline size = {36} />
                    </Link>
                    {
                        (!webshare.loading && webshare.isSupported) ?
                            <ShareOutline className = 'hover:text-primary-900' onClick = { share } size = {36} /> :
                            (
                                clipboard.isSupported() ?
                                    (
                                        clipboard.copied ?
                                            <>
                                                <ClipboardCheckOutline className = 'text-primary-200' size = {36} />
                                                <span className = 'text-primary-200 leading-9 font-normal text-sm'>Copied!</span>
                                            </> :
                                            <ClipboardListOutline className = 'hover:text-primary-900' onClick = {copy} size = {36} />
                                    ):
                                    null
                            )
                    }
                </nav>

                <article className = 'text-primary-900 w-full'>
                    <header className= 'my-8 min-w-full flex flex-col items-center'>
                        <span className = {`flex-none bg-${getColor(publisher)}-500 text-${getColor(publisher)}-100 rounded p-2 text-xs font-semibold leading-none select-none`}>{publisher}</span>
                        <h1 className = 'min-w-full text-4xl font-light mt-4' >
                            { title }
                        </h1>
                    </header>

                    <h2 className = 'text-2xl font-light mt-8 mb-4 border-b-2 select-none' >Authors</h2>
                    <ul className = 'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center'>
                        {
                            authors.map(({name, mail, affiliation}) => (
                                <li key={mail} className = 'flex-1 border rounded p-2'>
                                    <h3 className = 'text-center text-sm font-medium'>{name}</h3>
                                    <address className = 'text-center text-xs font-normal'>
                                        <p>{ mail }</p>
                                        { affiliation.map(item => <p key = {`${item}`} className = 'not-italic'>{item}</p>) }
                                    </address>
                                </li>
                            ))
                        }
                    </ul>

                    <h2 className = 'text-2xl font-light mt-8 mb-4 border-b-2 select-none' >Abstract</h2>
                    <Markdown className = 'text-justify not-italic py-4 px-5 bg-primary-100 shadow-inner rounded font-medium' renderers={{root: props => <blockquote {...props} />}}>
                        {abstract}
                    </Markdown>

                    <h2 className = 'text-2xl font-light mt-8 mb-4 border-b-2 select-none' >Diagrams</h2>
                    {
                        figures.map(({caption, url}, i) => (
                            <figure key = {url} className = 'my-8 select-none'>
                                <img alt = 'banner' src = {url} />
                            </figure>
                        ))
                    }


                    <h2 className = 'text-2xl font-light mt-8 mb-4 border-b-2 select-none' >Resources</h2>
                    <nav className = 'flex justify-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                        {
                            resources.map(({type, name, url, access}) => (
                                <a
                                    className = 'relative flex-1 block bg-primary-100 shadow rounded p-4 flex flex-col items-center justify-between select-none text-primary-300 hover:text-primary-900'
                                    href = {url}
                                    key = {url} >
                                    <Icon type = {type} size = {24} className = 'mb-4'/>
                                    <Visibility className = 'absolute ml-2 mt-3 bg-primary-100 rounded-full' size = {16} visibility = {access}/>
                                    <h4 className = 'leading-none text-center text-xs font-bold text-primary-900'>{name}</h4>
                                </a>
                            ))
                        }
                    </nav>
                </article>
            </>
        )
    }
}

export default Paper