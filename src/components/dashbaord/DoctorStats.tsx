interface StatProps {
  className: string;
}

function Stats({ className }: StatProps) {
  return (
    <div className={`stat-container ${className}`} id="docotor-stats">

      <div className="stat section-blur d-flex align-items-center">
        <div className="icon me-2">
          <span className="material-symbols-outlined">task_alt</span>
        </div>
        <div className="d-flex flex-column gap-0">
          <h4 className="mb-0">10 <span className="percentage good">+10%</span></h4>
          <h6>Appointments Today</h6>
        </div>
      </div>

      <div className="stat section-blur d-flex align-items-center">
        <div className="icon me-2">
          <span className="material-symbols-outlined">group</span>
        </div>
        <div className="d-flex flex-column gap-0">
          <h4 className="mb-0">250 <span className="percentage bad">-5%</span></h4>
          <h6>Total Patients</h6>
        </div>
      </div>

      <div className="stat section-blur d-flex align-items-center">
        <div className="icon me-2">
          <span className="material-symbols-outlined">library_books</span>
        </div>
        <div className="d-flex flex-column gap-0">
          <h4 className="mb-0">560 <span className="percentage good">+10</span></h4>
          <h6>Total Records</h6>
        </div>
      </div>

      <div className="stat section-blur d-flex align-items-center">
        <div className="icon me-2">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div className="d-flex flex-column gap-0">
          <h4 className="mb-0">4.5 <span className="percentage good"></span></h4>
          <h6>Rating</h6>
        </div>
      </div>

    </div>
  );
}

export default Stats;
