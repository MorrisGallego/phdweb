import React, {useEffect} from 'react';

import {
    NewspaperOutline,
    DocumentOutline,
    LibraryOutline,
    BookOpenOutline
} from 'heroicons-react';
import { Link } from 'react-router-dom';

import '../../styles.css'
import { usePapers, usePersonalInfo } from '../../fetcher';
import { buildURL } from '../../utils';
import { usePagination } from "../../hooks";

function Icon({type, ...props}) {
    switch (type) {
        case 'JOURNAL': return <NewspaperOutline {...props}/>;
        case 'CONFERENCE': return <LibraryOutline {...props}/>;
        case 'BOOK': return <BookOpenOutline {...props}/>;
        default: return <DocumentOutline {...props}/>;
    }
}

function Home() {
    const {page, setPages, hasNext, hasPrevious, next, previous} = usePagination(0)
    const {content: papers, pages} = usePapers(5, page)

    const data = usePersonalInfo()

    useEffect( () => setPages(pages), [setPages, pages])

    return(
        <>
            <h1 className = 'mt-8 mb-4 sm:mb-12 min-w-full text-center text-4xl sm:text-5xl font-hairline text-primary-900 select-none' >
                {data?.name}
            </h1>
            <p className = 'text-lg p-4 rounded shadow-inner text-primary-900 w-full text-justify bg-primary-100 italic'>
                {data?.about}
            </p>

            <h2 className = 'text-primary-900 w-full text-2xl font-light mt-8 mb-4 border-b-2 select-none font-bold' >My papers</h2>
            <ul className = 'w-full list-none text-primary-900 divide-y'>
                {
                    papers?.map( ({title, publisher: {type}}) => (
                        <li className = 'py-8 last:pb-0' key = {buildURL(title)}>
                            <Link to = {buildURL(title)}>
                                <h2 className = 'flex items-baseline cursor-pointer hover:underline'>
                                    <Icon type = {type} className='mr-4 flex-none' size = {24} />
                                    <span className = 'text-2xl sm:text-3xl font-light select-none'>{title}</span>
                                </h2>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <nav className = 'text-primary-300 space-x-4 mt-4 self-end'>
                <button className = 'font-bold disabled:text-primary-100' onClick = {previous} disabled = { !hasPrevious() }>Previous page</button>
                <button className = 'font-bold disabled:text-primary-100' onClick = {next} disabled = { !hasNext() } >Next page</button>
            </nav>

            <h2 className = 'text-primary-900 w-full text-2xl font-light mt-8 mb-4 border-b-2 select-none font-bold' >Find me</h2>
            <div className = 'w-full bg-primary-100 shadow-inner rounded p-4 text-primary-900'>
                <h3 className = 'text-center text-sm font-bold'>{data?.name}</h3>
                <address className = 'text-center text-xs font-normal'>
                    <p>{data?.mail}</p>
                    {
                        data?.affiliation.map(line => <p key = {line} className = 'not-italic'>{line}</p>)
                    }
                    <p className = 'not-italic font-bold'>{data?.country}</p>
                </address>
            </div>
        </>
    )
}

export default Home