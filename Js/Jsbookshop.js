/**
 * Created by Administrator on 2017/6/1.
 */
$(function(){
    //var Globaldata = {};
    var Books = {};
    Books.Science = {};
    Books.Science.native =[
        { 'Src':'Image/Science/Science_0.jpg',
            'name':'地理与生活',
            'price':'20'},
        { 'Src':'Image/Science/Science_1.jpg',
            'name':'极简宇宙史',
            'price':'16'},
        { 'Src':'Image/Science/Science_2.jpg',
            'name':'哥德尔',
            'price':'24'},
        { 'Src':'Image/Science/Science_3.jpg',
            'name':'人类简史',
            'price':'18'},
        { 'Src':'Image/Science/Science_4.jpg',
            'name':'杂草集',
            'price':'26'},
        { 'Src':'Image/Science/Science_5.jpg',
            'name':'时间简史',
            'price':'30'},
        { 'Src':'Image/Science/Science_6.jpg',
            'name':'量子物理史',
            'price':'20'},
        { 'Src':'Image/Science/Science_7.jpg',
            'name':'生命的跃升',
            'price':'10'},
        { 'Src':'Image/Science/Science_8.jpg',
            'name':'万物创世',
            'price':'21'},
        { 'Src':'Image/Science/Science_9.jpg',
            'name':'地图手绘',
            'price':'23'}
    ];
    Books.Technology = {};
    Books.Technology.Network=[
        {
            'Src':'Image/Network/Network_0.jpg',
            'name':'失控',
            'price':'20'
        },
        {
            'Src':'Image/Network/Network_1.jpg',
            'name':'浪潮之巅',
            'price':'23'
        },
        {
            'Src':'Image/Network/Network_2.jpg',
            'name':'智能时代',
            'price':'34'
        },
        {
            'Src':'Image/Network/Network_3.jpg',
            'name':'黑客与画家',
            'price':'13'
        },
        {
            'Src':'Image/Network/Network_4.jpg',
            'name':'创业维艰',
            'price':'20'
        },
        {
            'Src':'Image/Network/Network_5.jpg',
            'name':'必然',
            'price':'18'
        },
        {
            'Src':'Image/Network/Network_6.jpg',
            'name':'运营之光',
            'price':'27'
        }
    ];
    Books.Technology.Computer = [
        {
            'Src': 'Image/Computer/Computer_0.jpg',
            'name': '计算机：计算机',
            'price': '8'
        },
        {
            'Src': 'Image/Computer/Computer_1.jpg',
            'name': '微型计算机',
            'price': '18'
        },
        {
            'Src': 'Image/Computer/Computer_2.jpg',
            'name': '计算机应用文摘',
            'price': '10'
        },
        {
            'Src': 'Image/Computer/Computer_3.jpg',
            'name': '计算机系统应用',
            'price': '15'
        },
        {
            'Src': 'Image/Computer/Computer_4.jpg',
            'name': '计算机世界',
            'price': '3'
        },
        {
            'Src': 'Image/Computer/Computer_5.jpg',
            'name': '中国计算机协会',
            'price': '8'
        }
    ];
    Books.addImage = function (BType) {
       // console.log(BType);
        var len = BType.length,
            i;
        var booklist = $('.booklist');
        //var frag = document.createDocumentFragment();
        for (i = 0; i < len; i++) {
            var frag = document.createDocumentFragment();
            var sci = BType[i];
            var li = document.createElement('li');
            frag.appendChild(li);
            // booklist.append(frag);
            var img = document.createElement('img');
            img.src = sci.Src;
            img.style.width = '12em';
            img.style.height = '15em';
            //console.log(sci.Src);
            li.append(img);
            var br = document.createElement('br');
            li.append(br);
            //console.log(img);
            var label_1 = document.createElement('label');
            label_1.innerText = sci.name;
            li.append(label_1);
            var br = document.createElement('br');
            li.append(br);
            //label_1.append(br);
            //li.append(label_1);
            var label_2 = document.createElement('label');
            label_2.innerText = 'Price:$' + sci.price;
            //li.append(label_2);
            li.append(label_2);

            booklist.append($(frag));
        }
    };
    Books.loadImage = function(BookType){
        if(BookType instanceof Array)
        {
            Books.addImage(BookType);
        }else if(BookType instanceof Object){
            for(var type in BookType)
            {
                Books.addImage(BookType[type]);
                //console.log(type);
            }
        }else{
            return false;
        }
    };

    Books.loadImage(Books.Science);
    //Books.loadImage(Books['Technology']);
    (function(Books) {
       $('.TypeTree').jstree({
           "plugins": ['html_data', "contextmenu", "changed"]
       });

       $('.TypeTree').bind('open_node.jstree', function (e, data) {
           var node = data.node.id;
           $('.TypeTree').jstree(true).set_icon(node, 'Image/minus.png');
       });

       $('.TypeTree').bind('close_node.jstree', function (e, data) {
           var node = data.node.id;
           $('.TypeTree').jstree(true).set_icon(node, 'Image/plus.png');
       });

        $('.TypeTree')
            // listen for event
            .on('changed.jstree', function (e, data) {
                var i, j, r = [];
                var p = $('.TypeTree').jstree(true).get_parent(data.node.id);
                //console.log(p);
                for (i = 0, j = data.selected.length; i < j; i++) {
                    r.push(data.instance.get_node(data.selected[i]).text);
                }
                // console.log(r.join(','));
                var currentType = r.join(',');
                var parenttype = ( p === '#') ? '' : p;

                if (parenttype === '') {
                    $('#parentType').html(currentType);
                    $('#currentType').html('');
                } else {
                    $('#parentType').html(parenttype);
                    $('#currentType').html(currentType);
                }

                var child = $('#currentType').text().trim();
                var parent = $('#parentType').text().trim();
                if (!(child === '')) {
                    $('.booklist li').remove();
                     Books.loadImage(Books[parent][child]);
                }else{
                    $('.booklist li').remove();

                    Books.loadImage(Books[parent]);
                }
            }).jstree();
   }(Books));

    var divCart = document.getElementById('bookCart');
    var leftLine = divCart.offsetLeft;
    var rightline = leftLine + divCart.clientWidth;
    var Abooksname = [];
    //console.log(divbooks);
    //console.log(divbooks.clientWidth);
    //console.log(boderLine);
$('.booklist').bind('mousedown',function(e){
    var node = e.target.parentNode;
    var childs = node.childNodes;

    //var liheight = $(node).height();
    //console.log('node');
    //console.log(e.pageX);
    $('body').bind('mousemove',function(e){
        var bookname = $(childs[2]).text().trim();
        //console.log(node);
        console.log(bookname);
        var len = Abooksname.length;

        //console.log(node);
        var mouse_x = e.pageX;
        //console.log(mouse_x);
        //console.log(boderLine);
        if(mouse_x>leftLine && mouse_x<rightline) {
            for(var i=0;i<len;i++) {
                if (bookname === Abooksname[i]) {
                    $(this).unbind('mousemove');
                    return;
                }
            }
            var frag = document.createDocumentFragment();
            var Number = document.createElement('input');
            $(Number).attr('min', '0');
            $(Number).attr('autofocus', 'autofocus');
            var nbsp = document.createElement('span');
            nbsp.innerHTML = '&nbsp';
            Number.type = 'number';
            var divElenmet = $(node).clone();

            //divElenmet[0].style.width = '8em';
            $(frag).append(divElenmet);
            divElenmet.append(nbsp);
            divElenmet.append(Number);


            //console.log(liheight);
            var childnodes = divElenmet[0].childNodes;

            childnodes[0].style.width = 'auto';
            childnodes[0].style.height = '8em';
            //console.log(childnodes[5]);
            //childnodes[5].style.with = '20px';
            //childnodes[0].s
            //console.log(frag);

            $('.booksToCart').append($(frag));
            var autoHeight = $('.cart').height() + 576;
            console.log(autoHeight);
            $('.cart').css('height', autoHeight + 'px');
            $('.bookCart').css('height', 'auto');
            //$('.booksToCart').css('height','auto');
            $(this).unbind('mousemove');
            Abooksname.push(bookname);

            console.log(Abooksname);
        }




    });
});
    $('body').bind('mouseup',function(e){
        $(this).unbind('mousemove');
    });

    var last_time = {};
    $('.booksToCart').bind('change',function(e){
        var nnode = e.target;
        //console.log(nnode);
        var nparent = e.target.parentNode;
        var chids = nparent.childNodes;

        var price = parseInt($(chids[4]).text().trim().substring(7));
        var bookname = $(chids[2]).text().trim();

        //console.log(chids);
        //console.log($(chids[2]).text().trim());
        // nparent
        var num = parseInt(nnode.value),
            addnum;

        if(last_time[bookname])
        {
            addnum = num-last_time[bookname];
        }else{
            addnum = num;
        }
        last_time[bookname] = num;
        var adddollar = addnum * price;
        //console.log(adddollar);
        console.log(adddollar);

        var totalprice = $('#totalPrice').text().trim();
        if(totalprice === '')
        {
            totalprice = 0;
        }else{
            totalprice = parseInt(totalprice);
        }
        totalprice = totalprice+adddollar;
        $('#totalPrice').html(totalprice);

    });




});