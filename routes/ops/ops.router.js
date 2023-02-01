const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOp, createOp } = require('./ops.service');

const opsRouter = express.Router();

opsRouter
    .get( 
        '/:opId'
        , async ( req, res ) => {
            const opId = req.params.opId;
            try {
                const op = await getOp( opId );

                if (op == null) {
                    return res
                    .status( 404 )
                    .json( { "message": "Resource not found" })
                }

                return res
                    .status( 200 )
                    .json( op )

            } catch (error) {
                return res
                    .status( 400 )
                    .json( { "message": error.message } )
            }
        }
    )
    .post( 
        '/'
        , async ( req, res ) => {
            try {
                await createOp( {
                    operatorId: req.body.operatorId
                    , businessId: req.body.businessId
                    , opTitle: req.body.opTitle
                    , pay: req.body.pay
                    , startTime: req.body.startTime
                    , endTime: req.body.endTime
                } );

                const opId = await getLastInsertId();

                const createdOp = await getOp( opId );

                return res
                    .status( 201 )
                    .json( createdOp )
            } catch (error) {
                return res
                    .status( 400 )
                    .json( { "message": error.message } )
            }
        }
    );

module.exports = {
    opsRouter
}

