'use strict';
jest.disableAutomock()
jest.mock('fetch-on-rest')
var api = require('../api.js');
var React = require('react');
var ReactDOM = require('react-dom');
var Watchlist = require('../watchlist.jsx');
var TestUtils = require('react-addons-test-utils');

var SCREEN = {
  ratios: [[
    "Current price",
    "CMP",
    "Rs."
  ]],
  results: [
    ['/foo/', 'Foo', 115]
  ]
};

describe('watchlist Tests', function() {
  var watchlist

  beforeEach(function() {
    var params = {
      search: '',
      query: {},
      pathname: '/watchlist/'
    };
    window.loggedIn = true;
    api.setResponse('/api/users/watchlist/',
      JSON.stringify(SCREEN));
    watchlist = TestUtils.renderIntoDocument(
      <Watchlist location={params}/>
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should load watchlist', function() {
    var dom = ReactDOM.findDOMNode(watchlist);
    expect(dom.textContent).toEqual('Loading...');
    return watchlist._req.then(() => {
      expect(watchlist.state.screen).toEqual(SCREEN);
      var table = TestUtils.findRenderedDOMComponentWithTag(
        watchlist, 'table');
      expect(table).toBeDefined();
    });
  });
});
