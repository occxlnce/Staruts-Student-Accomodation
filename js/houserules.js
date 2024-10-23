var fss = {
    init: function(options) {
        options = options || {};
        this.options = {
            scrollSections: document.querySelectorAll(options.scrollSections || '.hero-section .full-section'),
            sectionContents: options.sectionContents || '.content-container',
            navCircle: document.querySelector(options.navCircle || '.scroll-navigation .nav-circle')
        }
        this.options.numScrollSections = this.options.scrollSections.length;
        this.navCircleScene;
        this.sectionPinScenes = [];
        this.sectionContentScenes = [];
        this.ctrl = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });
        this.initScrollTo();
        this.initScrollNavCircle();
        this.initScrollSections();
        this.initResize();
    },
    initResize: function() {
        var self = this;
        window.addEventListener('resize', function() {
            self.options.navCircleScene.update(true);
            self.sectionPinScenes.forEach(function(scene) {
                scene.update(true);
            });
            self.sectionContentScenes.forEach(function(scene) {
                scene.update(true);
            });
        });
    },
    initScrollTo: function() {
        var self = this;
        self.ctrl.scrollTo(function(target) {
            TweenMax.to(
                window,
                0.5,
                {
                    scrollTo : {
                        y: target,
                        autoKill: true
                    },
                    ease: Expo.easeInOut
                }
            );
        });
        var scrollToggle = document.querySelectorAll('a[href^="#"]');
        scrollToggle.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var id = link.getAttribute('href');
                if (id.length > 0) {
                    e.preventDefault();
                    self.ctrl.scrollTo(id);
                }
            });
        });
    },
    initScrollNavCircle: function() {
        var self = this;
        self.options.navCircleScene = new ScrollMagic
            .Scene({
                triggerElement: 'body',
                duration: ((self.options.numScrollSections - 1) * 100) + '%'
            })
            .setTween(
                TweenMax
                    .fromTo(
                        self.options.navCircle,
                        1, 
                        { y: 0 },
                        { y: ((self.options.numScrollSections - 1) * 6) + ((self.options.numScrollSections - 1) * 16), ease: Power0.easeNone }
                    )
            )
            .addTo(self.ctrl);
    },
    initScrollSections: function() {
        var self = this;
        self.options.scrollSections.forEach(function(el) {
            var section = el;
            var contents = section.querySelector(self.options.sectionContents);
            var sectionPinScene = new ScrollMagic
                .Scene({
                    triggerElement: section
                })
                .setPin(section)
                .addTo(self.ctrl);
            self.sectionPinScenes.push(sectionPinScene);
            var sectionContentScene = new ScrollMagic
                .Scene({
                    triggerElement: section,
                    duration: '100%'
                })
                .setTween(TweenMax
                    .fromTo(
                        contents,
                        1,
                        { autoAlpha: 1, yPercent: 0 },
                        { autoAlpha: 0, yPercent: -100 }
                    )
                )
                .addTo(self.ctrl);
            self.sectionContentScenes.push(sectionContentScene);
        });
    }
}
var scrollSections = fss.init();
