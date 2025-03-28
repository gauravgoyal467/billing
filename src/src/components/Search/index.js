import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './style.css'

const Search = ({search,onSearchChange}) => {
  return (
    <div className="search">
        <SearchRoundedIcon/>
        <input className="inp" type="text" placeholder="Search" value={search} onChange={(e)=>onSearchChange(e)} />
    </div>
  )
}

export default Search

