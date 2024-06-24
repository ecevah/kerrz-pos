import { createReducer, on } from "@ngrx/store";
import {
  addMoreStores,
  decrement,
  handleLocation,
  increment,
  loadStoresSuccess,
  reset,
  searchStores,
} from "./data.action";

interface LocationState {
  latitude: number;
  longitude: number;
}

export interface StoreState {
  stores: any;
  filteredStores: any;
}

export const initialState: number = 0;

export const initialStoreState: StoreState = {
  stores: [],
  filteredStores: [],
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
  on(loadStoresSuccess, (state, { stores }) => ({
    ...state,
    stores,
    filteredStores: stores,
  })),
  on(addMoreStores, (state, { stores }) => ({
    ...state,
    stores: [
      ...state.stores.filter(
        (existingStore: any) =>
          !stores.some((newStore) => newStore.id === existingStore.id)
      ),
      ...stores,
    ],
    filteredStores: [
      ...state.filteredStores.filter(
        (existingStore: any) =>
          !stores.some((newStore) => newStore.id === existingStore.id)
      ),
      ...stores,
    ],
  })),
  on(searchStores, (state, { query }) => ({
    ...state,
    filteredStores: state.stores.filter((store: any) =>
      store.title.toLowerCase().includes(query.toLowerCase())
    ),
  }))
);
