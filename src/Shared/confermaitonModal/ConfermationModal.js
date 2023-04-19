import React from 'react';

const ConfermationModal = ({ title, message, closeModal, successAction, modalData, successButtonName }) => {
    return (
        <div>
            <input type="checkbox" id="confermation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label 
                        onClick={() => successAction(modalData)} 
                        htmlFor="confermation-modal" 
                        className="btn btn-primary">{successButtonName}</label>
                        <button onClick={closeModal} className='btn btn-outline' type="">cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfermationModal;