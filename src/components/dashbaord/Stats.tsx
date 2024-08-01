
interface StatProps{
    className : string
}

function Stats({className} :StatProps) {

    return (
        <div className={`stat-container ${className}`}>

            <div className="stat section-blur">
                <div className="me-5">
                    <h6>Total Number of Patients</h6>

                    <h4>3452 <span className="percentage good">+20%</span></h4>
                </div>

                <div className="icon">
                    <span className="material-symbols-outlined">
                        personal_injury
                    </span>
                </div>
            </div>

            <div className="stat section-blur">
                <div className="me-5">
                    <h6>Number of Accounts Created</h6>

                    <h4>528 <span className="percentage bad">-10%</span></h4>
                </div>

                <div className="icon">
                    <span className="material-symbols-outlined">
                        personal_injury
                    </span>
                </div>
            </div>

            <div className="stat section-blur">
                <div className="me-5">
                    <h6>Number of Records</h6>

                    <h4>14504 <span className="percentage good">+5%</span></h4>
                </div>

                <div className="icon">
                    <span className="material-symbols-outlined">
                        personal_injury
                    </span>
                </div>
            </div>

        </div>
    );

}

export default Stats;