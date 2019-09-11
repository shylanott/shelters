/* global d3 */
import load from './load-data'

// reader parameters
let readerState = null

// updating text selections
const $section = d3.selectAll('.intro')
const $state = d3.selectAll('.userState')
const $name = $section.selectAll('.exampleDog')
const $pOut = $section.selectAll('.intro-dog_out')
const $pIn = $section.selectAll('.intro-dog_in')
const $img = $section.selectAll('.intro-dog_image')
const $inCount = $section.selectAll('.inTotal')
const $outCount = $section.selectAll('.outTotal')
const $total = $section.selectAll('.stateTotal')
const $pupHerHis = $section.selectAll('.herhis')
const $pupSheHe = $section.selectAll('.shehe')
const $reason = $section.selectAll('.moveCondition')
const $dogOrigin = $section.selectAll('.dogOrigin')
const $stackBarContainer = $section.select('.intro-dog__bar')
const $exportedSection = d3.selectAll('.exported')


// constants
let exampleDogs = null
const exportedDogs = null
let readerDog = null

const formatCount = d3.format(',.0f')
const formatPercent = d3.format('.0%')

function updateLocation(loc){
	readerState = loc
	filterDogs()
}

function updateBars(dog){
	const perOut = +dog[0].count_imported / +dog[0].total
	const perIn = (+dog[0].total - +dog[0].count_imported) /  +dog[0].total
	$stackBarContainer.select('.bar__inState').style('flex', `${perIn} 1 0`)
	$stackBarContainer.select('.bar__outState').style('flex', `${perOut} 1 0`)

	$stackBarContainer.select('.bar__inState-label').text(formatPercent(perIn))
	$stackBarContainer.select('.bar__outState-label').text(formatPercent(perOut))

	console.log({perOut, perIn})
}


function filterDogs(){
	readerDog = exampleDogs.filter(d => d.current === readerState)

	// update state
	$state.text(readerState)
	$name.text(readerDog[0].name)

	// show appropriate text
	if (readerDog[0].imported === 'TRUE'){
		$pOut.classed('is-visible', true)
		$pIn.classed('is-visible', false)
		$exportedSection.classed('is-hidden', false)
	} else {
		$pOut.classed('is-visible', false)
		$pIn.classed('is-visible', true)
		$exportedSection.classed('is-hidden', true)
	}

	// update counts
	$inCount.text(formatCount(+readerDog[0].count_imported))
	$outCount.text(formatCount(+readerDog[0].count_exported))
	$total.text(formatCount(+readerDog[0].total))

	// update pronouns
	const pupPronoun = readerDog[0].sex
	$pupHerHis.text(pupPronoun === 'm' ? 'his' : 'her')
	$pupSheHe.text(pupPronoun === 'm' ? 'he' : 'she')

	// update conditions
	$reason.text(readerDog[0].conditions)
	$dogOrigin.text(readerDog[0].original)

	// add dog image
	const fileName = readerDog[0].name.replace(' ', '')
	const fileState = readerDog[0].current.replace(' ', '')
	$img.attr('src', `assets/images/faces/${fileName}_${fileState}.png`)

	updateBars(readerDog)
}


// code for determining user's location and subsequent data
function resize() {

}

function init(loc) {
	load.loadJSON('exampleDogs.json')
		.then(result => {
			console.log({loc})
			readerState = loc
			exampleDogs = result
			filterDogs()
		})
		.catch(console.error)
}

export default { init, resize, updateLocation };
