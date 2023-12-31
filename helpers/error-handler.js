
function errorHandler(err,req,res,next){
    
    if (err.name === 'UnauthorizedError'){
 // jwt authentication error.
        return res.status(401).json({message : 'the user in not authorised'})
    }
   
    if (err.name === 'validationError'){
// validation error.
        return res.status(401).json({message: err})
    }
// default of 500 server error.
    return res.status(500).json(err)
}
module.exports = errorHandler;