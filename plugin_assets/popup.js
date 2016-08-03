var yammer = new OAuth2('yammer', {
  client_id: '4U9LMyxNql8uwVusWytHfw',
  client_secret: '3wGDnQpuz6Auu3ZHHXYxUMmD8W6NrxoCsXLLfaxdZg'
});

yammer.authorize(function() {
  var acc = yammer.getAccessToken();
  // store the accessToken for background script
  localStorage.setItem('newAccessToken', acc);
});
