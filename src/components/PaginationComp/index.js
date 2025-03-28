import React from 'react'
import Pagination from '@mui/material/Pagination';
import './style.css'

const PaginationComp = ({page,handlePageChange}) => {
 
  const style={
    color:"var(--lightBlue)",
    '& .Mui-selected ':{
      backgroundColor:"var(--darkBlue) !important",
      color:"var(--white)!important",
      borderColor:"var(--midBlue) !important"
    },
    '& .MuiPaginationItem-ellipsis':{   
      border:"0px solid var(--lightBlue) !important"
    },
    '& .MuiPaginationItem-text':{
      color:"var(--darkBlue)",
      border:"1px solid var(--lightBlue) "
    }
  }
 
  return (
    <div className='pagination'>
      <Pagination 
        count={10} 
        page={page} 
        onChange={(event,value)=>handlePageChange(event,value)} 
        sx={style}/>
    </div>
  );
}

export default PaginationComp;