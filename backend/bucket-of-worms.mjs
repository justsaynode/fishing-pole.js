/**
 * This is the backend file for fish-pole, used as the entrypoint for all the different polling functions
 */

import notifier from 'node-notifier';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import fetch from 'node-fetch';

const sendRequest = async function (
    options = {
        requestType: 'GET',
        requestBody: null,
        url: 'localhost',
        endpoint: '/api/status',
        port: 5000,
        useHTTPS: false,
    }
) {
    const { requestType, requestBody, url, endpoint, useHTTPS } = options;
    let { port } = options;

    const fetchOptions = {
        method: requestType,
        body: requestBody,
        headers: { 'Content-Type': 'application/json' },
    };

    //use a port if one is supplied
    if (port) {
        port = `:${port}`;
    } else {
        port = '';
    }

    //build the URL from the parts that are passed in (http://localhost:5000/api/status, for example)
    const builtURL = `${
        useHTTPS ? 'https://' : 'http://'
    }${url}${port}${endpoint}`;

    try {
        const response = await fetch(builtURL, fetchOptions);
        const status = response.status;
        const responseText = await response.text();

        return {
            message: responseText,
            status,
            url: builtURL,
        };
    } catch {
        return {
            message: 'Server Error!',
            status: 500,
            url: builtURL,
        };
    }
};

const notifyUser = function (message) {
    notifier.notify({
        title: 'Fishing Pole.JS Status',
        message: message,
        icon: path.join(__dirname, '../assets/fish.png'),
        sound: true,
    });
};

const getAPIStatus = async function (
    options = {
        requestType: 'GET',
        requestBody: null,
        url: 'localhost',
        endpoint: '/api/status',
        port: 5000,
        useHTTPS: false,
        notify: false,
    }
) {
    const { notify } = options;
    const response = await sendRequest(options);

    if (notify) {
        const message = `API at ${response.url} responded with status code ${response.status}`;

        notifyUser(message);
    }

    return response;
};

export { getAPIStatus, notifyUser };
