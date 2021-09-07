'use strict';
const data = require('dotenv').config();

const { BigQuery } = require('@google-cloud/bigquery');


const main = {

    // Import the Google Cloud client library


   getAllProperties: async (req,res) => {
        // Queries a public Shakespeare dataset.

        // Create a client
        try{

            const bigqueryClient = new BigQuery();
            
            // The SQL query to run
            // const sqlQuery = `SELECT  dev.*,pro.Property_Name,pro.meter_serial_number, pro.Attached_To__Unit_,pro.Appt, pro.Building,pro.Bedrooms, pro.Bathrooms FROM 'ion-energy-solutions-293023.ion_message_ingress.H2O_Developer_Info' AS dev LEFT JOIN  'ion-energy-solutions-293023.ion_message_ingress.Property_Info' AS pro ON dev.PropertyID = pro.PropertyID LIMIT 1000;`;
            const sqlQuery = `SELECT  dev.*,pro.Property_Name,pro.meter_serial_number, pro.Attached_To__Unit_,pro.Appt, pro.Building,pro.Bedrooms, pro.Bathrooms FROM ion-energy-solutions-293023.ion_message_ingress.H2O_Developer_Info AS dev LEFT JOIN  ion-energy-solutions-293023.ion_message_ingress.Property_Info AS pro ON dev.PropertyID = pro.PropertyID LIMIT 1000`;
            const options = {
                // keyFilename: 'E:\eSpark\jack-backend\secret\ion-energy-solutions-293023-09c11dd2963b.json',
            keyFilename: data.parsed.GOOGLE_APPLICATION_CREDENTIALS,
            projectId: 'ion-energy-solutions-293023',
            query: sqlQuery,
            // Location must match that of the dataset(s) referenced in the query.
            // location: 'US',
            // params: {corpus: 'romeoandjuliet', min_word_count: 250},
        };
        
        // Run the query
        const [rows] = await bigqueryClient.query(options);
        res.send({success: true,data:rows})
        // rows.forEach(row => res.send({success: true,data:row}));
    }
    catch(err){
        res.send({success: false,error:err.message || "Something went wrong"})
    }
    }

}


module.exports = main;