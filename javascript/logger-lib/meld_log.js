// https://github.com/cujojs/meld
var meld=function(){function a(a,b,g){var h,i;return arguments.length<3?c(a,b):(s(b)?i=e(a,b,g):(h=typeof b,"string"===h?"function"==typeof a[b]&&(i=d(a,b,g)):i="function"===h?e(a,b(a),g):f(a,b,g)),i)}function b(a,b){var c,d,e;this.target=a,this.func=b,this.aspects={},c=this.orig=a[b],d=this,e=this.advised=function(){function l(b){var c=h(b);return d._callSimpleAdvice("on",a,b),c}function m(b,c){d._callSimpleAdvice(b,a,c)}var a,f,g,h,i;this instanceof e?(a=u(c.prototype),h=function(b){return k(c,a,b)}):(a=this,h=function(b){return c.apply(a,b)}),g=r.call(arguments),i="afterReturning",f=y({target:a,method:b,args:g});try{d._callSimpleAdvice("before",a,g);try{f.result=d._callAroundAdvice(a,b,g,l)}catch(j){f.result=f.exception=j,i="afterThrowing"}if(g=[f.result],m(i,g),m("after",g),f.exception)throw f.exception;return f.result}finally{z()}},t(e,"_advisor",{value:d,configurable:!0})}function c(a,b){var c,e;return c=a.name||"_",e={},e[c]=a,d(e,c,b),e[c]}function d(a,c,d){var e=b.get(a,c);return e&&e.add(d)}function e(a,b,c){var e,f,h,i;for(e=[],i=0;h=b[i++];)f=d(a,h,c),f&&e.push(f);return g(e)}function f(a,b,c){var e=[];for(var f in a)"function"==typeof a[f]&&b.test(f)&&e.push(d(a,f,c));return g(e)}function g(a){return{remove:function(){for(var b=a.length-1;b>=0;--b)a[b].remove()}}}function h(b){return function(c,d,e){var f={};return 2===arguments.length?(f[b]=d,a(c,f)):(f[b]=e,a(c,d,f))}}function i(a,b){var c,d,e;for(c in q)d=b[c],d&&(e=a[c],e||(a[c]=e=[]),e.push({aspect:b,advice:d}))}function j(a,b){var c,d,e;e=0;for(c in q)if(d=a[c]){e+=d.length;for(var f=d.length-1;f>=0;--f)if(d[f].aspect===b){d.splice(f,1),--e;break}}return e}function k(a,b,c){try{t(b,"constructor",{value:a,enumerable:!1})}catch(d){}return a.apply(b,c),b}function v(a,b){for(var c=0,d=a.length;d>c;c++)b(a[c])}function w(a,b){for(var c=a.length-1;c>=0;--c)b(a[c])}function x(){return l}function y(a){return m.push(l),l=a}function z(){return l=m.pop()}function A(){try{return"x"in Object.defineProperty({},"x",{})}catch(a){}}a.before=h("before"),a.around=h("around"),a.on=h("on"),a.afterReturning=h("afterReturning"),a.afterThrowing=h("afterThrowing"),a.after=h("after"),a.joinpoint=x,a.add=function(){return a.apply(null,arguments)},b.prototype={_callSimpleAdvice:function(a,b,c){var d,e;e=this.aspects[a],e&&(d=q[a],d(this.aspects[a],function(a){var d=a.advice;d&&d.apply(b,c)}))},_callAroundAdvice:function(a,b,c,d){function g(a,b){return 0>a?d(b):h(f[a].advice,a,b)}function h(c,d,e){function i(){return f}function j(){return l(arguments.length>0?r.call(arguments):e)}function k(a){return l(a||e)}function l(a){return f++,g(d-1,a)}var f,h;f=0,h=y({target:a,method:b,args:e,proceed:j,proceedApply:k,proceedCount:i});try{return c.call(a,h)}finally{z()}}var e,f;return f=this.aspects.around,e=f?f.length:0,g(e-1,c)},add:function(a){var b,c;return b=this,c=b.aspects,i(c,a),{remove:function(){var d=j(c,a);d||b.remove()}}},remove:function(){delete this.advised._advisor,this.target[this.func]=this.orig}},b.get=function(a,c){if(c in a){var d,e;if(e=a[c],"function"!=typeof e)throw new Error("Advice can only be applied to functions: "+c);return d=e._advisor,d||(d=new b(a,c),a[c]=d.advised),d}};var l,m,n,o,p,q,r,s,t,u;return m=[],n=Array.prototype,o=n.unshift,p=n.push,r=n.slice,s=Array.isArray||function(a){return"[object Array]"==Object.prototype.toString.call(a)},t=A()?Object.defineProperty:function(a,b,c){a[b]=c.value},u=Object.create||function(){function a(){}return function(b){a.prototype=b;var c=new a;return a.prototype=null,c}}(),q={before:w,around:!1},q.on=q.afterReturning=q.afterThrowing=q.after=v,a}(),
    trace=function(){function e(a){return a>c.length&&(c+=c),c.slice(0,a-1)}var a,b,c,d;return a=meld.joinpoint,b=0,c="................................",d={onCall:function(a){console.log(e(++b)+a.method+" CALL ",a.args)},onReturn:function(a){console.log(e(b--)+a.method+" RETURN ",a.result)},onThrow:function(a){console.log(e(b--)+a.method+" THROW "+a.exception)}},function(b){return b||(b=d),{before:function(){var c=a();b.onCall&&b.onCall({method:c.method,target:c.target,args:c.args.slice()})},afterReturning:function(c){var d=a();b.onReturn&&b.onReturn({method:d.method,target:d.target,result:c})},afterThrowing:function(c){var d=a();b.onThrow&&b.onThrow({method:d.method,target:d.target,exception:c})}}}}();

window.__LOG = function __LOG(message, thisObj, args, colorIndex){
  /* __LOG shows a console.debug with colors.
   *   creates a group and puts arguments and this
  
    usage:  
  __LOG('method()', this, arguments, 1);
  
  /**
   * @param  {[string]}     message      [message to show]
   * @param  {[object]}     thisObj      [this object, holds the context]
   * @param  {[arguments]}  args         [arguments]
   * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
   */
  var groupName
    , groupColor

      , rpad = function (str, padString, length) {
              while (str.length < length) {
                  str = str + padString;
              }
              return str;
          }

      , truncate = function (str, length, truncateStr) {
              if (str === null) {
                  return '';
              }
              str = String(str);
              truncateStr = truncateStr || '...';
              length = ~~length;
              return str.length > length ? str.slice(0, length) + truncateStr : str;
          }

      , getName = function (options) {
              var nameParts
                  , name = ''
                  , method = ''
              ;

              if (options.name) {
                  nameParts = options.name.split('.');
              }
              else {
                  return '';
              }
              
              // get the first part
              name = nameParts.shift();
              name = truncate(name, (options.nameSize - 2), '..');

              if (nameParts.length > 0) {
                  var fullMethodName = nameParts.join('.');
                  fullMethodName = getDetailsByMethodName(fullMethodName);
                  method = truncate(fullMethodName, (options.methodSize - 2), '..');

                  var hasId = _.isObject(thisObj) && _.has(thisObj, 'id');
                  if (hasId) {
                      name = name + '[' + thisObj.id + ']';
                  }

                  name   = rpad(name,   ' ', options.nameSize);
                  method = rpad(method, ' ', options.methodSize);
              }
              else {
                  throw new Error('getName :: cant find "." to split method');
              }

              return name + method;
          }

      , getDetailsByMethodName = function (name) {
              var haveOnOff = name.search(/\b(on|off)\b/) >= 0;
              var haveEmit = name.search(/\bemit\b/) >= 0;
              var haveTrigger = name.search(/\btrigger\b/) >= 0;

              var canGetDetail = (haveOnOff || haveEmit || haveTrigger);

              if (typeof args === 'object' && canGetDetail) {
                  if (args.length >= 4 &&
                      typeof args[0] === 'string' &&
                      typeof args[1] === 'undefined' &&
                      typeof args[3] === 'string') {
                      return name + ' [' + args[0] + '] => ' + args[3];
                  }
                  if (args.length >= 4 &&
                      typeof args[0] === 'string' &&
                      typeof args[1] === 'string' &&
                      typeof args[3] === 'string') {
                      return name + ' [' + args[1] + ': ' + args[0] + '] => ' + args[3];
                  }
                  if (args.length > 0 && typeof args[0] === 'string') {
                      return name + ' [' + args[0] + ']';
                  }
              }

              return name;
          }

      , colors = {
          1: {  backgroundColor: '#DCECEF'
               , foregroundColor: '#600'
          },

          11: {  backgroundColor: '#DCECEF'
               , foregroundColor: '#330'
          },

          12: {  backgroundColor: '#DCECEF'
               , foregroundColor: '#033'
          },

          2: {  backgroundColor: '#DCECEF'
              , foregroundColor: '#426D09'
          },

          3: {  backgroundColor: '#FFFFD7'
              , foregroundColor: '#21460F'
          },

          4: {  backgroundColor: '#FFFDF7'
              , foregroundColor: '#6700B9'
          },
          
          5: {  backgroundColor: '#eee'
              , foregroundColor: '#284'
          },
          
          6: {  backgroundColor: '#FFFDF7'
              , foregroundColor: '#7653C1'
          },
          
          99: {  backgroundColor: '#222'
              , foregroundColor: '#FBB'
          }
      }

      , logGroup = function ()
          {
              console.groupCollapsed(groupName, groupColor);
              console.dir(thisObj);
              console.dir(args);
              console.groupEnd();
          }
  ;

  var ignores = message.search(/\bgetWildcardCallbacks\b/) >= 0;
  if (ignores) {
      return;
  }

  groupName = '%c' + getName({
      name      : message,
      nameSize  : 20,
      methodSize: 90
  });

  groupColor =  ' background  : ' +
                colors[colorIndex].backgroundColor +
                ';color       : ' +
                colors[colorIndex].foregroundColor;

  logGroup();

  // show -------pause----------
  clearTimeout(__LOG.globalTimeoutLogId);
  __LOG.globalTimeoutLogId = setTimeout(function () {
      // if is not canceled, shows line bellow
      console.debug('----------------------------------pause--------------------------');
  }, 100);
};


window.__MELD_LOG = function(appName, app, colorIndex){
  /* log all executed functions from an instance
  
    usage:  
    __MELD_LOG('MyApp.MyFunction', myFunction, 2);
  
  /**
   * @param  {[string]}     appName      [Namespace.Function]
   * @param  {[object]}     app          [intance of Namespace.Function]
   * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
   */
  var pointcut = /./;
  var myReporter = {
    onCall: function(info) {
      __LOG(appName + '.' + info.method, info.target, info.args, colorIndex);
    }
  // , onReturn: function(info) {
  //     __LOG('< ' + appName + '.< ' + info.method, info.target, info.args, colorIndex);
  //   }
  , onThrow: function(info) {
    //console.log('X ERROR X ', info);
    __LOG(appName + '.' + info.method, info.exception, undefined, 99);
    }
  };
  // Around advice wraps the intercepted method in layers
  meld(app, pointcut, trace(myReporter));
};

// window.__MELD_LOG_Contructor = function(appName, App, colorIndex){
//   var advices = {
//       before: function() {
//           console.log("Called with: " + Array.prototype.join.call(arguments));
//       },
//       afterReturning: function(returnValue) {
//           console.log("Returned: " + returnValue);
//       },
//       afterThrowing: function(thrownException) {
//           console.error("Exception: " + thrownException);
//       }
//   };

//   return meld(App, advices);

// };
