import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const main = () => {

    const arr = [['sim', 'nao'], ['sim', 'nao', 'nao'], ['talvez', 'talvez']]
    const [filteredArr, setFilteredArr] = useState([])
    const [Var_ , setVar_ ]= useState()
    const ref = useRef(false)
    const [inputValue, setInputValue] = useState('')

    // console.log(filteredArr)

    const onClick1 = () => {

        setVar_(Var_ + 1)
        console.log(Var_, ref.current)

    }

    const onClick2 = () => {
        ref.current = !ref.current
    }

    const filterArray = (filter, arr) => {
        const _arr = new Array()
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr[i].length; j++){
                if(arr[i][j] === filter){
                    _arr.push(arr[i])
                    console.log(j)
                    break
                }
            }
        }
        return _arr
    }

    const hanldleFilterClick = () => {
        if(!inputValue) {
            return
        }
        setFilteredArr(filterArray(inputValue, arr))
    }
    
    
    return (
        <>
        <h1 className="font-bold text-xl subpixel-antialiased" >TESTE</h1>
        <button className="border" onClick={onClick1}> update var </button>
        <p className="py-2"> Var: {Var_}, ref: {ref.current} </p>

        <button className="border" onClick={onClick2}> update ref </button>

        <div className="py-4">
        <input className="border py-2" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className="border" onClick={hanldleFilterClick}>Filtrar arr</button>
        <p className="py-2"> R: {filteredArr} </p>
        </div>
    

        </>
    )

}

export default main;