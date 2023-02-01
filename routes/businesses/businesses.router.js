const express = require('express');
const { getLastInsertId } = require('../../db');
const { getBusiness, createBusiness } = require('./businesses.service');

const businessesRouter = express.Router();

businessesRouter
    .get( 
        '/:businessId'
        , async ( req, res ) => {
            const businessId = req.params.businessId;
            try {
                const business = await getBusiness( businessId );

                if (business == null) {
                    return res
                    .status( 404 )
                    .json( { "message": "Resource not found" } )
                }

                return res
                    .status( 200 )
                    .json( business )
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
                await createBusiness( {
                    businessName: req.body.businessName
                    , addressLine1: req.body.addressLine1
                    , addressLine2: req.body.addressLine2
                    , city: req.body.city
                    , state: req.body.state
                    , zip: req.body.zip
                } );

                const businessId = await getLastInsertId();
                const createdBusiness = await getBusiness( businessId );

                return res
                    .status( 201 )
                    .json( createdBusiness )
            } catch (error) {
                return res
                    .status( 400 )
                    .json( { "message": error.message } )
            }
        }
    );

module.exports = {
    businessesRouter
}
