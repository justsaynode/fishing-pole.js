import { getAPIStatus, notifyUser } from '../backend/bucket-of-worms.mjs';

const apis = {};

const intervals = {};

/**
 * Poll the API at regular intervals to check for status changes
 * @param {Object} options The options for the request
 * @param {Number} interval The number of MS between requests
 *
 * TODO : fix issue where if response takes a long time, you could end up with many duplicate requests
 */
const pollAPI = async function (
    options = {
        requestType: 'GET',
        requestBody: null,
        url: 'localhost',
        endpoint: '/api/status',
        port: 5000,
        useHTTPS: false,
    },
    interval = 1000
) {
    options.notify = true;
    const initialResponse = await getAPIStatus(options);
    options.notify = false;
    apis[initialResponse.url] = initialResponse.status;

    intervals[initialResponse.url] = setInterval(async function () {
        const response = await getAPIStatus(options);

        if (response.status != apis[initialResponse.url]) {
            apis[initialResponse.url] = response.status;
            notifyUser(
                `API at ${initialResponse.url} changed to status ${response.status}!`
            );
        }
    }, interval);
};

const stopPolling = function (url) {
    clearInterval(intervals[url]);
};

/**
 * Debug function, not meant to be used for anything frontend
 * @returns
 */
const checkPollingStatus = async function () {
    return new Promise((reject, resolve) => {
        setInterval(function () {
            if (Object.keys(intervals).length == 0) {
                resolve('No more polling!');
            }
        }, 1000);
    });
};

export { stopPolling, pollAPI, checkPollingStatus };
