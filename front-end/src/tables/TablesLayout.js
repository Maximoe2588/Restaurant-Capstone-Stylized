import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesLayout({ table }) {
    const { table_name, table_id, capacity, reservation_id } = table;
    const [finishTableError, setFinishTableError] = useState(null);
    const history = useHistory();


    const occupied = !!reservation_id;


    let tableStatusClass = occupied ? "occupied" : "free";
    let cardHeaderClass = "card-header p-0 py-2";

    if (occupied && reservation_id) {
        tableStatusClass += " seated";
        cardHeaderClass += " seated";
    }

  
  

    const confirmFinish = async () => {
        if (
            window.confirm(
                "Is this table ready to seat new guests?"
            )
        ) {
        
            const abortController = new AbortController();
            setFinishTableError(null);

            try {
              
                await finishTable(table_id, abortController.signal);
                
                history.go(0);
            } catch (error) {
                setFinishTableError(error);
            } finally {
                abortController.abort();
            }
        }
    };

   

    return (
        <div style={{ minWidth: "200px", maxWidth: "200px" }}>
            <h5 className={cardHeaderClass}>Table {table_name}</h5>
            <div className={tableStatusClass}>
                <div>
                    {`Status: `}
                    <span data-table-id-status={`${table_id}`} className={tableStatusClass}>
                        {occupied ? "Occupied" : "Free"}
                    </span>
                </div>
                <p>
                    Capacity:{" "}
                    <span>
                        {capacity}
                    </span>
                </p>
                {occupied && (
                    <button
                        data-table-id-finish={`${table_id}`}
                        onClick={confirmFinish}
                    >
                        Finish
                    </button>
                )}
                <ErrorAlert error={finishTableError} />
            </div>
        </div>
    );
}

export default TablesLayout;
