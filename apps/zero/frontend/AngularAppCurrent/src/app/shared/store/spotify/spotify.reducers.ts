import { SpotifyActions } from ".";
import { Action, createReducer, on } from '@ngrx/store';

export class SpotifyState{
  access_token:string =""
}
const initialState = new SpotifyState()
const reducer = createReducer(
  initialState,
  on(SpotifyActions.updateSpotifyAccessToken, (state, action) => 
  ({ ...state, access_token:action.access_token })
  ),

);

export function getSpotifyReducer(state: SpotifyState | undefined, action: Action) {

  return reducer(state, action);

}