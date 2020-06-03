type UnsubscribeFunction = () => void
type ObservableCreator<T> = (observer: Observer<T>) => UnsubscribeFunction

export interface Observer<T> {
  next(value?: T): void
  error?(error?: any): void
  complete?(): void
}

export class Observable<T> {
  constructor(private creator: ObservableCreator<T>) {}

  public subscribe(observer?: Observer<T>) {
    
  }
}