//email capture mail

//for form on home page

function ValidateEmail(mail) 
{
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
        {
        return true;
        }
    else{
        return false;
        }
} 

function fail()
{
    console.log("fail called");
    $('#fail').finish().show().delay(1000).fadeOut(6000);
}
function pass()
{
    console.log("pass called");
    $('#succ').finish().show().delay(1000).fadeOut(6000);
}



// $('#email_form_btn').click(function(){
//     event.preventDefault();
//     const data = document.getElementById('emailForm').elements[0].value;
//     console.log("btn pressed");
//     if(ValidateEmail(data))
//     {
//         firebase.database().ref('emails').push({ email: data})
//             .then(function(snapshot) {
//                 console.log("Email registered!");
//                     pass(); 
//                 }, function(error) 
//                 {
//                     console.log('error' + error);
//                     fail(); 
//                 });
//         console.log("afteerrrrr firebase");
//         pass();
//         // document.getElementById('emailForm').reset();
//     }else{
//         console.log("elseee:");
//         fail();
//     }
// })