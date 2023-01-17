import React from "react";

const SubOrg = (props) => {

    return (
        <>
        <div className="pb-2">
            <input
            className="border rounded"
            type='text'
            placeholder="endereço"
            value={props.addressSubOrg}
            onChange={(e) => props.setAddressSubOrg(e.target.value)}
            />
        </div>
        </>
    )
}

export default SubOrg;