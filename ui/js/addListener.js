const addAPIListener = function (
    options = {
        requestType: 'GET',
        url: 'localhost',
        endpoint: '/api/status',
        port: 5000,
    }
) {
    const wrapper = document.createElement('div');
    wrapper.id = `listener-${API_LISTENERS.length}`;

    let apiPort = options.port;
    if (!apiPort && !options.url.includes('https')) {
        apiPort = 80;
    } else if (!apiPort) {
        apiPort = 443;
    }
    //status circle
    const status = document.createElement('span');
    status.className = 'circle red';
    status.id = `listener-status-${API_LISTENERS.length}`;

    //URL display
    const urlDisplay = document.createElement('div');
    urlDisplay.id = `listener-url-display-${API_LISTENERS.length}`;
    urlDisplay.innerHTML = `${options.url}${options.endpoint}:${apiPort}`;

    //notify user of changes
    const chkNotify = document.createElement('input');
    chkNotify.type = 'checkbox';
    chkNotify.checked = true;
    chkNotify.id = `listener-notify-${API_LISTENERS.length}`;

    wrapper.appendChild(status);
    wrapper.appendChild(urlDisplay);
    wrapper.appendChild(chkNotify);

    document.getElementById('current-listeners').appendChild(wrapper);
};
