import React from "react";

const AddOrg = (props) => {
    return (
        <>
        <div className='form-control pb-2'>
            <input
                className="border rounded"
                type='text'
                placeholder = "endereço"
                value={props.address1stAdd}
                onChange = {(e) => props.setAddress1stAdd(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "área (opcional)"
                value={props.area1stAdd}
                onChange = {(e) => props.setArea1stAdd(e.target.value)}
            />
            <input
                className="border rounded"
                type='text'
                placeholder='nome'
                value={props.nameAdd}
                onChange={(e) => props.setNameAdd(e.target.value)}
            />
        </div>
        </>
    )
}

export default AddOrg;