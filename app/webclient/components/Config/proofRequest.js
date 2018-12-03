var obj={};

// name:this.state.name,
// //     degree:
// //     status
// //     year
// //     average
// //     ssn
// //     dateOfBirth:this.state.date
obj.grammarschoolcertificate={
    'nonce': '1432422343242122312411212',
    'name': 'grammarSchoolApplication',
    'version': '0.1',
    'requested_attributes': {
        'attr1_referent': {
            'name': 'name',
            'restrictions': [{'cred_def_id': 'RequiredTranscriptId'}]
        },
        'attr2_referent': {
            'name': 'dateOfBirth',
            'restrictions': [{'cred_def_id': 'RequiredTranscriptId'}]
        },
        'attr3_referent': {
            'name': 'mobileNumber',
            }
        
    },
    'requested_predicates': {}
}


exports = module.exports=obj;