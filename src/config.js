// Check the environment
const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
    typingStatus: {
        active: true,
        baseDelay: 200,
        variance: 100,
        letterDelay: 10,
        minDelay: 200,
        maxDelay: 2000
    },
    network: {
        retransmissionTimeout: 500,
        retransmissionAttempts: 10,
        eventNamespace: 'rwc'
    },
    debug: isDevelopment
};
