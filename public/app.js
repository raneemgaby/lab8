const statusElement = document.querySelector('#response-status');
const bodyElement = document.querySelector('#response-body');

document.querySelectorAll('[data-route]').forEach((button) => {
  button.addEventListener('click', async () => {
    const route = button.dataset.route;
    const method = button.dataset.method || 'GET';

    statusElement.textContent = `Sending ${method} ${route}...`;
    bodyElement.textContent = '';

    try {
      const response = await fetch(route, { method });
      const responseText = await response.text();
      let formattedBody = responseText;

      try {
        formattedBody = JSON.stringify(JSON.parse(responseText), null, 2);
      } catch {
        formattedBody=responseText;
      }

      statusElement.textContent = `${method} ${route} — ${response.status} ${response.statusText}`;
      bodyElement.textContent = formattedBody || '(empty response)';
    } catch (error) {
      statusElement.textContent = `Could not reach ${route}`;
      bodyElement.textContent = error.message;
    }
  });
});