// import package here
const jwt = require ('jsonwebtoken')


exports.auth = (req, res, next) => {
  // code here
  try {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
      return res.status(401).send({
        message:"access denied"
      })
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY)

    req.users = verified

    next()
    
  } catch (error) {
    res.status(400).send({
      message:"Invalid Token"
    })
  }
};
