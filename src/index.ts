import { Observable } from './observable'
/*

const hello = new Observable((observer) => {

  observer.next('hello')
  observer.complete()
  observer.next('world!')

  return () => {

  }

})

const sub = hello.subscribe({
  next: value => console.log(value)
})
*/


function interval(intervalInMs: number) {
  return new Observable<number>((observer) => {
    let intervalCounter = 0

    const intervalId = setInterval(() => {
      observer.next(intervalCounter)
      intervalCounter++
    }, intervalInMs)

    return () => clearInterval(intervalId)
  })
}

const test$ = interval(1000).map(v => v * 2)

const subscription = test$.subscribe({
  next: value => console.log(value)
})

// setTimeout(() => subscription.unsubscribe(), 2000)
