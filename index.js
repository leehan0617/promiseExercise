class MyPromise {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  promise1() {
    // es5 이하 방식 단, promise polyfill은 필요
    let number = this.a;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        number += 10;
        // resolve는 then에서 처리할 callback 함수이다.
        // 여기서 사용하지는 않았지만, reject는 catch에서 처리할 callback 함수이다.
        resolve(number);
      }, 1000);
    });
  }

  promise2() {
    // es6 방식
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.b += 20;
        resolve(this.b);
      }, 1000);
    });
  }

  callSinglePromise() {
    // then뒤에 함수가 resolve함수라고 이해하면 될 것 같다.
    this.promise1()
      .then(function(response) {
        console.log("singlePromise");
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // 여러개를 호출할때는 Promise.all로 호출한다.
  // parameter로 받은 promise들이 다 완료된뒤에 실행한다.
  callMultiPromise() {
    Promise.all([this.promise1(), this.promise2()])
      .then(response => {
        console.log("multiPromise");
        console.log(response);
      })
      .catch(error => console.log(error));
  }
}

const promise = new MyPromise(10, 20);
promise.callSinglePromise();
promise.callMultiPromise();
