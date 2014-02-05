/*global App, test, equal, notEqual, ok */
'use strict';

(function() {
  
  __MELD_LOG('LayoutChanger', App.Base.Helpers.LayoutChanger.prototype, 10);

  var lc = window.lc = new App.Base.Helpers.LayoutChanger();
  
  function resetLayoutChanger() {
    lc.initialize();

    lc.addLayout(new App.Base.Views.Layouts.OneColumn());
    lc.addLayout(new App.Base.Views.Layouts.TwoColumns());

    lc.addView(new App.Base.Views.About());
    lc.addView(new App.Base.Views.IMovies());
  }

  resetLayoutChanger();

  test( 'LayoutChanger check list size', function() {
    equal( lc.layouts.list.length, 2, 'lc.layouts.list === 2' );
    equal( lc.views.list.length, 2, 'lc.layouts.list === 2' );
  });

  test( 'when get next layout, they must be different', function() {
    var layout1 = lc.getNextLayout();
    var layout2 = lc.getNextLayout();
    notEqual( layout1.cid, layout2.cid, 'must be differents' );
  });

  test( 'when get next view, they must be different', function() {
    var view1 = lc.getNextView(0);
    var view2 = lc.getNextView(0);
    notEqual( view1.cid, view2.cid, 'must be differents' );
  });

  test( 'next view receive an index for the region on layout', function() {
    resetLayoutChanger();

    // at first, the REGION is undefined
    var mainRegion = lc.getCurrentLayout().regionManager.first();
    ok( _.isUndefined(mainRegion.currentView), 'mainRegion.currentView -> must not be defined' );

    // when getNextView() the mainRegion exists
    lc.getNextView(0);
    mainRegion = lc.getCurrentLayout().regionManager.first();
    ok( mainRegion.currentView, 'mainRegion.currentView -> must be defined' );
  });

})();

