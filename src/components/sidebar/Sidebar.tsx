import SidebarLink from './SidebarLink';
import favicon from '../../assets/img/favicon3.png';
import avatar from '../../assets/img/profie/profile-image.jpg';
import './Sidebar.css';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface SidbarProps {}

export interface SidebarHandle {
    setSidebarPosition : (windowHeight : number) => void;
}

const Sidebar = forwardRef<SidebarHandle ,SidbarProps>((props, ref) => {

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => {
        
        return {
            // Sets the sidebar position according to the main container height
            setSidebarPosition(windowHeight : number){
                const sidebarHeight : number = (sidebarRef.current?.clientHeight) || 0;
                const contentHeight = sidebarHeight + windowHeight;
                console.log(contentHeight,window.innerHeight);

                if(contentHeight >= window.innerHeight){
                    // remove the top 100% styles
                    if(sidebarRef.current && sidebarRef.current.classList.contains('bottom')){
                        sidebarRef.current.classList.remove('bottom');
                    }
                }
                else{
                    // add the top 100% styles
                    sidebarRef.current?.classList.add('bottom');
                }
            }
        };

    },[]);

    // Sidbar Link data
    const sideBarData = [
        { id: 1, link: '/', order: 3, icon: 'home' },
        { id: 2, link: '/search', order: 1, icon: 'search'},
        { id: 3, link: '/patient', order: 2, icon: 'group'},
        { id: 4, link: '/comments', order: 4, icon: 'comment'},
        { id: 5, link: '/settings', order: 5, icon: 'settings'}
    ];

    return (
        <>
            <div ref={sidebarRef} className="px-0 section-blur" id="sidebar-container">
                <div className="sidebar" id="sidebar">

                    <div className="sidebar-header mb-md-4 d-none d-md-block">
                        <div className="app-icon">
                            <img src={favicon} alt="App Logo" />
                        </div>
                    </div>
                    <ul className="sidebar-list mt-3">

                        {sideBarData.map(data => {
                            return (
                                <SidebarLink key={data.id}
                                    link={data.link}
                                    order={data.order}
                                    icon={data.icon}/>
                            );
                        })}

                    </ul>
                    <div className="account-info mt-md-auto d-none d-md-flex">
                        <button className="account-info-picture">
                            <img src={avatar} alt="Account" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
});

export default Sidebar;