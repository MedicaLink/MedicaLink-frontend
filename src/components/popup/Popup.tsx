import './Popup.css'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from "framer-motion"

interface PopupContextProps {
    isOpen: boolean;
    content: ReactNode;
    openPopup: (content: ReactNode) => void;
    closePopup: () => void;
}

const popupContext = createContext<PopupContextProps | undefined>(undefined);

interface PopupProviderProps{
    children: ReactNode;
}

export function PopupProvider({children} : PopupProviderProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode>(null);

    const openPopup = (content : ReactNode) => {
        setContent(content);
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
        setContent(null);
    }

    return (
        <popupContext.Provider value={{isOpen, content, openPopup, closePopup}}>
            {children}
        </popupContext.Provider>
    );
}

export function usePopup() : PopupContextProps {
    const context = useContext(popupContext);
    if(context === undefined){
        throw new Error('usePop needs to be used inside of a PopupProvider');
    }

    return context;
}

function Popup(){
    const { isOpen, content, closePopup } = usePopup();
    const popupControls = useAnimation();

    useEffect(() => {
        // Start the opening animation when the component mounts
        if (isOpen) {
            popupControls.start({scaleY:1});
        }
    }, [isOpen, popupControls]);

    const handleClosePopup = async () => {
        //startAnimation({scaleY:0}, () => {closePopup()});
        await popupControls.start({scaleY:0});
        closePopup();
    };

    if (!isOpen) return null;

    return (
        <div id="pop-up-container" >

            <motion.div className="pop-up" id="pop-up" 
            style={{
                height:'100%',
                transformOrigin:'bottom'
            }} 
            initial={{ scaleY: 0 }}
            animate={popupControls}
            transition={{
                ease: "easeOut",
                type: "linear",
                stiffness: 50,
              }}>

                <button className="close-btn" id="pop-up-close" onClick={handleClosePopup}>
                    <span className="material-symbols-outlined">
                        cancel
                    </span>
                </button>

                <div className="content" id="pop-up-content">
                    {content}
                </div>
            </motion.div>

        </div>
    );
}

export default Popup;