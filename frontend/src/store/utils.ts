import { Action, action } from 'easy-peasy'

export interface DataModel<T> {
  loading: boolean
  error: Error | null
  data: T
  initialized: boolean
  setLoading: Action<DataModel<T>, boolean>
  setInitialized: Action<DataModel<T>, boolean>
  setError: Action<DataModel<T>, Error | null>
  setData: Action<DataModel<T>, T>
}

export const dataModel = <T>(initValue: T): DataModel<T> => {
  return {
    loading: false,
    error: null,
    data: initValue,
    initialized: false,
    setInitialized: action((state, initialized) => {
      state.initialized = initialized
    }),
    setLoading: action((state, loading) => {
      state.loading = loading
    }),
    setError: action((state, err) => {
      state.error = err
    }),
    setData: action((state, payload) => {
      state.data = payload
    }),
  } as DataModel<any>
}
