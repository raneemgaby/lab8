const statusElement = document.querySelector('#response-status');              //having a snapshot of the response status
const bodyElement = document.querySelector('#response-body');                  //having a snapshot of the response body

document.querySelectorAll('[data-route]').forEach((button) => {                //adding event listener to each clicked button
  button.addEventListener('click', async () => {
    const route = button.dataset.route;
    const method = button.dataset.method || 'GET';                             //if the method is NULL/undefined use the GET http method instead

    statusElement.textContent = `Sending ${method} ${route}...`;
    bodyElement.textContent = '';

    try {                                                                      //fetching the path's route and the http method used with it
      const response = await fetch(route, { method });
      const responseText = await response.text();
      let formattedBody = responseText;

      try {
        formattedBody = JSON.stringify(JSON.parse(responseText), null, 2);     //parsing the respomse text wihtout changing it's propert,with adding indent with 2 spaces
      } catch {
        formattedBody=responseText;
      }

      statusElement.textContent = `${method} ${route} — ${response.status} ${response.statusText}`; 
      bodyElement.textContent = formattedBody || '(empty response)';            //if the method is NULL/undefined give empty response instead
    } catch (error) {                                                           //catching fetching failure
      statusElement.textContent = `Could not reach ${route}`;
      bodyElement.textContent = error.message;
    }
  });
});
