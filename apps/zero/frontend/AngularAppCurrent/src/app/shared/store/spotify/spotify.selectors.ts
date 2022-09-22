
// ngrx
import { SpotifyState } from "./spotify.reducers";
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getSpotifyState = createFeatureSelector<SpotifyState>('spotify');
export const getSpotifyAccessToken = createSelector(
  getSpotifyState,
  ({access_token})=> access_token
)