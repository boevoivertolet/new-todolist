import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addNewTaskTitle();
        }
    }
    const onClickButtonHandler = () => {
        addNewTaskTitle();
    }
    const addNewTaskTitle = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }

    return (
        <div>
            <TextField
                label={'Type value'}
                variant={'outlined'}
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                className={error ? 'error' : ''}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={onClickButtonHandler} color={'primary'} >
                <ControlPoint/>
            </IconButton>

        </div>

    )

}