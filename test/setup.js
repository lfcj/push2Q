//sinon = require('sinon');
chai = require('chai');
assert = chai.assert;
expect = chai.expect;
// we don't use should style. Expect style is recommended.
// should = chai.should();

/**
 * use this supplementary function to test your async code
 example of use:
 describe('test', function () {
 it('expect pass test', function (done) {
     functionWithCallback(function(err,data) {
        checkAsync(done,function(){
            expect(data).to.exist;
            })
        })
    })
 * @param done - done callback for the test
 * @param cb - write your checks here
 * @returns {*|number}
 */
checkAsync = function(done, cb){
    return  setTimeout( function () {
        // Called from the event loop, not it()
        // So only the event loop could capture uncaught exceptions from here
        try {
            cb.call(this);
            done();   // success: call done with no parameter to indicate that it() is done()
        } catch( e ) {
            done( e ); // failure: call done with an error Object to indicate that it() failed
        }
    }, 100 );
};

// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
    // We are in node. Require modules.
    isBrowser = false;
} else {
    // We are in the browser. Set up variables like above using served js files.
    // num and sinon already exported globally in the browser.
    isBrowser = true;
}



