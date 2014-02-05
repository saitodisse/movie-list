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

  test( 'with ane region only, the views are toggled', function() {
    resetLayoutChanger();

    // at first, the REGION is undefined
    var mainRegion = lc.regionManager().first();
    ok( _.isUndefined(mainRegion.currentView), 'mainRegion.currentView -> must not be defined' );

    // when getNextView() the mainRegion exists
    lc.getNextView(0);
    var view1 = mainRegion.currentView;
    ok( view1, 'view1 -> must be defined' );

    // gets a new view again, now has 2 regions
    lc.getNextView(0);
    var view2 = mainRegion.currentView;
    ok( view2, 'view2 -> must be defined' );
    notEqual( view1.cid, view2.cid, 'they must be different => view1.cid, view2.cid' );

    // now, while there is no more regions, back to the first
    lc.getNextView(0);
    var view3 = mainRegion.currentView;
    equal( view1.cid, view3.cid, 'they must be same => view1.cid, view3.cid' );
  });

  test( 'with a new view at region at the right, the layout changes', function() {
    resetLayoutChanger();

    lc.getNextView(0);
    var leftRegion = lc.regionManager().first();
    var view1 = leftRegion.currentView;
    ok( view1, 'view1 -> must be defined' );

    // when getNextView(1) sets a view besides
    lc.getNextView(1);
    var rightRegion = lc.regionManager().last();
    var view2 = rightRegion.currentView;
    ok( view2, 'view2 -> must be defined' );

    notEqual( view1.cid, view2.cid, 'they must be different => view1.cid, view2.cid' );
    
    var allRegions = lc.regionManager().toArray();
    equal(allRegions.length, 2, 'the layout must change');
  });

})();

