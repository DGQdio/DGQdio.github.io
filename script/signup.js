$('#signup').click(function(){
    $('.upperbox').css('transform','translateX(80%)');
    $('.signin').addClass('nodisplay');
    $('.signup').removeClass('nodisplay');
    //console.log(vm.username);
    vm.username ="";
    vm.password = "";
    vm.password2 = "";
});

$('#signin').click(function(){
    $('.upperbox').css('transform','translateX(0%)');
    $('.signup').addClass('nodisplay');
    $('.signin').removeClass('nodisplay');
    vm.username ="";
    vm.password = "";
    vm.password2 = "";
});