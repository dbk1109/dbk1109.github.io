$(function () {
    
    var nowHref = window.location.href;
    // var krtest = nowHref.includes('lang/kr');
    var logoa = $('.logo a');


    // // var nowHost = window.location.hostname;
    
    // if (krtest === 1) {
    //     $('a').on("click",function(e){
    //         e.preventDefault();
    //         alert('test');
    //     });
    // };
    
    
    // language select 'Korean'
//    $('.korean').on('click', function (e) {
//        e.preventDefault();
//        alert('Not now.');
//    });

    // footer append
    $('footer').append('<h1> I look forward to hearing from you.</h1> <a href="mailto:dabin1004i@gmail.com"><i class="fas fa-envelope"></i> Contact</a>');

    // nav controller
    var hnav = $('nav'),
        nav = $('#nav ul li');
    var container = $('#container'),
        cont = $('#container > section'),
        sectionCount = cont.length; // count amount
    var width_size = $(window).width(),
        height_size = $(window).height();
    var ninja = $('.ninja'),
        ninjaI = ninja.children('i');
    var lang = $('.lang'),
        copy = $('.copy'),
        header = $('header');

    function headerclose() {
        ninjaI.removeClass('fa-times').addClass('fa-bars');
        container.removeClass('activecont');
    }

    function navClick(S) {
        nav.click(function (e) {
            e.preventDefault();
            var index = $(this).index();
            var offset = cont.eq(index).offset().top - S;
            
            $('html, body').stop().animate({scrollTop: offset}, 500);
            
            headerclose();
            
            if (width_size <= 740) {
                header.stop().animate({
                    height: '8vh'
                }, 100, function () {
                    header.removeAttr('style').removeClass('active');
                });
            } else {
                header.removeAttr('style').removeClass('active');
            }
        });
    }
    ninja.click(function () {
        if (ninjaI.hasClass('fa-bars')) {
            ninjaI.removeClass('fa-bars').addClass('fa-times');
            container.addClass('activecont');
            header.addClass('active').stop().animate({
                height: '100vh'
            }, 200);
        } else {
            headerclose();
            header.stop().animate({
                height: '8vh'
            }, 100, function () {
                header.removeAttr('style').removeClass('active');
            });
        }
    });
    
    navClick(65);
    
    // click act
    if (width_size <= 960) {
        navClick(150);
    } else {
        navClick(65);
    };

    // nav scroll act
    $(window).scroll(function () {
        var nScroll = $(this).scrollTop();

        for (var i = 0; i < sectionCount; i++) {
            if (nScroll >= cont.eq(i).offset().top - 300) {
                nav.removeClass('current');
                nav.eq(i).addClass('current');
            };
        }
    });

    // nav hover focus
//    hnav.find('li').on({
//        'mouseenter focus': function(){$(this).addClass('current');},
//        'mouseleave blur': function(){$(this).removeClass('current');}
//    });
    hnav.find('a:last-child').on({
        'mouseenter focus': function(){$(this).children('span').addClass('navlcspan');},
        'mouseleave blur': function(){$(this).children('span').removeClass('navlcspan');}
    });
    lang.find('a').children('p').on({
        'mouseenter focus': function () {$(this).addClass('langap'); },
        'mouseleave blur': function () {$(this).removeClass('langap');}
    });

    // about section controller
    var graf = $('.graf');

    graf.each(function () {
        var grafSpan = $(this).find('span').text();
        var perDiv = $(this).find('.per').children('div');
        perDiv.css({
            width: grafSpan
        });
    });
    graf.find('.language').each(function () {
        var langText = $(this).text();
        var langS = langText.substring(0,3);
        if (width_size <= 740) {
            $(this).text(langS);
        }
    });

    // work section controller
    var work = $('#work');
    var workCount = work.find('a').length;

    // if odd
    if (workCount % 2 != 0) {
        work.append($('<a class="a_none"><img src="/img/work/none.png"></a>'));
    };

    //work img focus
    work.find('a').on({
        'mouseenter focus': function () {
            $(this).children('img').addClass('imghover');
            $(this).children('div').addClass('divhover');
        },
        'mouseleave blur': function () {
            $(this).children('img').removeClass('imghover');
            $(this).children('div').removeClass('divhover');
        }
    });
    work.find('.a_none').on({
        'mouseenter focus': function () {$(this).children('img').removeClass('imghover');},
        'mouseleave blur': function () {$(this).children('img').removeClass('imghover');}
    });

    // work_sub page background img controller
    var work_sub = $('.work_sub section');
    var pathSplit = window.location.pathname.split('/');
    var pathName = pathSplit[pathSplit.length - 1] || ''; // amount-1 or empty
    var fileName = pathName.split('.')[0];
    var numberf = Number(fileName);

    function worksubImgSmall() {
        work_sub.eq(0).css({
            background: '#efefef url(/img/work/' + fileName + '.png) 145% center / auto no-repeat'
        });
    }
    function worksubImg() {
        work_sub.eq(0).css({
            background: '#efefef url(/img/work/' + fileName + '.png) 110% center / 47.5vw no-repeat'
        });
    }
    function worksubCover() {
        work_sub.eq(0).css({
            background: '#efefef url(/img/work/' + fileName + '.png) center / cover no-repeat'
        });
    }
    if (width_size > 960 && width_size <= 1280) {
        worksubImgSmall();
    } else if (width_size <= 960) {
        worksubCover()
    } else {
        worksubImg();
    }
    var btn_prev = $('.prev');
    var btn_next = $('.next');

    btn_prev.click(function (e) {
        e.preventDefault();
        let linkto = (nowHref.includes("kr")) ? '/work/kr/' : '/work/';
        location.href = linkto + (numberf - 1) + '.html';
        
    });
    btn_next.click(function (e) {
        e.preventDefault();
        let linkto = (nowHref.includes("kr")) ? '/work/kr/' : '/work/';
        location.href = linkto + (numberf + 1) + '.html';
        // location.href = '/work/' + (numberf + 1) + '.html';
    });
    if (numberf - 1 == 0) {
        btn_prev.hide();
    } else if (numberf == 3 /* here */) {
        btn_next.hide();
    }

    // work_sub page _1 insert
    work_sub.eq(1).append('<img src="/img/work/' + fileName + '_1.png" alt="device virtual image">');

    // work_sub page _2 _3 insert
    work_sub.eq(2).children('div.fir').prepend('<h3>Main page</h3><img src="/img/work/' + fileName + '_2.png" alt="main site virtual image">');
    work_sub.eq(2).children('div.sec').prepend('<h3>Sub page</h3><img src="/img/work/' + fileName + '_3.png" alt="sub site virtual image">');

    // work_sub page _4 insert
    var page4h2 = work_sub.eq(3).find('h2').text();
    work_sub.eq(3).append('<div><img src="/img/work/' + fileName + '_4.png" alt="' + page4h2 + ' virtual image"></div>');

    // work_sub page _5 insert
    var page5h2 = work_sub.eq(4).find('h2').text();
    work_sub.eq(4).prepend('<div><img src="/img/work/' + fileName + '_5.png" alt="' + page5h2 + ' virtual image"></div>');

    if (work_sub.hasClass('other')) {
        work_sub.eq(2).prepend('<h3>Main page</h3><img src="/img/work/' + fileName + '_1.png" alt="main site virtual image">');
        work_sub.eq(2).prepend('<h3>Sub page</h3><img src="/img/work/' + fileName + '_1.png" alt="sub site virtual image">');
    }


    // resizing event
    $(window).resize(function () {
        var width_size = $(window).width();

        navClick(65);

        if (width_size > 960 && width_size <= 1280) {
            worksubImgSmall();
        } else if (width_size <= 960) {
            worksubCover()
            navClick(150);
            graf.find('.language').each(function () {
                var langText = $(this).text();
                var langS = langText.substring(0,3);
                if (width_size <= 740) {
                    $(this).text(langS);
                }
            });
        } else {
            worksubImg();
        }
    });
});
