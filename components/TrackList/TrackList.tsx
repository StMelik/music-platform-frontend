import React from 'react'

import styles from './tracklist.module.scss'
import { ITrack } from '../../types/track'
import TrackItem from '../TrackItem/TrackItem'

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {

    return (
        <ul className={styles.list}>
            {tracks?.map(track =>
                <TrackItem
                    key={track._id}
                    track={track}
                />
            )}
        </ul>
    )
}

export default TrackList