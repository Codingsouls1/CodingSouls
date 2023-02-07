import React from 'react'
import LOGO from '../Components/LOGO'

const NotFound = ({value}) => {
  return (
    <div className='container ContainerMargin'>
       <div className="row text-center">
          <LOGO/>
        <div className="col-12 mt-2" style={{backgroundColor:"rgb(45, 67, 99)",fontWeight:"bold",color:"white",height:"500px"}}>
            <div style={{marginTop:"20%"}}>{value}</div>
        </div>
       </div>
    </div>
  )
}

export default NotFound