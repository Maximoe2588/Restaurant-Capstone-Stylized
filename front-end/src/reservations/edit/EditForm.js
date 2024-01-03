import React from "react";
import Form from "../form/Form";



function EditForm() {
    return (
        <section>
            <div className="d-md-flex mb-3 text-center">
                <h1 className="mb-0">Edit Reservation</h1>
            </div>
                <Form method={"PUT"} />
        </section>
    );
}

export default EditForm;