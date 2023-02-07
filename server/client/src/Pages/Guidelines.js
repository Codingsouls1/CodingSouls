import React from 'react'
import LOGO from "../Components/LOGO"

const Guidelines = () => {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <LOGO />
          <h3 className='HeadingPageName'>Coding Souls : Until Salvations</h3>
          <div className="col-12 my-5 mx-auto">
            <div className='text-start my-3'>
              <h5 className='HeadingPageName'>Membership Rules</h5>
              <ul>
                <li>Membership registration Fee Rs. 100/year with limited seats.</li>
                <li>50% waive-off in membership fee for participants in BGI CODERS 2K22.</li>
                <li>All Coding Souls’s member must be present in each and every competition and events.</li>
                <li>Students Coordinator will be changed in every event.</li>
              </ul>
            </div>
            <div className='text-start my-3'>
              <h5 className='HeadingPageName'>Website Coordinators</h5>
              <ul>
                <li>Mr. Arvind Gurjar </li>
              </ul>
            </div>
            <div className='text-start my-3'>
              <h5 className='HeadingPageName'>Following Committees will be formed:</h5>
              <ul>
                <li>Social Media and Designing</li>
                <li>Registration and Website</li>
                <li>Content Writing</li>
                <li>Hosting</li>
                <li>Volunteer Guide</li>
              </ul>
            </div>
              <div className='my-3'>
                <h5 className='HeadingPageName'>Note: Coding Club Meetings will be scheduled in every 15 days.</h5>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Guidelines