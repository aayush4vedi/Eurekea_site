// $.getJSON("https://spreadsheets.google.com/feeds/list/1t2_HHLkibAybPORmXuDDEFEyetC3p7r1blQRpjzinXg/od6/public/values?alt=json", function (data) {
// $.getJSON("https://spreadsheets.google.com/feeds/cells/1ZDMgNYbwFDTnArcU9LT3GHfOQT_CpscEHTBSjPy0YjE/1/public/values?alt=json", function (data) {

//     var sheetData = data.feed.entry;

//     // for(var i=0;i<=20;i++){
//     //     console.log(data.feed.entry[i]['gs$cell']['$t']);
//     // }
    
//     for (var j = 13; j < 40;) {
//         var values = []
//         var i=0;
//         for(;i<=12;i++){
//             values.push(data.feed.entry[i+j]['gs$cell']['$t']);
//         }
//         console.log("values: ",values);
//         j = i+1;
//         row = '<tr>'
//         for( value in values){
//             row += '<td>'+value+'</td>'
//         }
//         row += '</tr>'
    
//         // document.getElementById('demo').innerHTML += ('<tr>'+'<td>'+name+'</td>'+'<td>'+age+'</td>'+'<td>'+email+'</td>'+'</tr>');
//         document.getElementById('demo').innerHTML += (row);
        
//     }
    
//   });

$('.filter').change(function(){
  filter_function();
});

$('#nav-reset-btn').click(function(){
  $('#filter-platform').attr('value',0)
  $('#filter-domain').attr('value',0) 
  $('#filter-rating').val(0) 

  $('table tr').each(function() { 
    $(this).show();
  });
});
  
$('table tbody tr').show(); //intially all rows will be shown
  
function filter_function(){
  $('table tbody tr').hide(); //hide all rows

  //declare all filter fields flags and get their values
  var platformFlag = 0;
  var platformValue = $('#filter-platform').val();
  var domainFlag = 0;
  var domainValue = $('#filter-domain').val();
  var ratingFlag = 0;
  var ratingValue = $('#filter-rating').val();
  var ratingminValue = $('#filter-rating').find(':selected').attr('data-min');
  var ratingmaxValue = $('#filter-rating').find(':selected').attr('data-max');
    
   //traversing each row one by one & display it if condition matches
  $('table tr').each(function() {  
    
    if(platformValue == 0){   //if no value then display row
      platformFlag = 1;
    }
    else if(platformValue == $(this).find('td.table_source_site').attr('bhalue')){ 
      platformFlag = 1;       //if value is same then display row
    }
    else{
      platformFlag = 0;
    }

    var rowsDomain = $(this).find('td.table_domains').attr('bhalue')
    // console.log(">> rowsDomain :: ",rowsDomain);

    if(domainValue == 0){   //if no value then display row
      domainFlag = 1;
    }
    else if(rowsDomain && rowsDomain.includes(domainValue)){
      domainFlag = 1;   
    }
    else{
      domainFlag = 0;
    }

    // console.log("domainFlag: " + domainFlag);

    // console.log("Filters: domainValue = " + domainValue);
    // console.log("Row's : " + rowsDomain);
      
    if(ratingValue == 0){
      ratingFlag = 1;
    }
    //condition to display rows for a range
    else if((ratingminValue <= $(this).find('td.table_rating').attr('bhalue') && ratingmaxValue >=  $(this).find('td.table_rating').attr('bhalue'))){
      ratingFlag = 1;
    }
    else{
      ratingFlag = 0;
    }
    
    console.log("ratingminValue: " + ratingminValue + ' , '+"ratingmaxValue: " + ratingmaxValue);
    console.log("rating_bhalue: " + $(this).find('td.table_rating').attr('bhalue'));
    console.log("======== platformFlag: " + platformFlag + " , " + "domainFlag: " + domainFlag + " , " + "ratingFlag : "+ ratingFlag);
    
    if(platformFlag && domainFlag && ratingFlag){
      $(this).show();  //displaying row which satisfies all conditions
    }
  
  });
  
    
  }
