import React from "react";

const SubOrg = (props) => {

    return (
        <>
        <div>
            <p>Revogação de órgão</p>
        </div>
        <div className="pb-2">
            <input
            className="border rounded p-1"
            type='text'
            placeholder="endereço"
            value={props.addressSubOrg}
            onChange={(e) => props.setAddressSubOrg(e.target.value)}
            />
        </div>
        <div>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.handleSubOrg}
            >
                {props.buttonSubOrgText}
            </button>
        </div>
        </>
    )
}

export default SubOrg;