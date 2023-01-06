//contains all our API requests

export const sendContactForm = async (data) => {
  //headers are important because when NextJS, in the request handlers sees that the header type is application/JSON it'll know to automatically parse the body for you, so we wont have to do it on every request on our own.
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to send Message');
    } else {
      return res.json(); //returns the response body parsed
    }
  });
};
