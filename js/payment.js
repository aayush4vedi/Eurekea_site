var stripe = Stripe('pk_live_51HdkIZF7Uiqhzjej8jmVn0cPP7nHUz8WWf5tXCAuN9RUdvMqz1HFMf8c2jIeqodpvVEyp5sboQbM2Upq77k5FeUS00nBr8DiFh');

$('#plan1_payment_form').submit( async function(){
  event.preventDefault();
  $("#plan_1_pay_btn").text('');
  $("#plan_1_pay_btn").append('<span class="spinner"></span>');
  $("#plan_1_pay_btn").addClass("spin");
  $("#plan_1_pay_btn").addClass("btn-Stripe");
  $("#plan_1_pay_btn").prop("disabled", true);  //disable the button

  var email = document.getElementById('plan1_payment_form').elements[2].value
  let isIndian = false;
  if(document.getElementById('plan1_payment_form').elements[0].checked){
    isIndian = true;
  }

  //write [email, plan, country, time] in firebase realtime DB
  var date = new Date()
  var currTime = date.toDateString() + "-" + date.toLocaleTimeString()
  firebase.database().ref('entry').push({ email: email, plan: "first",isIndian: isIndian,timestamp: currTime})
    .then(function(snapshot) {
        console.log("Entry made to RTDB");
        }, function(error) 
        {
            console.log('error' + error);
        })
    .then(()=>{
      //goto stripe checkout
      if(isIndian){
        // goto plan_1.INR
        stripe.redirectToCheckout({
          lineItems: [{price: 'price_1I5BnWF7UiqhzjejUmOZRsF9', quantity: 1}],
          mode: 'payment',
          successUrl: 'https://www.eurekea.org/yay',
          cancelUrl: 'https://www.eurekea.org/nay',
        })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      }else{
        // goto plan1.DLR
        stripe.redirectToCheckout({
          lineItems: [{price: 'price_1I5BmAF7Uiqhzjej50dn5Cch', quantity: 1}],
          mode: 'payment',
          successUrl: 'https://www.eurekea.org/yay',
          cancelUrl: 'https://www.eurekea.org/nay',
        })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      }
    })
})

$('#plan2_payment_form').submit( async function(){
  event.preventDefault();
  $("#plan_2_pay_btn").text('');
  $("#plan_2_pay_btn").append('<span class="spinner"></span>');
  $("#plan_2_pay_btn").addClass("spin");
  $("#plan_2_pay_btn").addClass("btn-Stripe");
  $("#plan_1_pay_btn").prop("disabled", true);  //disable the button

  var email = document.getElementById('plan2_payment_form').elements[2].value
  let isIndian = false;
  if(document.getElementById('plan2_payment_form').elements[0].checked){
    isIndian = true;
  }
  //write [email, plan, country, time] in firebase realtime DB
  var date = new Date()
  var currTime = date.toDateString() + "-" + date.toLocaleTimeString()
  firebase.database().ref('entry').push({ email: email, plan: "second", isIndian: isIndian, timestamp: currTime})
    .then(function(snapshot) {
        console.log("Entry made to RTDB");
        }, function(error) 
        {
            console.log('error' + error);
        })
    .then(()=>{
      //goto stripe checkout
      if(isIndian){
        // goto plan_2.INR
        stripe.redirectToCheckout({
          lineItems: [{price: 'price_1I58rvF7UiqhzjejVy9rjnuY', quantity: 1}],
          mode: 'subscription',
          successUrl: 'https://www.eurekea.org/yay',
          cancelUrl: 'https://www.eurekea.org/nay',
        })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      }else{
        //goto plan_2.Dlr
        stripe.redirectToCheckout({
          lineItems: [{price: 'price_1I58qjF7UiqhzjejKSo97H1z', quantity: 1}],
          mode: 'subscription',
          successUrl: 'https://www.eurekea.org/yay',
          cancelUrl: 'https://www.eurekea.org/nay',
        })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      }
    })

  
})


/*--------------------------------- POPUP before payemnt --------------------*/

// =============================== First Popup
// Get the popup_first
var popup_first = document.getElementById('payment_popup_1');

// Get the button that opens the popup_first
var payment_btn_1 = document.getElementById("payment_btn_1");

// Get the <span> element that closes the popup_first
var closebtn1 = document.getElementById("popup_close_btn1");

// When the user clicks the button, open the popup_first
payment_btn_1.onclick = function() {
    popup_first.style.display = "block";
}

// When the user clicks on <span> (x), close the popup_first
closebtn1.onclick = function() {
    popup_first.style.display = "none";
}


// =============================== First Popup
var popup_second = document.getElementById('payment_popup_2');
var payment_btn_2 = document.getElementById("payment_btn_2");
var closebtn2 = document.getElementById("popup_close_btn2");
payment_btn_2.onclick = function() {
    popup_second.style.display = "block";
}
closebtn2.onclick = function() {
    popup_second.style.display = "none";
}

// When the user clicks anywhere outside of the popup_first, close it
window.onclick = function(event) {
    if (event.target == popup_first ||event.target == popup_second) {
        popup_first.style.display = "none";
        popup_second.style.display = "none";
    }
}