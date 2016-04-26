/* feedreader.js
 * Spec file that Jasmine will read and contains
 * tests that will be run against application.
 */

/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in the application.
     */
    describe('RSS Feeds', function() {
        it('are defined and no empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        function testEachFeedInallFeeds(feed) {
            it('and each feed has a URL defined and the URL is not empty', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });


            it('and each feed has a name defined and the name is not empty', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        }

        for (var feed = 0, len = allFeeds.length; feed < len; feed++) {
            console.log('allFeeds[feed]', allFeeds[feed]);
            testEachFeedInallFeeds(allFeeds[feed]);
        }
    });

    describe('The menu', function() {
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('element displays when clicked and hides when clicked again', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should be more than 0 when feed is loaded', function() {
            var entries = $('.feed .entry').length;
            expect(entries).not.toBe(0);
        });
    });

    /* Test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {
        var firstFeed;
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').find('.entry h2').html();
                done();
            });
        });

        it('should change content when new feed is loaded', function(done) {
            loadFeed(2, function() {
                expect($('.feed').find('.entry h2').html()).not.toEqual(firstFeed);
                done();
            });
        });
    });

}());