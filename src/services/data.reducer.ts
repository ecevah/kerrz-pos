import { createReducer, on } from "@ngrx/store";
import {
  addMoreStores,
  decrement,
  handleLocation,
  increment,
  loadStoresSuccess,
  reset,
} from "./data.action";

interface LocationState {
  latitude: number;
  longitude: number;
}

export interface StoreState {
  stores: any;
}

export const initialState: number = 0;

export const initialStoreState: StoreState = {
  stores: [],
};

export const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 5),
  on(decrement, (state) => state - 5),
  on(reset, () => 0)
);

export const locationReducer = createReducer(
  initialLocationState,
  on(handleLocation, (state, { latitude, longitude }) => ({
    ...state,
    latitude,
    longitude,
  }))
);

export const storeReducer = createReducer(
  initialStoreState,
  on(loadStoresSuccess, (state, { stores }) => ({ ...state, stores })),
  on(addMoreStores, (state, { stores }) => ({
    ...state,
    stores: [
      ...state.stores.filter(
        (existingStore: any) =>
          !stores.some((newStore) => newStore.id === existingStore.id)
      ),
      ...stores,
    ],
  }))
);
