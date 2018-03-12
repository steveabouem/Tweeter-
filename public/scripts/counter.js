$(document).ready(function(){
    $("textarea").keyup(function(){
    let input = $("textarea")[0].value;
    let CharRemaining = 140 - input.length;
    let numb = $(this).find($(".counter").text(CharRemaining));
    if (CharRemaining < 0) {
        $(this).find($(".counter").css("color", "red"))
    } else {
        $(this).find($(".counter").css("color", "blue"))
    }
    // console.log(numb)
    })
    
});
