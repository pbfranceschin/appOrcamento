import React from "react";
import AreaDropdown from "../AreaDropdown";

const SubArea = (props) => {

    return (
        <>
        <div>
            <p>Subtração de área</p>
        </div>
        <div className="pb-2">
            <input
            className="border rounded p-1"
            type='text'
            placeholder="endereço"
            value={props.addressSubArea}
            onChange={(e) => props.setAddressSubArea(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setAreaSub}
                defaultValue=""
                defaultLabel="área"
            />
            {/* <input
            className="border rounded"
            type='number'
            placeholder="area"
            value={props.areaSub}
            onChange={(e) => props.setAreaSub(e.target.value)}
            /> */}
        </div>
        <div>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.handleSubArea}
            >
                {props.buttonSubAreaText}
            </button>
        </div>
        </>
    )
}

export default SubArea;