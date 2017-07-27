$(document).ready(function() {
  const interest = .12 / 12;

  let loan = { amount: '', duration: '' };

  $('.loan').change(function(e) {
    loan.duration = e.target.value;
    if(loan.amount && loan.duration) monthlyPayment();
  });

  $('.loan-amt').on('focusout', function(e) {
    // Regex that checks that only whole numbers are being input
    if(/^\d+$/.test(e.target.value) && e.target.value < 1000001) {
      loan.amount = e.target.value;
      $(this).removeClass('invalid');
      $(this).parent().next().removeClass('error-show');
      if(loan.amount && loan.duration) monthlyPayment();
    } else {
      $(this).val('');
      $(this).addClass('invalid');
      $(this).parent().next().addClass('error-show');
    }
  });

  $('.form').on('submit', function(e) {
    let validForm = true;

    let name = $('.name').val();
    let phone = $('.phone').val();
    let email = $('.email').val();
    let zip = $('.zip').val();

    if(!validateName(name)) validForm = false;
    if(!validatePhone(phone)) validForm = false;
    if(!validateEmail(email)) validForm = false;
    if(!validateZip(zip)) validForm = false;

    if(!validForm) {
      e.preventDefault();
    } else {
      console.log('Form Will Submit');
    }
  });

  // Monthly payment based on effective interest
  function monthlyPayment() {
    let monthlyPayment = (loan.amount * (interest / (1 - Math.pow(1 + interest,-loan.duration)))).toFixed(2);

    $('.payment').text(function() {
      return 'Your Estimated Monthly Payment is $' + monthlyPayment
    });
  }

  // Validator functions
  function validateName(name) {
    if(name) {
      $('.name').parent().next().removeClass('error-show');
      $('.name').removeClass('invalid');
      return true;
    } else {
      $('.name').parent().next().addClass('error-show');
      $('.name').addClass('invalid');
      return false;
    }
  }

  function validatePhone(phone) {
    if(/^\d+$/.test(phone) && phone.length === 10) {
      $('.phone').parent().next().removeClass('error-show');
      $('.phone').removeClass('invalid');
      return true;
    } else {
      $('.phone').parent().next().addClass('error-show');
      $('.phone').addClass('invalid');
      return false;
    }
  }

  function validateEmail(email) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(email) && email) {
      $('.email').parent().next().removeClass('error-show');
      $('.email').removeClass('invalid');
      return true;
    } else {
      $('.email').parent().next().addClass('error-show');
      $('.email').addClass('invalid');
      return false;
    }
  }

  function validateZip(zip) {
    if(/^\d+$/.test(zip) && zip.length === 5) {
      $('.zip').parent().next().removeClass('error-show');
      $('.zip').removeClass('invalid');
      return true;
    } else {
      $('.zip').parent().next().addClass('error-show');
      $('.zip').addClass('invalid');
      return false;
    }
  }

});
