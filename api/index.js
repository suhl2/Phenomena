// Build an apiRouter using express Router
const express = require("express");
const apiRouter = express.Router();
// Import the database adapter functions from the db
const {
    client,
    createReport,
    closeReport,
    getOpenReports,
    createReportComment
  } = require('../db');

apiRouter.get('/reports', async (req, res, next) => {
    const result = await getOpenReports();
    if(!result) {
        next(error);
    }
    console.log("RESULTS", result);
    res.send({reports: result});
});

apiRouter.post('/reports', async (req, res, next) => {
    const { title, location, description, password } = req.body;
    const report = {};
    report.title = title;
    report.location = location;
    report.description = description;
    report.password = password;
try {
    const result = await createReport(report);
    res.send(result);
} catch (err) {
    next(err);
}
}); 

apiRouter.delete('/reports/:reportId', async (req, res, next) => {
    try {
        const result = await closeReport(req.params.reportId, req.body.password);
        res.send(result);
    } catch (err) {
        next(err);
    }
});



/**
 * Set up a POST request for /reports/:reportId/comments
 * 
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

apiRouter.post('/reports/:reportId/comments', async (req, res, next) => {
    try {
        const result = await createReportComment(req.params.reportId, req.body);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = apiRouter;
