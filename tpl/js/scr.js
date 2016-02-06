$(document).on('af_complete', function(event, res) {
    if (res.success) $('.modal_close').click();
});
function call_modal(init)
{
    init = typeof init !== 'undefined' ? init : 0;
    if (init=1) {
//Code here
        /* �a����� ��a�� ��� �������� � ����������, ��o�� ������� �� ����o���o�� �� �a���� �a� ���a�� ��� ����a� */
        var overlay = $('#overlay'); // �o��o��a, �o���a ���� o��a �a ���a����
        var open_modal = $('.open_modal'); // ��� ������, �o�o��� ����� o�����a�� o��a
        var close = $('.modal_close, #overlay'); // ���, ��o �a����a�� �o�a���o� o��o, �.�. ������� � o������-�o��o��a
        var modal = $('.modal_div'); // ��� ������� �o�a����� o��a

        open_modal.click(function (event) { // �o��� ���� �o ������ � ��a��o� open_modal
            event.preventDefault(); // �����a�� ��a��a���o� �o�������
            modal.hide();
            var text = $(this).attr('data-text'),
                div = $(this).attr('href'); // �o����� ���o�� � ������o�o� � �������o� ������
            overlay.fadeIn(400, //�o�a���a�� o������
                function () { // �o��� o�o��a��� �o�a���a��� o������
                    $(div) // ����� ���o�� � ������o�o� � ���a�� �� ��� jquery o�����
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 200); // ��a��o �o�a���a��
                });
            $('body').css('overflow-y', 'hidden');
            $(div + ' .pagetitle').val(text);

        });

        close.click(function () { // �o��� ���� �o �������� ��� o������
            modal // ��� �o�a����� o��a
                .animate({opacity: 0, top: '45%'}, 200, // ��a��o ������
                function () { // �o��� ��o�o
                    $(this).css('display', 'none');
                    overlay.fadeOut(400); // ������ �o��o���
                    $('body').css('overflow-y', 'auto');
                }
            );
        });
    } else return false;
};

$(document).ready(function(){
    $('.slider').slick({
        centerPadding: '0',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        centerMode: true,
        variableWidth: true
    });
    $('.num-img').slick({
        centerPadding: '0',
        slidesToShow: 1,
        autoplay: false
    });

    call_modal(1);


    // Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight()+15,
// All list items
        menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        }),
        noScrollAction = false;

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        noScrollAction = true;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        },{
            duration: 300,
            complete: function() {
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=" + href +"]").parent().addClass("active");
                setTimeout(function(){ noScrollAction = false; }, 10);
            }
        });
        e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function(){
        if(!noScrollAction){
            // Get container scroll position
            var fromTop = $(this).scrollTop()+topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=#"+id+"]").parent().addClass("active");
            }
        }
    });

});


