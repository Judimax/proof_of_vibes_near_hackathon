import { createAction ,props} from '@ngrx/store';


export let updateSpotifyAccessToken = createAction(
  '[Spotify] Update Access Token',
  props<{access_token:string}>()
)