/* global d3 */
/* usage
	import loadData from './load-data'
	loadData().then(result => {

	}).catch(console.error)
*/

function loadJSON(file) {
  return new Promise((resolve, reject) => {
    d3.json(`assets/data/${file}`)
      .then(result => {
        // clean here
        resolve(result);
      })
      .catch(reject);
  });
}


function loadCSV(file) {
  return new Promise((resolve, reject) => {
    d3.csv(`assets/data/${file}`)
      .then(result => {

        resolve(result);
      })
      .catch(reject);
  });
}

function loadExamples(){
  loadJSON('exampleDogs.json')
}

function loadExported(){
  loadCSV('exportedDogs.csv')
}

export default {loadCSV, loadJSON}

// export default function loadData() {
//   const loads = [loadJSON('exampleDogs.json'), loadCSV('exportedDogs.csv')];
//   return Promise.all(loads);
// }
