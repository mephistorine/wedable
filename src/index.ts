import { Observable } from './observable'

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
