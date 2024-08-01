import avatar from '../../assets/img/profie/3.jpg';
import logo from '../../assets/img/logo.png';
import './PatientDashboard.css';
import { ArrowDownUp, CaretDownFill, HeartPulse, Globe2 } from 'react-bootstrap-icons';

function PatientDashboard() {
    return (
        <>
            <div className="col-12 profile-container d-flex px-4">
                <img src={avatar} alt="profile-image" className='ms-auto' />
            </div>
            <div className='col-12 profile-logo py-3 px-4'>
                <img src={logo} alt="logo" />
                <div className='mt-4'>
                    <h2 className='fw-bolder mb-3'>Good morning, Suresh👋</h2>

                    <div className="d-lg-flex">
                        <select name="" id="" className='form-control form-select fw-semibold fs-5 py-2 mb-3 mb-lg-0'>
                            <option value="">REFNIC: 200331012289</option>
                        </select>

                        <button className='btn main-bg text-white px-4 text-nowrap ms-lg-4'>Medical ID</button>
                    </div>
                </div>
            </div>

            <div className='col-12 col-md-6 px-4 pe-md-0'>
                <div className="section-blur updates-container mt-4">
                    <div className="sort d-flex">
                        <span>From Last Week</span>
                        <span className='ms-auto'>Sort by <ArrowDownUp /></span>
                    </div>
                    <h4 className='mt-2'>Latest Updates</h4>

                    <div className="update-list">
                        <div className="update">
                            <div className="title">
                                X-Ray Document - Heymas Hospitals
                            </div>
                            <div className="description">
                                Attatchment uploaded - 16/05/2024
                            </div>
                        </div>
                        <div className="update">
                            <div className="title">
                                Comment from Dr. Kushan
                            </div>
                            <div className="description">
                                "Schedule your next appointment in 2 months"
                            </div>
                        </div>
                        <div className="update">
                            <div className="title">
                                ECG & Blood Test Reports - Nawaloka Hospitals
                            </div>
                            <div className="description">
                                Attatchment uploaded - 16/05/2024
                            </div>
                        </div>
                    </div>
                    <div className=' d-flex justify-content-center pt-2'>
                        <button className="bg-transparent border-0">
                            <CaretDownFill width={25} height={25} />
                        </button>
                    </div>
                </div>
            </div>

            <div className='col-12 col-md-6 px-4'>
                <div className="news-list mt-4">
                    <div className="news">
                        <div className="news-image">
                            <HeartPulse height={35} width={35} fill='#0b7bbe' />
                        </div>
                        <div className="ms-4 news-description">
                            View My Health History
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-image">
                            <Globe2 height={35} width={35} fill='#0b7bbe' />
                        </div>
                        <div className="ms-4 news-description">
                            Latest Healthcare News
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-image">
                            <HeartPulse height={35} width={35} fill='#0b7bbe' />
                        </div>
                        <div className="ms-4 news-description">
                            View My Health History
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-image">
                            <Globe2 height={35} width={35} fill='#0b7bbe' />
                        </div>
                        <div className="ms-4 news-description">
                            Latest Healthcare News
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientDashboard;