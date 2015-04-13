var lemon = require('../src/lemon_all');

describe("Asdf Event on, removeAll tests", function () {
  var target, nSuccess, nLoop, $_, eventTest;

  beforeEach(function() {
    target = document.createElement('div');
    nSuccess = 0;
    nLoop = 100;
    $_ = Asdf;

    eventTest = {
      run: function() {
        $_.Event.on(target, 'customEvent1', eventTest.onEvent);
        $_.Event.on(target, 'customEvent2', eventTest.onEvent);
        $_.Event.on(target, 'customEvent3', eventTest.onEvent);
        $_.Event.on(target, 'customEvent4', eventTest.onEvent);
        $_.Event.on(target, 'customEvent5', eventTest.onEvent);
        $_.Event.on(target, 'customEvent6', eventTest.onEvent);
        $_.Event.removeAll(target);
        $_.Event.on(target, 'customEvent', eventTest.onEvent);
        $_.Event.emit(target, 'customEvent', {txt: '123a'});
      },
      run2: function() {
        $_.Event.on(document.createElement('div'), 'customEvent1', eventTest.onEvent);
        $_.Event.on(target, 'customEvent2', eventTest.onEvent);
        $_.Event.on(document.createElement('div'), 'customEvent3', eventTest.onEvent);
        $_.Event.on(document.createElement('div'), 'customEvent4', eventTest.onEvent);
        $_.Event.on(target, 'customEvent5', eventTest.onEvent);
        $_.Event.on(document.createElement('div'), 'customEvent6', eventTest.onEvent);
        $_.Event.emit(target, 'customEvent2', {txt: 'aaa'});
        $_.Event.removeAll(target);
        $_.Event.emit(target, 'customEvent5', {txt: 'bbb'});
        $_.Event.on(target, 'customEvent', eventTest.onEvent);
        $_.Event.emit(target, 'customEvent', {txt: '123a'});
      },
      onEvent: function(param) {
        //console.log('callback Function '+param.eventName+'('+param.data.txt+')');
        if(param.eventName == 'customEvent') nSuccess++;
      }
    };
  });

  it("is check Asdf", function(){
    expect($_).toBe(Asdf);
    expect(nSuccess).toBe(0);
    expect(nLoop).toBe(100);
  });

  /*
  * eventTest.onEvent 으로 쓰는 것과 무슨 차이가 있을까?
  function onEvent(param) {
    //console.log('callback Function '+param.eventName+'('+param.data.txt+')');
    if(param.eventName == 'customEvent') nSuccess++;
  }*/

  it("Event dispatch Success!!", function() {
    for(var i=0; i<nLoop; i++){
      eventTest.run();
    }

    expect(nLoop).toBe(nSuccess);
  });
});
