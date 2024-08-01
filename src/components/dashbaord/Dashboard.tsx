import './Dashboard.css';
import Stats from './Stats';
import CommentSection from './CommentSection';
import PatientList from './PatientList';
import UpdatedList from './UpdatedList';

function AdminDashboard() {

    return (
        <>

            <div className='col-12'>
                <h2 className='mb-4'># Dashboard</h2>
            </div>

            <div className="col-12" id="stats-section">

                <Stats className="pb-4"/>

            </div>

            <div className="col-12 col-md-7" id="latest-patients">

                <div className="patients-container section-blur">

                    <h4>Newly Created Accounts</h4>

                    <div className="patient-list mt-2">

                        <PatientList/>

                    </div>
                </div>

            </div>

            <div className="col-12 col-md-5" id="customer-comments">

                <div className="comment-container section-blur mt-4 mt-lg-0">

                    <h4>Comments & Reports</h4>

                    <CommentSection className="mt-2 pe-1"/>
                    
                </div>

            </div>

            <div className="col-12" id="latest-updates-section">

                <div className="update-container section-blur mt-4">

                    <h4>Latest Updates</h4>

                    <UpdatedList className='mt-2' />
                    
                </div>

            </div>

        </>
    )
}

export default AdminDashboard;