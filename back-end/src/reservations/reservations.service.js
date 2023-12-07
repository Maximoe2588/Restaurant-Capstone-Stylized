const knex = require("../db/connection");


const searchByDate = async (date) => {
  const reservations = await knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot("status", "finished")
    .orderBy("reservation_time");
  return reservations;
};


const searchByPhone = async (mobile_number) => {
  const reservations = await knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
  return reservations;
};


function read(id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: Number(id) })
    .then((result) => result[0]);
}


function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((result) => result[0]);
}


function update(reservation_id, updatedReservation) {
  return knex("reservations")
    .where({ reservation_id })
    .update(updatedReservation, "*")
    .then((result) => result[0]);
}

function updateReservationAvailability(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status }, "*");
}

module.exports = {
  searchByDate,
  searchByPhone,
  create,
  read,
  update,
  updateReservationAvailability,
};
