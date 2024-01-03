import React, { useState } from "react";
import { listReservationsByMobile } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import ReservationsList from "../../reservations/list/ReservationsList";


function Search() {

   

    const [mobileNumber, setMobileNumber] = useState([""]);

 

    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    

    const initialMessage = "search current reservations...";
    const [resultsMessage, setResultsMessage] = useState(initialMessage);

    
    const handleChange = ({ target }) => {
        setMobileNumber(target.value);
    };

 
    function loadReservations() {
        const abortController = new AbortController();
        setReservationsError(null);
        setReservations([]);
        setResultsMessage("...searching now!");

        
        listReservationsByMobile(mobileNumber, abortController.signal)
            .then(setReservations)
            .then(() => {
                if (reservations.length === 0) {
                setResultsMessage("No reservations found");
            }
        })
        
            .catch(setReservationsError);
        
        return () => abortController.abort();
    }

   
    const handleSubmit = (event) => {
        event.preventDefault();

        loadReservations();
    };

    
    const searchResults = reservations.length ? (
    <>
        <h6 className="mt-5">Search Results:</h6>
        <ReservationsList reservations={reservations} />
    </>
    ) : (
        resultsMessage
);

    
    return (
        <main>
        <div className="d-md-flex mb-3 text-center">
            <h1 className="mb-0">Search</h1>
        </div>
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group mb-2">
            <label className="sr-only">mobile_number</label>
            <input
                id="mobile_number"
                name="mobile_number"
                type="phone"
                className="form-control"
                placeholder="Enter customer's phone #"
                onChange={handleChange}
                value={mobileNumber}
                required={true}
        />
            </div>
            <button type="submit" className="btn btn-primary ml-2 mb-2">
                <span className="oi oi-magnifying-glass mr-2" />
                Find
            </button>
        </form>
        {searchResults}
            <ErrorAlert error={reservationsError} />
        </main>
    );
}

export default Search;