import { getAPIStatus } from './backend/bucket-of-worms.mjs';

const main = async function () {
    await getAPIStatus('GET', null, 'localhost', '/api/status', 5000, false);
};

main();
