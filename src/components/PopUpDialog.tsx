import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { Children, createContext } from 'react';

interface DialogContextProps{
    open: boolean;
    showDialog: (content: React.ReactNode) => void;
    closeDialog: () => void;
    children: React.ReactNode
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

interface DialogProviderProps{
    children: React.ReactNode
}
export function AlertDialogProvider({ children }: DialogProviderProps) {
    const [open, setOpen] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState<React.ReactNode>(null);

    const handleClose = () => {
        setOpen(false);
    };

    const showDialog = (content: React.ReactNode) => {
        setDialogContent(content);
        setOpen(true);
    }

    return (
        <DialogContext.Provider value={{ open, showDialog: showDialog, closeDialog: handleClose, children: dialogContent}}>
            {children}
        </DialogContext.Provider>
    );
}

export function UseAlertDialog(){
    const context = React.useContext(DialogContext);
    if (context === undefined) {
        throw new Error('UseAlertDialog needs to be used inside of a AlertDialogProvider');
    }

    return context;
}

function AlertDialog(){
    const { open, closeDialog, children } = UseAlertDialog();

    return (
        <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       {children} 
      </Dialog>
    );
}

export default AlertDialog;