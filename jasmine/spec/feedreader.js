/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds.length).toBeGreaterThan(0);
        });

    function testEachFeedInallFeeds(inputParameter) {
        it('and have a URL and name defined that is not empty', function() {
            inputParameter.forEach(function(val, ind, arr) {

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
                expect(val.url.length).toBeGreaterThan(0);

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
                expect(val.name.length).toBeGreaterThan(0);
            });
        });
    }

        // Loop to verify each feed in allFeeds
        for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
            testEachFeedInallFeeds(allFeeds);
        }

    });

    describe('The menu', function() {

        /* Test Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('element displays when clicked and hides when clicked again', function() {
            $(".menu-icon-link").trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $(".menu-icon-link").trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    });
    describe('Initial Entries', function() {

        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it("should be more than 0 when feed is loaded", function() {
            var entries = $(".feed").find(".entry").length;
            expect(entries).not.toBe(0);
        });
    });

        /* Test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function() {
        var article,
            nextFeedArticle;

        it("should change content when new feed is loaded", function() {

            beforeEach(function(done) {
                loadFeed(0, function() {
                    // your code to read initial values here
                    article = $(".feed").find(".entry h2")[0].innerText;

                    loadFeed(1, function() {
                        // your code to read new feed values here
                        nextFeedArticle = $(".feed").find(".entry h2")[0].innerText;


                        done();
                    });
                });
            });

            expect(article == nextFeedArticle).toBe(true);

        });
    });

}());