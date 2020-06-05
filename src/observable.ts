import { EMPTY_OBSERVER, Subscriber, Observer } from './models'
import { Subscription } from './subscription'

export class Observable<T> {

  public operators: Function[] = []

  constructor(private subscriber: Subscriber<T>) {}

  static of<G>(...values: G[]) {
    return new Observable<G>((observer) => {

      try {
        for (const value of values) {
          observer.next(value)
        }
      } catch (e) {
        observer.error(e)
      }

      observer.complete()

      return () => {}
    })
  }

  static from<G>(values: G[]) {

  }

  public subscribe(observer: Observer<T>) {
    const filledObserver = { ...EMPTY_OBSERVER, ...observer }
    return new Subscription(filledObserver, this.subscriber)
  }

  public filter(project: (value: T) => boolean) {
    return new Observable<T>((observer) => {
      const subscription = this.subscribe({
        next: (value: T) => {
          try {
            if (project(value)) observer.next(value)
          } catch (e) {
            observer.error(e)
          }
        },
        error: e => observer.error(e),
        complete: () => observer.complete()
      })

      return () => subscription.unsubscribe()
    })
  }

  public map<G>(project: (v: T) => G) {
    return new Observable<G>(observer => {
      const subscription = this.subscribe({
        next: (value: T) => {
          try {
            const newVal = project(value)
            observer.next(newVal)
          } catch (e) {
            observer.error(e)
          }
        },
        error: e => observer.error(e),
        complete: () => observer.complete()
      })

      return () => subscription.unsubscribe()
    })
  }

  public reduce(project: (previous, current: T) => void, seed) {

  }
}
