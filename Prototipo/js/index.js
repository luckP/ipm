var checkData = false;

$(function(){
      
	$( window ).scroll(function() {
	 	// console.log($(this).scrollTop());
	 	var scroll = $(this).scrollTop();
	 	// var topData = $('.help-us').offset().top - $('#data-complaint').offset().top;

	 	if(scroll>=0){
			if(!checkData){
  				checkData = true;
  				incrementData(0,0,0);
  			}
	 	}

	 	if(scroll> $(window).height()){
	 		$('nav').css('position', 'fixed');
	 		$('nav').css('top', '0');
	 		$('nav').css('background-color', '#1c1c1c');
	 		$('nav').css('width', '100%');

	 	}
	 	else{
	 		$('nav').css('position', 'absolute');
	 		$('nav').css('top', 'none');
	 		$('nav').css('background-color', 'rgba(0,0,0,0)');
	 		$('nav').css('width', '100%');
	 	}

	 	if(scroll> $('#data-complaint').offset().top){
	 		$('.div-line-blue').css('width','80%');

	 	}

	});

	$('.li-menu').mouseover(function(){
		$('.li-menu').css('opacity', '0.6');
		$(this).css('opacity', '1');
      	$(this).find('div').css('width', '100%');
      	$(this).find('div').css('margin-left', '0');
      }).mouseleave(function(){
      	$('.li-menu').css('opacity', '1');
      	$(this).find('div').css('width', '0');
      	$(this).find('div').css('margin-left', '50%');
	});


      $('.div-login').click(function(){
      	$('#popup-login').show();
      });

      $('.popup-login-background').click(function(){
      	$('#popup-login').hide();
      });


      $('.back-top').click(function(){
		    $('html, body').animate({scrollTop:0}, 'slow');
		});

      $('.company').mouseover(function(){
      	$(this).find('.company-backgrund').css('width', $(this).width());
      	$(this).find('.company-backgrund').css('height', $(this).width());
      }).mouseleave(function(){
      	$(this).find('.company-backgrund').css('width', '0');
      	$(this).find('.company-backgrund').css('height', '0');
      });

   });

//melhorar
function incrementData(n1, n2, n3){

	var num1=15684, 
		num2=28342, 
		num3=33585;

	if(n1<num1){
		if(n1+1000<num1){
			var r = parseInt(Math.random()*10)%4;
			if(r==3){
				n1+=1000;
			}
			else if(r==2){
				n1+=10;
			}
			else if(r==1){
				n1+=10;
			}
			else{
				n1++;
			}
		}

		if(n1+100<num1){
			var r = parseInt(Math.random()*10)%3;
			if(r==2){
				n1+=10;
			}
			else if(r==1){
				n1+=10;
			}
			else{
				n1++;
			}
		}
		if(n1+10<num1){
			var r = parseInt(Math.random()*10)%2;
			if(r==1){
				n1+=10;
			}
			else{
				n1++;
			}
		}

		if(n1+1<num1){
			n1++;
		}
	}

	if(n2<num2){
		if(n2+1000<num2){
			var r = parseInt(Math.random()*10)%4;
			if(r==3){
				n2+=1000;
			}
			else if(r==2){
				n2+=10;
			}
			else if(r==1){
				n2+=10;
			}
			else{
				n2++;
			}
		}

		if(n2+100<num2){
			var r = parseInt(Math.random()*10)%3;
			if(r==2){
				n2+=10;
			}
			else if(r==1){
				n2+=10;
			}
			else{
				n2++;
			}
		}
		if(n2+10<num2){
			var r = parseInt(Math.random()*10)%2;
			if(r==1){
				n2+=10;
			}
			else{
				n2++;
			}
		}

		if(n2+1<num2){
			n2++;
		}
	}

	if(n3<num3){
		if(n3+1000<num3){
			var r = parseInt(Math.random()*10)%4;
			if(r==3){
				n3+=1000;
			}
			else if(r==2){
				n3+=10;
			}
			else if(r==1){
				n3+=10;
			}
			else{
				n3++;
			}
		}

		if(n3+100<num3){
			var r = parseInt(Math.random()*10)%3;
			if(r==2){
				n3+=10;
			}
			else if(r==1){
				n3+=10;
			}
			else{
				n3++;
			}
		}
		if(n3+10<num3){
			var r = parseInt(Math.random()*10)%2;
			if(r==1){
				n3+=10;
			}
			else{
				n3++;
			}
		}
		if(n3+1<num3){
			n3++;
		}
	}
	$('#data-complaint-rec').html(n1);
	$('#data-complaint-mep').html(n2);
	$('#data-complaint-utr').html(n3);

	if(n1<num1 || n2<num2 || n3<num3)
		setTimeout(function(){incrementData(n1, n2, n3)},10);
}