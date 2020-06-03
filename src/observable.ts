import { EMPTY_OBSERVER, Subscriber, Observer } from './models'
import { Subscription } from './subscription'

export class Observable<T> {
  constructor(private subscriber: Subscriber<T>) {}

  public subscribe(observer: Observer<T>) {
    const filledObserver = { ...EMPTY_OBSERVER, ...observer }
    return new Subscription(filledObserver, this.subscriber)
  }

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
}
