module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'ReactWebChat',
            externals: {
                react: 'React'
            }
        }
    }
};
