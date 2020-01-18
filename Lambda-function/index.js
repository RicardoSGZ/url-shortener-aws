const AWS = require("aws-sdk");
let s3 = new AWS.S3();

exports.handler = (event, context, callback) => {

    let event_body = JSON.parse(event.body);
    let filename = event_body.filename;
	let url_to_shorten = event_body.url_to_shorten;
	const BUCKET_NAME = "";
    
    let params= {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: "",
        WebsiteRedirectLocation: url_to_shorten,
        Tagging: "fileType=redirect"
    };
    
    let params_check = {
        Bucket: BUCKET_NAME,
        Key: filename,
    }
    
    s3.headObject(params_check, function(err, data) {
        if(err) {
            s3.upload(params, function(err2, data){
                if(err2){
                    let response = {
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: "ERROR, SERVER ERROR"
                    };
                    callback(null, response);
                } else {
                    let response = {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: "OK"
                    };
                    callback(null, response);
                }
            });
        } else {
            let response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: "ERROR, DESCRIPTIVE TEXT ALREADY EXISTS LINKED WITH ANOTHER URL"
            };
            callback(null, response);
        }
    })
    
    
};