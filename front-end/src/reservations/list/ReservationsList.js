import React from "react";
import Reservation from "../reservationCard/Reservation";



function ReservationsList({ reservations }) {



    const noReservations = reservations === "loading"
        ? (
            <span className="mx-auto">
                Loading reservations...
            </span>
        )
            : reservations.length 
                ? null 
                : (  
                <span className="mx-auto">
                    No reservations found.
                </span>
                );

    let reservationsMapped;
    let reservationsList = null;
    const currentReservations = [];
    const finishedReservations = [];

  
    if (reservations.length && reservations !== "loading") {
     
        reservations.forEach((res) => {
            if (["finished"].includes(res.status)) {
            finishedReservations.push(res);
        } else {
            currentReservations.push(res);
        }
        });

        reservationsMapped = currentReservations.map((res, index) => (
        <Reservation key={index} reservation={res} />
        ));
        reservationsList = <div className="card-deck">{reservationsMapped}</div>;
    }

    return reservationsList ?? noReservations;
}

export default ReservationsList;