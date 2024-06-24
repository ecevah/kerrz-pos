import { createAction, props } from "@ngrx/store";

export const increment = createAction("[increment]");
export const decrement = createAction("[decrement]");
export const reset = createAction("[reset]");
export const handleLocation = createAction(
  "[Location] Handle Location",
  props<{ latitude: number; longitude: number }>()
);

export const loadStoresSuccess = createAction(
  "[Store API] Load Stores Success",
  props<{ stores: any[] }>()
);

export const addMoreStores = createAction(
  "[Store API] Add More Stores",
  props<{ stores: any[] }>()
);
export const loadStoresFailure = createAction(
  "[Store List] Load Stores Failure",
  props<{ error: any }>()
);

export const searchStores = createAction(
  "[Store] Search Stores",
  props<{ query: string }>()
);
