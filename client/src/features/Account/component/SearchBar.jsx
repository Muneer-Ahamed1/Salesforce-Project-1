import React from 'react'
import { useState,useEffect } from 'react';

function SearchBar({onChangeQuery,searchQuery,setSearchQuery}) {
    const [inputText, setInputText] = useState("");
    let onChangeData = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        onChangeQuery(lowerCase);
    };
    return (
<div className="main w-[80vw]">
       
        <input type="text " placeholder="Type here" className="input input-bordered w-[80vw] rounded-md input-sm bg-slate-50 "  onChange={onChangeData}
          variant="outlined"
          fullWidth
          label="Search"  />

    </div>    )
}

export default SearchBar