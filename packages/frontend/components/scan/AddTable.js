import React from "react";
import { dateFormat } from "../../utils";

const AddTable = (props) => {

    return (
        <>
        <div className="flex justify-center items-center pt-6 pb-2">
            <h1 className="font-bold text-xl subpixel-antialiased ">Cadastros</h1> 
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
                                        Data/Hora
                                    </th>
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
                                        let account
                                        let date
                                        let action = 'Cadastro'
                                        if(props.showUpdater === 1){
                                            id = e.args.area.toString()
                                            account = e.args.account
                                            if(!e.args.added) {
                                                action = 'Revogação'
                                            }
                                            if(props.blocks.length > 0){
                                                const time_ = props.blocks[i].timestamp
                                                date = dateFormat(time_)
                                            }
                                        }
                                        
                                        const key = i.toString()
                                        return (
                                            <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {props.index + i + 1}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {date}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {account}
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
