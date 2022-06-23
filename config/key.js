if(process.env.NODE_ENV === 'production'){//환경변수
    module.exports = require('./prod');
}else {// if(process.env.NODE_ENV === 'development')
    module.exports = require('./dev');
}