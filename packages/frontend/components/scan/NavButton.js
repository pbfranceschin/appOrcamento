import React from "react";

const NavButton = (props) => {

    const prevButtonText = '<<Anterior'
    const nextButtonText = 'Próxima>>'
    
    return (

        <div className="flex justify-start">
            <div className="px-2 pb-2">
                <button className={props.prevButtonClass} onClick={props.prevHandler}>
                    {prevButtonText}
                </button>
            </div>
            <div>
                <button className={props.nextButtonClass} onClick={props.nextHandler}>
                    {nextButtonText}
                </button>
            </div>

        </div>
    )
}

export default NavButton;