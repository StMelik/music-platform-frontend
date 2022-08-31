import * as PlayerActionCreators from './player'
import * as TrackActionCreators from './track'
import * as AlbumActionCreators from './album'

export default {
    ...PlayerActionCreators,
    ...TrackActionCreators,
    ...AlbumActionCreators,
}