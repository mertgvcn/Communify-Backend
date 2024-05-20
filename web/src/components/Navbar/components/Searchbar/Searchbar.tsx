import React, { useEffect, useRef, useState } from 'react'
//css
import './Searchbar.css'
//models
import { SearchTypes } from '../../../../enums/SearchTypes';
import { SearchRequest } from '../../../../models/parameterModels/SearchRequest';
import { SearchedUserViewModel } from '../../../../models/viewModels/SearchedUserViewModel';
//icons
import { IoMdSearch } from "react-icons/io";
//helpers
import { Search } from '../../../../utils/apis/NavbarAPI';
//components
import SearchResultCard from './components/SearchResultCard';

export type SearchResultType = {
    users: SearchedUserViewModel[],
    communities: [],
    posts: [],
    anyResult: boolean
}

const Searchbar = () => {
    const searchInputRef = useRef("")
    const dropDownRef = useRef<any>(null)

    const [searchResult, setSearchResult] = useState<SearchResultType>({
        users: [],
        communities: [],
        posts: [],
        anyResult: false
    })
    const [dropDownState, setDropDownState] = useState(false)
    const [timer, setTimer] = useState<any>(null)

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if (!dropDownRef.current.contains(e.target)) {
                setDropDownState(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchInputRef.current = e.target.value
        clearTimeout(timer)

        const newTimer = setTimeout(async () => {
            const request: SearchRequest = {
                input: searchInputRef.current.trim(),
                searchType: SearchTypes.User
            }

            const result: SearchResultType = await Search(request)
            //temporary

            setSearchResult(result)
        }, 300)

        setTimer(newTimer)
    }

    return (
        <div className={`searchbar-wrapper ${(dropDownState && searchInputRef.current.trim()) ? `active` : `inactive`} `} ref={dropDownRef}>

            <div className='searchbar' onClick={() => setDropDownState(current => !current)} >
                <div className='searchbar-icon'>
                    <IoMdSearch style={{ marginRight: -6 }} />
                </div>
                <input className='searchbar-input' type="text" placeholder='Search Communify'
                    value={searchInputRef.current} onChange={handleChange} />
            </div>

            <div className={`searchbar-drop-down ${(dropDownState && searchInputRef.current.trim()) ? `active` : `inactive`} `}>
                {
                    searchResult.users.map((result, idx) => (
                        <SearchResultCard data={result} setDropDownState={setDropDownState} key={idx} />
                    ))
                }

                <div className='search-for-wrapper'>
                    <div className='icon'>
                        <IoMdSearch />
                    </div>

                    <div className='info'>
                        <span className='message'>Search for "{searchInputRef.current}"</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Searchbar