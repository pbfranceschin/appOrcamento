import React from "react";

const AddOrg = (props) => {
    return (
        <>
        <div className='form-control pb-2'>
            <input
                className="input input-bordered"
                type='text'
                placeholder = "endereço"
                value={props.address1stAdd}
                onChange = {(e) => props.setAddress1stAdd(e.target.value)}
            />
            <input
                className="input input-bordered"
                type='number'
                placeholder = "área"
                value={props.area1stAdd}
                onChange = {(e) => props.setArea1stAdd(e.target.value)}
            />
        </div>
        </>
    )
}

export default AddOrg;