import { useState } from "react";
import Modal from "../Modal/Modal";

export default function DoctorsCard({ data }) {
    const { id, deptname } = data;
    const [showModal, setShowModal] = useState(false);

    console.log("ID", id);
    console.log("Modal Click", showModal);

    const handleDept = () => {
        setShowModal(true);
    };

    return (
        <div className={`relative ${showModal ? 'blur-xs' : ''}`}>
            <div className="card w-full bg-base-100">
                <div className="text-center m-5">
                    <label
                        key={id}
                        htmlFor="my_modal"
                        className="btn"
                        onClick={handleDept}
                    >
                        {deptname}
                    </label>

                    {showModal && (
                        <Modal
                            data={data}
                            setShowModal={setShowModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

{/* <dialog id="my_modal_5" className="lg:w-2/3 modal modal-bottom sm:modal-middle" open>
                            <div className="modal-box ">
                                {data?.doctors?.map((dataInfo) => (
                                    <div key={dataInfo?.id} className="relative mb-4">
                                        <div className="card card-side bg-base-100 shadow-xl">
                                            <figure>
                                                <img
                                                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                                    alt="Doctor"
                                                    className="w-24 h-24 rounded-full"
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{dataInfo?.docname}</h2>
                                                <p>More information about the doctor goes here.</p>
                                                <div className="card-actions justify-end">
                                                    <button className="btn btn-primary">View Profile</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-outline bg-primary mt-4" onClick={closeModal}>Close</button>
                            </div>
                        </dialog> */}