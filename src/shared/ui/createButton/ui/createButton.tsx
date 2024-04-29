import plus from "../../../assets/icons/plus.svg"

import './createButton.scss'

export const CreateButton = () => {
    return (
        <button type="button" className='createBtn'>
            {/* <div className=''> */}
                <img src={plus} alt="plus" />
                <p>Create</p>
            {/* </div> */}
        </button>
    )
}
