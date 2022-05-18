import { pollAPI, checkPollingStatus } from './backend/services/poll-api.mjs';

const main = async function () {
    await pollAPI(
        {
            url: 'localhost',
            endpoint: '/api/status',
            port: 5000,
            useHTTPS: false,
            requestType: 'GET',
            notify: false,
        },
        1000
    );

    await checkPollingStatus();
};

main();
