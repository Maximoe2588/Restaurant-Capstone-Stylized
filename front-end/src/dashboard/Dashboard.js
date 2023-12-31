import React, { useEffect, useState } from "react";
import useQuery from "../utils/useQuery";
import { listReservations, listTables } from "../utils/api";
import formatDisplayDate from "../utils/format-display-date";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavig";
import ReservationsList from "../reservations/list/ReservationsList";
import TablesList from "../tables/TablesList";
import CustomDatePicker from "./CustomDatePicker";
import "./Dashboard.css";
import { today } from "../utils/date-time";



function Dashboard() {
    /*const dateInUrl = useQuery().get("date");
    if (dateInUrl) {
      date = dateInUrl;
    }*/

    const query = useQuery();
    const dateQuery = query.get("date");
    const [date, setDate] = useState(dateQuery || today());
  
  
  
    const [reservations, setReservations] = useState("loading");
    const [reservationsError, setReservationsError] = useState(null);
  
    const [tables, setTables] = useState("loading");
    const [tablesError, setTablesError] = useState(null);

    useEffect(() => {
      if (dateQuery) {
        setDate(dateQuery);
      }
    }, [dateQuery]);
  
    /*useEffect(loadReservations, [date]);
    useEffect(loadTables, []);
    useEffect(() => {
      console.log('Dashboard date has changed:', date);
      loadReservations();
  }, [date]);*/

  
    /*function loadReservations() {
      setReservations("loading");
  
      const abortController = new AbortController();
      setReservationsError(null);
  
    
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
  
      return () => abortController.abort();
    }
  
    function loadTables() {
      setTables("loading");
      const abortController = new AbortController();
      setTablesError(null);
  
      listTables(abortController.signal).then(setTables).catch(setTablesError);
  
      return () => abortController.abort();
    }*/
  
    useEffect(() => {
      const abortController = new AbortController();
      setReservationsError(null);
  
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
  
      return () => abortController.abort();
    }, [date]);
  
    useEffect(() => {
      const abortController = new AbortController();
      setTablesError(null);
  
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
  
      return () => abortController.abort();
    }, []);
  
    // convert YYYY-MM-DD to a more user-friendly format, examples:
    // const displayDate = formatDisplayDate(date);
    // const displayDateShort = formatDisplayDate(date, "short");
    const displayDateLong = formatDisplayDate(date, "long");
    console.log('Dashboard: displayDateLong', displayDateLong);
  

    return (
      <main>
        <div className="row">
          <div className="col-12 mx-auto my-3">
            <h2 className="mb-0 text-center">{displayDateLong}</h2>
            <DateNavigation date={date} />
            <CustomDatePicker initialDate={date} className="custom-date-picker" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mx-auto">
            <fieldset className="border border-dark p-3 m-0">
              <legend className="pl-2 text-white shadow bg-dark rounded">
                Reservations
              </legend>
              <ReservationsList reservations={reservations} />
              <ErrorAlert error={reservationsError} />
            </fieldset>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 mx-auto">
            <fieldset className="border border-dark p-3 m-0">
              <legend className="pl-2 text-white shadow bg-dark rounded">
                Tables
              </legend>
              <TablesList tables={tables} />
              <ErrorAlert error={tablesError} />
            </fieldset>
          </div>
        </div>
      </main>
    );
  }
  
  export default Dashboard;