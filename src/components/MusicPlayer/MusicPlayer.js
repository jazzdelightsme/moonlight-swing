import React from 'react'
import Sound from 'react-sound'
import update from 'immutability-helper';
import FaPlayCircle from 'react-icons/lib/fa/play-circle'
import FaStopCircle from 'react-icons/lib/fa/stop-circle'
import MyIcon from '../MyIcon/MyIcon'

export default class MusicPlayer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			player: {
				url: this.props.songs[0].url,
				playStatus: this.props.playStatus
			},
			icon: FaPlayCircle,
			currentSongIndex: 0,
		}

		this.play = this.play.bind(this)
		this.stop = this.stop.bind(this)
		this.togglePlay = this.togglePlay.bind(this)
		this.next = this.next.bind(this)
		this.handleFinishPlaying = this.handleFinishPlaying.bind(this)
	}

	play() {
		let newState = update(this.state, {
			player: {
				playStatus: {$set: Sound.status.PLAYING}
			},
			icon: {$set: FaStopCircle},
		})

		this.setState(newState)
	}

	stop() {
		let newState = update(this.state, {
			player: {
				playStatus: {$set: Sound.status.STOPPED}
			},
			icon: {$set: FaPlayCircle},
		})

		this.setState(newState)
	}

	togglePlay() {
		let newState = update(this.state, {
			player: {
				playStatus: {$set: this.state.player.playStatus == Sound.status.STOPPED ? Sound.status.PLAYING : Sound.status.STOPPED},
			},
			icon: {$set: this.state.icon === FaPlayCircle ? FaStopCircle : FaPlayCircle},
		})

		this.setState(newState)
	}

	next() {
		let nextIndex = (this.state.currentSongIndex+1) % this.props.songs.length

		let newState = update(this.state, {
			player: {
				url: {$set: this.props.songs[nextIndex].url},
			},
			currentSongIndex: {$set: nextIndex},
		})

		this.setState(newState)
	}

	handleFinishPlaying() {
		if (this.props.stopOnFinish) {
			this.stop()
		} else {
			this.next()
		}
	}

	render() {
		return (
			<div>
				<MyIcon icon={this.state.icon} className={this.props.className} id={this.props.id} onClick={this.togglePlay}/>
				<Sound {...this.state.player} onFinishedPlaying={this.handleFinishPlaying}/>
			</div>
		)
	}
}