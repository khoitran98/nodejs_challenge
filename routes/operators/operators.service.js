const { query } = require("../../db/query")

const getOperator = async ( operatorId ) => {
    const text = `
        SELECT id
            , "firstName"
            , "lastName"
            , "createdAt"
        FROM operators
        WHERE id = $1;
    `;
    const [ operator ] = await query( text, [ operatorId ] ).catch((error) => {
        console.error(error.message);
        throw error
    });
    return operator;
};

const createOperator = async ( { firstName, lastName } ) => {
    const text = `
        INSERT INTO operators
        ( "firstName", "lastName" )
        VALUES ( $1, $2 )
    `;
    await query( text, [ firstName, lastName ] ).catch((error) => {
        console.error(error.message);
        throw error;
    });
};

const getOperatorSchedule = async ( operatorId ) => {
    const text = `
        SELECT businesses.businessName
        , ops.opTitle
        , ops.pay
        , ops.startTime
        , ops.endTime
        , businesses.addressLine1
        , businesses.addressLine2
        , businesses.city
        , businesses.state
        , businesses.zip
        FROM businesses
        INNER JOIN ops
        ON businesses.id = ops.businessId
        WHERE ops.operatorId = $1;
    `;
    const schedule  = await query( text, [ operatorId ] ).catch((error) => {
        console.error(error.message);
        throw error
    });
    return schedule;
};

module.exports = {
    getOperator
    , createOperator
    , getOperatorSchedule
}