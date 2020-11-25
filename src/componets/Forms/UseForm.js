import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

//Данные компонент получает данные из формы
export const useForm = (initialFValues) => {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    //Получаем данные из формы
    const handleInputChange = e => {
        console.log(e.target.value);
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    }
}

//Компонент формы, который принимает в качестве children компонент TestForm
export const Form = (props) => {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
