import React, {useState} from 'react';
import Popup from "./Popup";
import Controls from "../componets/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import TestForm from "./Forms/TestForm";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    interfaceBlockWrapper : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px'
    },
}))

//Компонент с различными ui интерфейсами
const InterfaceUI = () => {

    const [openPopup, setOpenPopup] = useState(false);

    const classes = useStyles();

    return(
        <div className={classes.interfaceBlockWrapper}>
            <Controls.Button
                text="Button"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenPopup(true)}
            />
            <Popup
                title="Заголовок"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TestForm />
            </Popup>
        </div>
    )
}

export default InterfaceUI;