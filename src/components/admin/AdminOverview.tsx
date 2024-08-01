import './AdminOverview.css'
import avatar from '../../assets/img/profie/profile-image.jpg';


export function AdminOverview() {
    return (
        <>
            <div className="col-12 col-lg-3">
                <div className="profile-main section-blur shadow">
                    <div className="profile-image p-4">
                        <img src={avatar} alt="profile" />
                    </div>
                    <h4 className="title text-center fw-bold">Dr. Seneli Jayasinghe</h4>
                    <p className='text-center'>ENT Specialist at Hemas PVT LTD</p>

                    <div className="container-fluid px-0">

                        <div className="row profile-section px-4 pt-3 gx-3">
                        <button type="button" className="btn btn-danger">SIGN OUT</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col card section-blur shadow rounded-4">
                <div className="card-body">
                    <h5 className="fw-bold mt-2">Administrator Information</h5>
                    <form>
                        <fieldset disabled>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput" className="form-label mt-1">First Name</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="Seneli"/>
                                <label htmlFor="disabledTextInput" className="form-label mt-1">Last Name</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="Sithara Jayasinghe"/>
                                <label htmlFor="disabledTextInput" className="form-label mt-1">Title</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="ENT Specialist"/>
                                <label htmlFor="disabledTextInput" className="form-label mt-1">Permanent Address</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="1125/2 Piliyandala Road, Maharagama"/>
                            </div>
                        </fieldset>
                    </form>
                    <h5 className="fw-bold mt-4">Institution information</h5>
                    <form>
                        <fieldset disabled>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput" className="form-label mt-1">Name of Institution</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="Hemas Hospitals (Private Limited)"/>
                                <label htmlFor="disabledTextInput" className="form-label mt-1">Location</label>
                                <input type="text" id="disabledTextInput" className="form-control mb-1" placeholder="Colombo, Sri lanka"/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

        </>
    ) 
}