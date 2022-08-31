import React from 'react'
import "../../Components/Footer/FooterData/Footer.css"
import "./ContactData/Contact.css"
import LOGO from '../../Components/LOGO'
const Contact = () => {
    return (
        <>
            <div className="container ContainerMargin text-center">
                <LOGO/>
                <div className="row mb-3" method="GET">
                    <h2 className='HeadingPageName'>CONTACT</h2>
                    <h6 className="About">Feel free to contact us</h6>
                    <div className="col-12 map my-3">
                        <iframe title="This is a map" width="100%" height="450" src="https://maps.google.com/maps?q=sushila%20devi%20bansal%20college%20indore&t=&z=17&ie=UTF8&iwloc=&output=embed" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact