if(process.env.NODE_ENV === 'development'){
    module.exports = require('react');
} else {
    module.exports = function(){};
}
