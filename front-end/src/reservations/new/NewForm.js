import React from "react";
import Form from "../form/Form";
import './newForm.css';


function newForm() {
    return (
        <div className="new-res-container">
        <section>
            
            <div className="d-md-flex mb-3">
                <h1 className="mb-0 text-center">New Reservation</h1>
            </div>
                <Form method={"POST"} />
            
        </section>
        </div>
    );
}

export default newForm;