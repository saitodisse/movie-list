/*global App, test, equal, notEqual, ok */
'use strict';

(function() {
  
  // __MELD_LOG('LayoutChanger', App.Base.Helpers.LayoutChanger.prototype, 10);

  var lc = window.lc = new App.Base.Helpers.LayoutChanger();
  
  function resetLayoutChanger() {
    lc.initialize();

    lc.addLayout(new App.Base.Views.Layouts.OneColumn());
    lc.addLayout(new App.Base.Views.Layouts.TwoColumns());

    lc.addView(App.Base.Views.About);
    lc.addView(App.Base.Views.IMovies);
    lc.addView(null); // this will force a layout change
  }

  resetLayoutChanger();

  /********
   * 001
   ********/
  test( 'LayoutChanger check list size', function() {
    equal( lc.layouts.list.length, 2, 'lc.layouts.list === 2' );
    equal( lc.views.list.length, 3, 'lc.layouts.list === 3' );
  });

  /********
   * 002
   ********/
  test( 'when get next layout, they must be different', function() {
    var layout1 = lc.getNextLayout();
    var layout2 = lc.getNextLayout();
    notEqual( layout1.cid, layout2.cid, 'must be differents' );
  });

  /********
   * 003
   ********/
  test( 'when get next view, they must be different', function() {
    resetLayoutChanger();

    var view1 = lc.getNextLeftView();
    var view2 = lc.getNextLeftView();
    notEqual( view1.cid, view2.cid, 'must be differents' );
  });

  /********
   * 004
   ********/
  test( 'one region only, the views are toggled at left', function() {
    resetLayoutChanger();

    // at first, the REGION is undefined
    var mainRegion = lc.regionManagerArray()[0];

    //1
    ok( _.isUndefined(mainRegion.currentView), 'mainRegion.currentView -> must not be defined' );

    // when getNextView() the mainRegion exists
    var view1 = lc.getNextLeftView();

    //2
    ok( view1, 'view1 -> must be defined' );

    // gets a new view again, now has 2 regions
    var view2 = lc.getNextLeftView();

    //3
    ok( view2, 'view2 -> must be defined' );

    //4
    notEqual( view1.cid, view2.cid, 'they must be different => view1.cid, view2.cid' );

    // null view
    var view3 = lc.getNextLeftView();

    //5
    ok( _.isNull(view3), 'view3 is null' );

    // now back to the first
    var view4 = lc.getNextLeftView();

    //5
    ok( view4, 'view4 is NOT null' );
  });

  /********
   * 005
   ********/
  test( 'one region only, the views are toggled at right', function() {
    resetLayoutChanger();

    // at first, the REGION is undefined
    var mainRegion = lc.regionManagerArray()[0];

    //1
    ok( _.isUndefined(mainRegion.currentView), 'mainRegion.currentView -> must not be defined' );

    // when getNextView() the mainRegion exists
    var view1 = lc.getNextRightView();

    //2
    ok( view1, 'view1 -> must be defined' );

    // gets a new view again, now has 2 regions
    var view2 = lc.getNextRightView();

    //3
    ok( view2, 'view2 -> must be defined' );

    //4
    notEqual( view1.cid, view2.cid, 'they must be different => view1.cid, view2.cid' );

    // now, while there is no more regions, back to the first
    var view3 = lc.getNextRightView();

    //5
    ok( _.isNull(view3), 'view3 is null' );
  });

  /********
   * 006
   ********/
  test( 'a new view at region at the right, the layout changes', function() {
    resetLayoutChanger();

    // MAIN
    var view1 = lc.getNextLeftView();

    //1
    ok( view1, 'view1 -> must be defined' );

    //2
    equal(lc.regionManagerArray().length, 1, 'the layout has one region');

    // when getNextRightView() sets a view besides
    // sets layout to two columns
    // the previous view is transfered to the left pane
    var view2 = lc.getNextRightView();

    //3
    ok( view2, 'view2 -> must be defined' );

    //4
    equal(lc.regionManagerArray().length, 2, 'the layout has two region');

    // LEFT
    view1 = lc.getNextLeftView();;

    //5
    ok( view1, 'view1 -> must be defined' );
    
    // RIGHT
    //6
    notEqual( view1.cid, view2.cid, 'they must be different => view1.cid, view2.cid' );

    // when getNextRightView() called again, while there is no more views
    // changes layout back to one column
    view2 = lc.getNextRightView();
    view2 = lc.getNextRightView();
    var totalRegionsCount = lc.regionManagerArray().length;

    //7
    equal(totalRegionsCount, 1, 'the layout must be "one column"');

  });

})();

