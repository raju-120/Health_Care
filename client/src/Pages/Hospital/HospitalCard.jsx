import React from 'react'

export default function HospitalCard({data}) {
    const {name,address,number,branch} = data;
  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Hospital Name: {name}</h2>
                <p>Number: {number}</p>
                <p>Branch: {branch}</p>
                <p>Address: {address}</p>
                
            </div>
        </div>
    </div>
  )
}
