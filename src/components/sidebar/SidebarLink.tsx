import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../../assets/img/profie/profile-image.jpg';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { UseAlertDialog } from '../PopUpDialog';
interface SidebarButtonProps {
    isActive?: boolean,
    order: Number,
    link: string,
    icon: string
}

export function SidebarAvatar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {showDialog} = UseAlertDialog();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button className="account-info-picture"
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    padding: 0
                }}
            >
                <img src={avatar} alt="Account" />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    showDialog(<LogoutAlert/>);
                }}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

function SidebarLink({ icon, link, order }: SidebarButtonProps) {

    return (
        <li className={`sidebar-list-item order-${order}`}>

            <NavLink
                to={link}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "active"
                        : isPending
                            ? "pending"
                            : ""
                }
            >
                <span className="material-symbols-outlined">
                    {icon}
                </span>
            </NavLink>
        </li>
    )
}

function LogoutAlert() {
    const navigate = useNavigate();
    const {closeDialog} = UseAlertDialog();

    const hadnleSignOut = () => {
        navigate("/logout");
    }

    return (
        <>
            <DialogTitle id="alert-dialog-title">
                {"Sign Out?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you wan to sing out? All your tokens will be lost.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={hadnleSignOut}>Yes</Button>
                <Button onClick={() => {
                    closeDialog();
                }} autoFocus>
                    No keep me logged in
                </Button>
            </DialogActions>
        </>
    )
}

export default SidebarLink;