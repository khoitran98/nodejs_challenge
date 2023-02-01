const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOperator, createOperator, getOperatorSchedule } = require('./operators.service');

const operatorsRouter = express.Router();

operatorsRouter
    .get( 
        '/:operatorId'
        , async ( req, res ) => {
            const operatorId = req.params.operatorId;
            try {
                const operator = await getOperator( operatorId );

                if (operator == null) {
                    return res
                    .status( 404 )
                    .json( { "message": "Resource not found" } )
                }

                return res
                    .status( 200 )
                    .json( operator )

            } catch (error) {
                return res
                    .status( 400 )
                    .json( { "message": error.message } )
            }
        }
    )
    .get( 
        '/:operatorId/schedules'
        , async ( req, res ) => {
            const operatorId = req.params.operatorId;
            try {
                const schedule = await getOperatorSchedule( operatorId );
                
                if (schedule == null) {
                    return res
                    .status( 404 )
                    .json( { "message": "Resource not found" } )
                }

                return res
                    .status( 200 )
                    .json( schedule )

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
                await createOperator( {
                    firstName: req.body.firstName
                    , lastName: req.body.lastName
                } );

                const operatorId = await getLastInsertId();
                const createdOperator = await getOperator( operatorId );
                
                return res
                    .status( 201 )
                    .json( createdOperator )

            } catch (error) {
                return res
                    .status( 400 )
                    .json( { "message": error.message } )
            }
        }
    );

module.exports = {
    operatorsRouter
}