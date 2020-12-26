Vue.component('treeselect', VueTreeselect.Treeselect)

var app = new Vue({
	el: '#app',
	data: {
		weapon: null,
		weaponsData: weaponsData,
		travelTimes: travelTimes,
		clearable: 'clearable',
		options: selectMenuItems
	},
	computed: {
		weaponType() {
			if(!this.weapon) {
				return null
			}
			return this.weapon.split('.')[0]
		},
		isBurst() {
			return this.times.shot_duration 
				&& this.weaponType !== 'beams'
				&& this.weaponType !== 'bombs'
		},
		isBeam() {
			return this.weaponType == 'beams'
		},
		isBomb() {
			return this.weaponType == 'bombs'
		},
		times() {
			if(!this.weapon) {
				return null
			}
			if(this.weaponType == 'bombs') {
				weapon = this.weaponsData['bombs.all']
			} else {
				weapon = this.weaponsData[this.weapon]
			}

			totalMean = this.shieldsTime(weapon, 'engiShields', 'mean')
				+ this.shieldsTime(weapon, 'flagshipShields', 'mean')

			totalCruiserMean = this.shieldsTime(weapon, 'engiCruiserShields', 'mean')
				+ this.shieldsTime(weapon, 'crystalCruiserShields', 'mean')

			return {
				'initial_delay': weapon.initial_delay,
				'shot_duration': weapon.shot_duration,
				'speed': weapon.speed,
				'tick1': weapon.tick1,
				'tick2': weapon.tick2,
				'engiShields': {
					'mean': this.shieldsTime(weapon, 'engiShields', 'mean').toFixed(2),
					'min': this.shieldsTime(weapon, 'engiShields', 'min').toFixed(2),
					'max': this.shieldsTime(weapon, 'engiShields', 'max').toFixed(2)
				},
				'flagshipShields': {
					'mean': this.shieldsTime(weapon, 'flagshipShields', 'mean').toFixed(2),
					'min': this.shieldsTime(weapon, 'flagshipShields', 'min').toFixed(2),
					'max': this.shieldsTime(weapon, 'flagshipShields', 'max').toFixed(2)
				},
				'anySizeShields': {
					'mean': (totalMean / 2).toFixed(2),
					'min': this.shieldsTime(weapon, 'flagshipShields', 'min').toFixed(2),
					'max': this.shieldsTime(weapon, 'engiShields', 'max').toFixed(2),
				},
				'weaponSlotTravel': (this.travelTimes['mountSeparation'] / weapon.speed)
					.toFixed(2),
				'engiCruiserShields': {
					'mean': this.shieldsTime(weapon, 'engiCruiserShields', 'mean')
						.toFixed(2),
					'min': this.shieldsTime(weapon, 'engiCruiserShields', 'min')
						.toFixed(2),
					'max': this.shieldsTime(weapon, 'engiCruiserShields', 'max')
						.toFixed(2),
				},
				'crystalCruiserShields': {
					'mean': this.shieldsTime(weapon, 'crystalCruiserShields', 'mean')
						.toFixed(2),
					'min': this.shieldsTime(weapon, 'crystalCruiserShields', 'min')
						.toFixed(2),
					'max': this.shieldsTime(weapon, 'crystalCruiserShields', 'max')
						.toFixed(2),
				},
				'anyCruiserShields': {
					'mean': (totalCruiserMean / 2).toFixed(2),
					'min': this.shieldsTime(weapon, 'crystalCruiserShields', 'min').toFixed(2),
					'max': this.shieldsTime(weapon, 'engiCruiserShields', 'max').toFixed(2),
				}
			}
		}
	},
	methods: {
		shieldsTime(weapon, targetName, type) {
			time = this.travelTimes[targetName][type] / weapon.speed
			return time + weapon.initial_delay
		}
	}
})
