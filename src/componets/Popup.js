import React from 'react';
import {Dialog, DialogTitle, DialogContent, makeStyles, Typography} from "@material-ui/core";
import Controls from "../componets/controls/Controls";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle : {
        paddingRight: '0px'
    }
}))

//Модальное окно
const Popup = (props) => {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    {/*Header*/}
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    {/*Кнопка закрыть*/}
                    <Controls.ActionButton
                        color="secondary"
                    >
                        <CloseIcon onClick={() => setOpenPopup(false)}/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            {/*Body content*/}
            <DialogContent dividers> {/*dividers - черта*/}
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup;
