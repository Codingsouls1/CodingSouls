import React from 'react'
import { NavLink } from 'react-router-dom'
import LOGO from "../../Components/LOGO"
import { ArchiveData } from './ArchiveData'

const Archive = () => {
  /* for sorting of Array */
  const compare = (a, b) => {
    if (a.end.getFullYear() > b.end.getFullYear()) {
      return -1;
    }
    if (a.end.getFullYear() < b.end.getFullYear()) {
      return 1
    }
    return 0;
  }
  ArchiveData.sort(compare)
  return (
    <>
      <div className="container text-center text-white">
        <LOGO />
        <div className='d-block d-sm-none py-4 text-start'>
          {ArchiveData.map((data, index) => {
            if (new Date().getFullYear() >= data.end.getFullYear()) {
              return (
                <div key={index} className="row my-4 py-2" style={{ backgroundColor: "rgba(0, 255, 255, 0.3)", color: "rgb(45, 67, 99)" }}>
                  <div className="col-12">
                    <div className='d-flex'><h5 style={{ fontWeight: "bold" }}>Title:-</h5> <h6>{data.title}</h6></div>
                    <div className='d-flex'><h5 style={{ fontWeight: "bold" }}>Date:-</h5> <h6 className='mt-1'>{data.start.getDate() + "-" + (data.start.getMonth() + 1) + "-" + data.start.getFullYear()}</h6></div>
                    <div className='d-flex'> <h5 style={{ fontWeight: "bold" }}>Time:-</h5> <h6 className='mt-1'> {data.start.toLocaleTimeString() + " - " + data.end.toLocaleTimeString()}</h6></div>
                    <NavLink to={data.pdf} target="_blank"><button className='btn btn-info'>Report</button></NavLink>
                  </div>
                </div>
              )
            }

          })}
        </div>
        <div className='d-none d-sm-block'>
          <div className="row my-3 bg-dark py-2" style={{ fontWeight: "bold" }}>
            <div className="col-3">
              <h5>TITLE</h5>
            </div>
            <div className="col-3">
              <h5>DATE</h5>
            </div>
            <div className="col-4">
              <h5>TIME</h5>
            </div>
            <div className="col-2">
              <h5>DETAILS</h5>
            </div>
          </div>

          {ArchiveData.map((data, index) => {
            if (new Date().getFullYear() >= data.end.getFullYear()) {
              return (
                <div key={index} className="row my-2 py-2" style={{ backgroundColor: "rgba(0, 255, 255, 0.3)", color: "rgb(45, 67, 99)" }}>
                  <div className="col-3 my-auto">
                    <h6>{data.title}</h6>
                  </div>
                  <div className="col-3 my-auto">
                    <h6>{data.start.getDate() + "-" + (data.start.getMonth() + 1) + "-" + data.start.getFullYear()}</h6>
                  </div>
                  <div className="col-4 my-auto">
                    <h6>{data.start.toLocaleTimeString() + " - " + data.end.toLocaleTimeString()}</h6>
                  </div>
                  <div className="col-2 my-auto">
                    <NavLink to={data.pdf} target="_blank" disabled><button className='btn btn-info' >Report</button></NavLink>
                  </div>
                </div>
              )
            }

          })}

        </div>
      </div>

    </>
  )
}

export default Archive
