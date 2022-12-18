module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Content-Type', 'application/json')
    // res.setHeader('X-authorizaton','auth-cookie')
    // res.setHeader('Set-Cookie:http-only')
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization,X-Requested-With');
    next();
};