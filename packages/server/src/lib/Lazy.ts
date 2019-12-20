export type Lazy<T extends object> = Promise<T | undefined> | T;
