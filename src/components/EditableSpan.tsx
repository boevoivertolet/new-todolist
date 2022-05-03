import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editMode: boolean
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] =useState(false)
    
    const activateEditMode = () => {
        setEditMode(true);
    }
    const activateViewMode = () => {
        setEditMode(false);
    }

    return editMode ? <input onBlur={activateViewMode} value={props.title} autoFocus /> : <span onDoubleClick={activateEditMode} >{props.title}</span>

}