import React from "react";
// import { useName } from "../../hooks/data";

const AddTable = (props) => {

    return (
        <>
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
                                    {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Nome
                                    </th> */}
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Endereço
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Área
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Ação
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.map((e,i) => {
                                        let id                                      
                                        if(props.showUpdater === 1){
                                            id = e.area.toString()
                                        }
                                        const key = i.toString()
                                        let action = 'Cadastro'
                                        if(!e.added) {
                                            action = 'Revogação'
                                        }
                                        // const name_ = useName(e.account)
                                        return (
                                            <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {props.index + i + 1}
                                            </td>
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {name_}
                                            </td> */}
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {e.account}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {action}
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

export default AddTable;
