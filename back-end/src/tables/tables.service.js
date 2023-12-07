const knex = require("../db/connection");



function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}



function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((newTables) => newTables[0]);
}



function read(id) {
    return knex("tables")
        .select("*")
        .where({ table_id: id })
        .then((result) => result[0]);
}

async function update(tableToUpdate, reservationId, updatedReservationStatus) {
    try {
        const [updatedTable, updatedReservation] = await knex.transaction(async (trx) => {
        const updatedTables = await trx("tables")
            .where({ table_id: tableToUpdate.table_id })
            .update(tableToUpdate, "*");
        const updatedTable = updatedTables[0];

        const updatedReservations = await trx("reservations")
            .where({ reservation_id: reservationId })
            .update({ status: updatedReservationStatus }, "*");
        const updatedReservation = updatedReservations[0];

        return [updatedTable, updatedReservation];
    });

        return {
            updatedTable,
            updatedReservation
        };
    } catch (error) {
        console.error(error);
        throw new Error("Transaction failed to update table and reservation.");
    }
}


module.exports = {
    create,
    read,
    list,
    update,
};

