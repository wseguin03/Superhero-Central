const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
   
    policyName: {
        type: String,
        required: true
    },
    policyDescription: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Policy', PolicySchema);

// const PolicySchema = mongoose.Schema({
//     securityAndPrivacyPolicy: {
//         type: String,
//         required: false
//     },
//     dmcaNoticeAndTakedownPolicy: {
//         type: String,
//         required: false
//     },
//     acceptableUsePolicy: {
//         type: String,
//         required: false
//     },
//     dmcaTakedownProcedure: {
//         type: String,
//         required: false
//     },
//     toolsDescription: {
//         type: String,
//         required: false
//     },
//     active: {
//         type: Boolean,
//         required: false
//     },
// });
// module.exports = mongoose.model('Policy', PolicySchema);