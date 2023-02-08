import React from "react";

const Tabs = (props) => {

    if(props.tab === 0){
        return (
            <div className="flex justify-center items-center pt-6 pb-2">
                    <button 
                    className="bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded-l shadow-md"
                    >
                        Transferências
                    </button>
                    <button 
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                    onClick={() => {
                        props.setTab(1)
                        props.setDataIndex(0)
                    }}
                    >
                        cadastros
                    </button>
                    <button
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    onClick={() => {
                        props.setTab(2)
                        props.setDataIndex(0)
                    }}
                    >
                        Endereços
                    </button>
            </div>
        )
    } else if(props.tab === 1){
        return (
            <div className="flex justify-center items-center pt-6 pb-2">
                    <button 
                    className="opacity-50 bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded-l shadow-md"
                    onClick={() => {
                        props.setTab(0)
                        props.setDataIndex(0)
                    }}
                    >
                        Transferências
                    </button>
                    <button 
                    className="bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                    >
                        cadastros
                    </button>
                    <button
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    onClick={() => {
                        props.setTab(2)
                        props.setDataIndex(0)
                    }}
                    >
                        Endereços
                    </button>
                </div>
        )

    } else if(props.tab === 2){
        return (
            <div className="flex justify-center items-center pt-6 pb-2">
                        <button 
                        className="opacity-50 bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded-l shadow-md"
                        onClick={() => {
                            props.setTab(0)
                            props.setDataIndex(0)}}
                        >
                            Transferências
                        </button>
                        <button 
                        className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                        onClick={() => {
                            props.setTab(1)
                            props.setDataIndex(0)}}
                        >
                            cadastros
                        </button>
                        <button
                        className="bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                        >
                            Endereços
                        </button>
                    </div>
        )
    }
}

export default Tabs;