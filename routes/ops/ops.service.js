const { query } = require("../../db/query")

const getOp = async ( opId ) => {
    const text = `
        SELECT *
        FROM ops
        WHERE id = $1;
    `;
    const [ op ] = await query( text, [ opId ] ).catch((error) => {
        console.error(error.message);
        throw error;
    });
    return op;
};

const createOp = async ( { operatorId, businessId, opTitle, pay, startTime, endTime } ) => {
    const text = `
        INSERT INTO ops
        ( "operatorId", "businessId", "opTitle", "pay", "startTime", "endTime" )
        VALUES ( $1, $2, $3, $4, $5, $6 )
    `;
    await query( text, [ operatorId, businessId, opTitle, pay, startTime, endTime ] ).catch((error) => {
        console.error(error.message);
        throw error;
    });
};

module.exports = {
    getOp
    , createOp
}

