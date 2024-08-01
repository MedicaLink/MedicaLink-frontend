import './Settings.css';
import { Search } from 'react-bootstrap-icons';
import { UseUser } from '../auth/UserContext';

function Settings() {
    const { user } = UseUser();

    return (
        <>
            <div className='col-12'>
                <h2 className='mb-4'># App Settings</h2>
            </div>

            <div className="col-12">

                <div id="settings-section" className="section-blur">

                    <div className="d-flex align-items-center">
                        <h4 className="mb-0">Settings</h4>
                        <div className="search-box">
                            <button>
                                <Search color='black' size={16} />
                            </button>
                            <input type="text" id="search-bar" placeholder="Search settings..." />
                        </div>
                    </div>

                    <hr />

                    <div className="settings-list">

                        <div className="setting mb-4">

                            <h6>General Settings</h6>

                            <div className="row gx-5">

                                <div className="col-md-5 d-flex align-items-center mb-3 mb-md-0">

                                    <label about="inputNotification" className="form-label text-nowrap me-3">Notifications : </label>
                                    <select name="notifications" id="inputNotification" className="form-select">
                                        <option value="disabled">Disabled</option>
                                        <option value="enabled">Enabled</option>
                                    </select>
                                </div>

                                <div className="col-md-5 d-flex flex-column">

                                    <span>Number of active members : 25</span>
                                    <a href="">Manage all your members</a>
                                </div>

                            </div>

                        </div>

                        <div className="setting">

                            <h6>Billing Settings</h6>

                            <div className="mt-2 mb-3">
                                <span>Bill due date : 20/12/2026</span>
                            </div>

                            <div className="billing-plans">

                                {
                                    user?.role === 'admin' ? (
                                        <>
                                            <div className="plan">

                                                <div>
                                                    <h6>Basic <span className="active ms-3"> <div></div> active</span></h6>

                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Odit fugiat asperiores beatae earum, sit ipsam.
                                                    </p>
                                                </div>

                                                <div className="icon green">
                                                    <span className="material-symbols-outlined">
                                                        star
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="plan">

                                                <div>
                                                    <h6>Advanced</h6>

                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Odit fugiat asperiores beatae earum, sit ipsam.
                                                    </p>
                                                </div>

                                                <div className="icon red">
                                                    <span className="material-symbols-outlined">
                                                        star_half
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="plan">

                                                <div>
                                                    <h6>Premium</h6>

                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Odit fugiat asperiores beatae earum, sit ipsam.
                                                    </p>
                                                </div>

                                                <div className="icon blue">
                                                    <span className="material-symbols-outlined">
                                                        stars
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="plan">

                                                <div>
                                                    <h6>Basic <span className="active ms-3"> <div></div> active</span></h6>

                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Odit fugiat asperiores beatae earum, sit ipsam.
                                                    </p>
                                                </div>

                                                <div className="icon green">
                                                    <span className="material-symbols-outlined">
                                                        star
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="plan">

                                                <div>
                                                    <h6>Premium</h6>

                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Odit fugiat asperiores beatae earum, sit ipsam.
                                                    </p>
                                                </div>

                                                <div className="icon blue">
                                                    <span className="material-symbols-outlined">
                                                        stars
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Settings;