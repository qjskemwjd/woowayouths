// header
document.querySelector('#header .open').addEventListener('click', function (e) {
    document.querySelector('#sidebar').classList.add('active');
});

document.querySelectorAll('#header .nav .depth1 > li').forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
        document.querySelectorAll('#header .nav .depth1 > li').forEach(function (li) {
            li.classList.remove('hover');
        });
        this.classList.add('hover');
    });

    item.addEventListener('mouseleave', function (e) {
        this.classList.remove('hover');
    });
});

var prevScrollTop = window.pageYOffset || document.documentElement.scrollTop;
window.addEventListener('scroll', function (e) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > document.querySelector('#header').offsetHeight) {
        if (scrollTop > prevScrollTop) {
            document.querySelector('#header').classList.add('hidden');
        } else {
            document.querySelector('#header').classList.remove('hidden');
        }
    } else {
        document.querySelector('#header').classList.remove('hidden');
    }

    prevScrollTop = scrollTop;
});


window.dispatchEvent(new Event('scroll'));


// m sidebar

document.querySelector('#sidebar').addEventListener('click', function (e) {
    this.classList.remove('active');
});


document.querySelector('#sidebar .inner').addEventListener('click', function (e) {
    e.stopPropagation();
});


document.querySelector('#sidebar .close').addEventListener('click', function (e) {
    document.querySelector('#sidebar').classList.remove('active');
});

document.querySelectorAll('#sidebar .nav .depth2').forEach(function (depth2) {
    depth2.style.display = 'none';
    var link = depth2.previousElementSibling;
    if (link) {
        link.classList.add('has');
    }
});

document.querySelectorAll('#sidebar .nav .has').forEach(function (has) {
    has.addEventListener('click', function (e) {
        this.classList.toggle('active');
        var depth2 = this.nextElementSibling;
        if (depth2) {
            depth2.style.display = depth2.style.display === 'none' ? 'block' : 'none';
        }
        e.preventDefault();
        e.stopPropagation();
    });
});

// main peoples

var windowElement = window;

windowElement.addEventListener('scroll', function (e) {
    var triggerTop = windowElement.scrollY + windowElement.innerHeight - (windowElement.innerHeight * 0.2);
    var mainPeoplesElement = document.querySelector('.main-peoples');

    if (triggerTop >= mainPeoplesElement.offsetTop) {
        mainPeoplesElement.classList.add('animated');
    }
});

windowElement.dispatchEvent(new Event('scroll'));

// main doing

var windowElement = window;

windowElement.addEventListener('scroll', function (e) {

    var triggerTop = windowElement.scrollY + windowElement.innerHeight;
    var videoElements = document.querySelectorAll('.main-doing .section .video video');

    videoElements.forEach(function (video) {
        var triggerTarget = windowElement.innerWidth < 1024 ? video : video.closest('.section').querySelector('.heading');

        if (triggerTop >= triggerTarget.offsetTop && !video.autoplay) {

            video.autoplay = true;
            video.play();
        }
    });
});

windowElement.dispatchEvent(new Event('scroll'));

// footer
document.addEventListener('DOMContentLoaded', function () {
    var CURRENT_DEVICE = window.innerWidth >= 1024 ? 'web' : 'mobile';

    function updateDepth2Visibility() {
        var isMobile = CURRENT_DEVICE === 'mobile';

        document.querySelectorAll('#footer .nav .depth2').forEach(function (depth2) {
            depth2.style.display = isMobile ? 'none' : 'block';
            var link = depth2.previousElementSibling;
            if (link) {
                link.classList.toggle('has', isMobile);
            }
        });

        document.querySelectorAll('#footer .nav .has').forEach(function (has) {
            has.classList.remove('active');
        });
    }

    updateDepth2Visibility();

    document.querySelectorAll('#footer .nav .link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var isMobile = CURRENT_DEVICE === 'mobile';
            var depth2 = this.nextElementSibling;

            if (depth2 && isMobile) {
                e.preventDefault();
                depth2.style.display = depth2.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    window.addEventListener('resize', function () {
        var newDevice = window.innerWidth >= 1024 ? 'web' : 'mobile';
        if (CURRENT_DEVICE !== newDevice) {
            CURRENT_DEVICE = newDevice;
            updateDepth2Visibility();
        }
    });
});


document.querySelector('#footer .family .toggle').addEventListener('click', function (e) {
    this.classList.toggle('active');
});
