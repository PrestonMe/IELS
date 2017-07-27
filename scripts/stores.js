$(document).ready(function() {

  // Loan Nation locations
  const stores = [
    ['Loan Nation #1', '1283 N. Easy Street', 'Washington, D.C. 20022'],
    ['Loan Nation #2', '2700 S Dollar Street', 'Baldwin, WI. 54002'],
    ['Loan Nation #3', '1515 W Money Ave', 'San Diego, CA. 91932']
  ];

  // Getting querystring from url
  let urlParams = decodeURIComponent(window.location.search.substring(1)).split('&');

  let nameParser = urlParams[0].split('=').slice(1).shift().split('');

  while (nameParser.indexOf('+') !== -1) {
    nameParser[nameParser.indexOf('+')] = " ";
  }

  const name = nameParser.join('');
  const phone = urlParams[1].split('=').slice(1);
  const email = urlParams[2].split('=').slice(1);
  const zip = urlParams[3].split('=').slice(1);

  $('.name').text(() => name);
  $('.phone').text(() => phone);
  $('.email').text(() => email);
  $('.zip').text(() => zip);

  let location = zip < 33334 ? stores[0] : zip > 66667 ? stores[2] : stores[1];

  $('.location').text(() => location[0]);
  $('.address-one').text(() => location[1]);
  $('.address-two').text(() => location[2]);
  $('.thanks').text(() => 'Thanks ' + name + '!');

});
