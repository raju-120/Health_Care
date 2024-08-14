import Barcode from "react-barcode";
import logo from '../../../assets/images/logo.png'
import { color } from "framer-motion";

export default function PaymentInvoice() {
  return (
    <div className="container">
        <div className="container mt-14 p-20">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4 brcode">
                            <Barcode value="http://evercare.com/invoice" width={1} height={50} displayValue={false}/>
                        </div>
                        <div className="col-md-8 bbc">
                            <img src={logo} alt="" style={{marginLeft:'40rem'}}/>
                            <p className="mt-2" style={{marginLeft:'40rem'}}>Appointment Number: +96578955</p>
                            <p style={{marginLeft:'40rem'}}>Email: evencare@gmail.com</p>
                            <p style={{marginLeft:'40rem'}}>Address: Vungchung</p>
                        </div>
                    </div>
                    <br />
                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <h2 className="text-4xl font-semibold uppercase" style={{color: '#325aa8'}}>Invoice</h2>
                            <h4>ID: Invoice number</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                    </thead>
                    <tbody>
                  
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    
                    <tr className="hover">
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    
                    {/* <tr >
                        <td className="text-right">
                            Total Ammount: 
                        </td>
                        <td className="text-left">Ammount</td>
                    </tr> */}
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
  )
}
