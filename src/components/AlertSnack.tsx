import { useState, createContext, useContext, SyntheticEvent, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface AlertSnackContextProps {
    isOpen: boolean,
    type: AlertType,
    title: string | null,
    message: string | null,
    showAlert: (title: string, message: string, type: AlertType) => void,
    handleClose: (event?: SyntheticEvent | Event, reason?: string) => void //Optional since snackbars can be configured to auto close
}

// Enum definition
export enum AlertType {
    success = 'success',
    error = 'error',
}

const AlertSnackContext = createContext<AlertSnackContextProps | undefined>(undefined);

interface AlertSnackProviderProps {
    children: ReactNode;
}

export function AlertSnackProvider({ children }: AlertSnackProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [type, setType] = useState<AlertType>(AlertType.success);
    const [title, setTitle] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const showAlert = (title: string, message: string,type: AlertType) => {
        setType(type);
        setTitle(title);
        setMessage(message);
        setIsOpen(true);
    }

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
        setTitle(null);
        setMessage(null);
    };

    return (
        <AlertSnackContext.Provider value={{ isOpen, title, message, type, showAlert, handleClose }}>
            {children}
        </AlertSnackContext.Provider>
    )
}

export function useAlertSnack() {
    const context = useContext(AlertSnackContext);
    if (context === undefined) {
        throw new Error('useAlertSnack needs to be used inside of a AlertSnackProvider');
    }

    return context;
}

export default function AlertSnack() {
    const { isOpen, type, title, message, handleClose } = useAlertSnack();

    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>{title}</AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}