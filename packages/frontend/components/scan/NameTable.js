import React from "react";
// import { useName } from "../../hooks/data";

// props.data, props.txIndex

const NameTable = (props) => {

    // const dataKeys = [...props.data.keys()]

    return (
        <>
        <div className="flex justify-center items-center pt-6 pb-2">
            <h1 className="font-bold text-xl subpixel-antialiased ">Endereços</h1> 
        </div>
        <div className="flex flex-col border-t">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Nome
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Endereço
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.map((e,i) => {                      
                                        const key = i.toString()
                                        let account_
                                        let name_
                                        if(props.showUpdater === 2){
                                            account_ = e[0]
                                            name_ = e[1]
                                        } else {
                                            account_ = '-'
                                            name_ = '-'
                                        }
                                        
                                        // console.log('debugando', props.data)
                                        return (
                                            <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {props.index + i + 1}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {name_}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {account_}
                                            </td>
                                            </tr>
                                        )
                                    })}                                
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default NameTable;