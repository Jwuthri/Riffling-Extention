const SaveBtn = document.getElementById('Save');


// Parameters Setter
function setFixation(event) {
  let fixation = parseFloat(event.target.value);
  chrome.storage.sync.set({fixation: fixation});
  chrome.storage.local.set({fixation: fixation});
}

function setSaccades(event) {
  let saccades = parseFloat(event.target.value);
  chrome.storage.sync.set({saccades: saccades});
  chrome.storage.local.set({saccades: saccades});
}


function setOpacity(event) {
  let opacity = parseFloat(event.target.value);
  chrome.storage.sync.set({opacity: opacity});
  chrome.storage.local.set({opacity: opacity});
}


function setStopwords(event) {
  let stopwords = parseFloat(event.target.value);
  chrome.storage.sync.set({stopwords: stopwords});
  chrome.storage.local.set({stopwords: stopwords});
}


function setRareWords(event) {
  let rareWords = parseFloat(event.target.value);
  chrome.storage.sync.set({rareWords: rareWords});
  chrome.storage.local.set({rareWords: rareWords});
}


function setRareWordsBehavior(event) {
  let rareWordsBehavior = event.target.value;
  chrome.storage.sync.set({rareWordsBehavior: rareWordsBehavior});
  chrome.storage.local.set({rareWordsBehavior: rareWordsBehavior});
}


function setStopWordsBehavior(event) {
  let stopWordsBehavior = event.target.value;
  chrome.storage.sync.set({stopWordsBehavior: stopWordsBehavior});
  chrome.storage.local.set({stopWordsBehavior: stopWordsBehavior});
}


// OnLoading function
function checkSettings() {
  chrome.storage.local.get(["fixation", "saccades", "opacity", "stopwords", "rareWords", "rareWordsBehavior", "stopWordsBehavior"], (result) => {
    document.getElementById('Fixation').value = result.fixation
    document.getElementById('Saccades').value = result.saccades
    document.getElementById('Opacity').value = result.opacity
    document.getElementById('Stopwords').value = result.stopwords
    document.getElementById('RareWords').value = result.rareWords
    document.getElementById('RareWordsBehavior').value = result.rareWordsBehavior
    document.getElementById('StopWordsBehavior').value = result.stopWordsBehavior
  })
}

window.onload = () => {
  checkSettings();
}


// Listeners
document.getElementById('Fixation').addEventListener('click', setFixation);
document.getElementById('Saccades').addEventListener('click', setSaccades);
document.getElementById('Opacity').addEventListener('click', setOpacity);
document.getElementById('Stopwords').addEventListener('click', setStopwords);
document.getElementById('RareWords').addEventListener('click', setRareWords);
document.getElementById('RareWordsBehavior').addEventListener('click', setRareWordsBehavior);
document.getElementById('StopWordsBehavior').addEventListener('click', setStopWordsBehavior);
SaveBtn.addEventListener('click', () => {
  alert("Parameters have been saved!!")
})
