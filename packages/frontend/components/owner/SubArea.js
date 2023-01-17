import React from "react";

const SubArea = (props) => {

    return (
        <>
        <div className="pb-2">
            <input
            className="border rounded"
            type='text'
            placeholder="endereço"
            value={props.addressSubArea}
            onChange={(e) => props.setAddressSubArea(e.target.value)}
            />
            <input
            className="border rounded"
            type='number'
            placeholder="area"
            value={props.areaSub}
            onChange={(e) => props.setAreaSub(e.target.value)}
            />
        </div>
        </>
    )
}

export default SubArea;