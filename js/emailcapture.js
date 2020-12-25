//email capture mail

//for form on home page
function saveToFirebase() 
{
    const data = document.getElementById('emailForm').elements[0].value;
    console.log("hee");

    if(ValidateEmail(data))
    {
        firebase.database().ref('emails').push({ email: data})
            .then(function(snapshot) {
                console.log("..... passed");
                    pass(); 
                }, function(error) 
                {
                    console.log('error' + error);
                    fail(); 
                });
        // pass0();
        document.getElementById('emailForm').reset();
    }else{
        fail();
    }

}


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
