/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /*
    Test suite to ensure the data required for feed loading is defined and valid
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URLs are defined', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
            })
        });

        it('names are defined', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            })
        });
    });


    /*
    Test suite for menu functionality
     */
    describe('The menu', function () {

        const BODY = document.querySelector('body');
        const MENU = document.querySelector('.menu-icon-link');

        it('is hidden by default', function () {
            expect(BODY.classList).toContain('menu-hidden');
        });

        it('changes visibility on click', function () {
            MENU.click();
            expect(BODY.classList).not.toContain('menu-hidden');
            MENU.click();
            expect(BODY.classList).toContain('menu-hidden');
        });
    });

    /*
    Test suite that ensures that the first feed loaded contains at least one entry
     */
    describe('Initial Entries', function () {

        const FEED = document.querySelector('.feed');
        const FEED_ID = 0;

        /*
        Wait until the feed is loaded before running the test
         */
        beforeEach(function (done) {
            loadFeed(FEED_ID, done);
        });

        it('contain at least one entry', function (done) {
            expect(FEED.children).toBeDefined();
            expect(FEED.children.length).toBeGreaterThanOrEqual(1);
            done();
        })
    });


    /*
    Test suite that ensures that the new feed is loaded and rendered
     */
    describe('New Feed Selection', function () {

        const FEED = document.querySelector('.feed');

        /*
        Randomly select feeds to be compared
         */
        let randIdA = 0;
        let randIdB = 0;

        while (randIdA === randIdB) {
            randIdA = getRandomIntInclusive(0, allFeeds.length - 1);
            randIdB = getRandomIntInclusive(0, allFeeds.length - 1);
        }

        let idA = allFeeds[randIdA].id;
        let idB = allFeeds[randIdB].id;
        let contentA;
        let contentB;

        /*
        Wait until feeds are loaded before running the test
        First entries of each new feed are compared
         */
        beforeEach(function (done) {
            loadFeed(idA, function() {
                contentA = FEED.querySelector('.entry').innerText;
                loadFeed(idB, function () {
                    contentB = FEED.querySelector('.entry').innerText;
                    done();
                })
            });
        });


        it('is loaded and rendered', function (done) {
            expect(contentA).toBeDefined();
            expect(contentB).toBeDefined();
            expect(contentA).not.toBe(contentB);
            done();
        })
    })
}());
