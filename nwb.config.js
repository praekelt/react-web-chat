module.exports = {
    type: 'react-component',
    npm: {
        esModules: false,
        umd: {
            global: 'ReactWebChat',
            externals: {
                react: 'React'
            }
        }
    }
};
