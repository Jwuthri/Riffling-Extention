// Click event
const RifflingBtn = document.getElementById('Riffling');


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


RifflingBtn.addEventListener('click', async () => {
  chrome.storage.local.get(["fixation", "saccades", "opacity", "stopwords", "rareWords", "rareWordsBehavior", "stopWordsBehavior"], (result) => {
    document.getElementById('Fixation').value = result.fixation
    document.getElementById('Saccades').value = result.saccades
    document.getElementById('Opacity').value = result.opacity
    document.getElementById('Stopwords').value = result.stopwords
    document.getElementById('RareWords').value = result.rareWords
    document.getElementById('RareWordsBehavior').value = result.rareWordsBehavior
    document.getElementById('StopWordsBehavior').value = result.stopWordsBehavior
  })

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const FixationStrength = document.getElementById('Fixation').value
  const SaccadesStrength = document.getElementById('Saccades').value
  const OpacityStrength = document.getElementById('Opacity').value
  const RareWordsFreq = document.getElementById('RareWords').value
  const RareWordsBehavior = document.getElementById('RareWordsBehavior').value
  const StopWordsBehavior = document.getElementById('StopWordsBehavior').value
  
  const stopwordStrength = document.getElementById('Stopwords').value
  const StopwordsList = ["all", "such", "in", "a", "as", "of", "the", "an", "to", "themselves", "then", "been", "before", "is", "were", "for", "myself", "there", "being", "below", "what", "be", "because", "them", "we", "theirs", "when", "from", "at", "where", "into", "that", "should", "than", "own", "it", "their", "my", "between", "did", "me", "until", "do", "up", "does", "doing", "down", "too", "during", "each", "same", "through", "those", "more", "this", "most", "very", "they", "these", "just", "few", "by", "but", "itself", "its", "both", "was", "she", "are", "further", "over", "i", "with", "if", "so", "some", "not", "her", "only", "here", "against", "again", "after", "once", "on", "hers", "or", "herself", "you", "him", "how", "himself", "his", "your", "above", "about", "yours", "yourself", "yourselves", "off", "nor", "under", "ourselves", "while", "no", "our", "who", "ours", "any", "whom", "and", "out", "have", "has", "had", "why", "having", "am", "which", "other", "he", "s", "hadn't", "mainly", "how's", "that's", "shouldn't", "don't", "didn't", "don", "maybe", "doesn't", "let's", "he's", "they've", "she's", "i've", "he'll", "isn't", "he'd", "there's", "t", "haven't", "it's", "here's", "hasn't", "she'll", "i'm", "i'll", "they'd", "i'd", "they'll", "they're", "she'd", "oh", "shan't", "couldn't", "we'd", "almost", "although", "always", "why's", "ought", "who's", "aren't", "cannot", "can't", "can", "where's", "when's", "what's", "weren't", "mustn't", "wasn't", "we'll", "we're", "will", "we've", "you'd", "won't", "you've", "could", "would", "you're", "you'll", "now", "actually", "wouldn't", "old", "pages", "somebody", "onto", "omitted", "shed", "shes", "page", "p", "part", "past", "particular", "particularly", "someday", "per", "perhaps", "somehow", "placed", "please", "plus", "okay", "shouldn", "showed", "show", "since", "ones", "ord", "one's", "one", "others", "slightly", "otherwise", "sixty", "six", "oughtn", "sincere", "oughtn't", "opposite", "poorly", "outside", "overall", "similar", "significantly", "significant", "owing", "side", "shows", "showns", "shown", "similarly", "recent", "possible", "recently", "round", "rd", "rather", "ran", "r", "run", "qv", "quite", "quickly", "que", "q", "put", "said", "provides", "provided", "re", "readily", "right", "regards", "somethan", "ref", "refs", "reasonably", "regarding", "regardless", "related", "results", "relatively", "research", "respectively", "resulted", "resulting", "really", "saw", "say", "saying", "seven", "serious", "primarily", "previously", "presumably", "seriously", "present", "predominantly", "sensible", "several", "pp", "shall", "potentially", "shan", "possibly", "sent", "selves", "proud", "promptly", "says", "sec", "second", "secondly", "section", "see", "seeing", "self", "seem", "probably", "seemed", "seeming", "seems", "seen", "someone", "'ll", "something", "what'll", "v", "value", "various", "ve", "versus", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "wasn", "way", "wed", "welcome", "well", "went", "uucp", "usually", "using", "unto", "u", "un", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "upon", "uses", "ups", "upwards", "us", "use", "used", "useful", "usefully", "usefulness", "weren", "what've", "sometime", "whatever", "whose", "widely", "willing", "wish", "within", "without", "won", "wonder", "words", "world", "wouldn", "www", "x", "y", "yes", "yet", "youd", "youre", "z", "whos", "whomever", "whole", "whereupon", "whats", "whence", "whenever", "whereafter", "whereas", "whereby", "wherein", "wheres", "wherever", "whoever", "whether", "whichever", "whilst", "whim", "whither", "who'd", "who'll", "whod", "two", "twice", "twenty", "twelve", "t's", "take", "taken", "taking", "tell", "ten", "tends", "th", "thank", "thanks", "thanx", "that'll", "that've", "thats", "thence", "there'd", "there'll", "there're", "there've", "system", "sure", "sup", "specifying", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "state", "suggest", "states", "still", "stop", "strongly", "sub", "substantially", "successfully", "sufficiently", "thereafter", "thereby", "thered", "took", "throug", "throughout", "thru", "thus", "til", "till", "tip", "together", "top", "thousand", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "three", "thoughh", "therefore", "thick", "therein", "thereof", "therere", "theres", "thereto", "thereupon", "theyd", "theyre", "thin", "though", "thing", "things", "think", "third", "thirty", "thorough", "thoroughly", "thou", "ok", "myse", "often", "ed", "course", "cry", "currently", "d", "dare", "daren", "daren't", "date", "de", "definitely", "describe", "described", "despite", "detail", "didn", "different", "directly", "doesn", "done", "downwards", "due", "couldnt", "couldn", "corresponding", "com", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "co.", "come", "contains", "comes", "computer", "con", "concerning", "consequently", "consider", "considering", "contain", "containing", "e", "edu", "forever", "effect", "ex", "exactly", "example", "except", "f", "fairly", "far", "farther", "fewer", "ff", "fifteen", "fifth", "fifty", "fill", "find", "fire", "first", "five", "fix", "followed", "following", "everywhere", "everything", "everyone", "ending", "eg", "eight", "eighty", "either", "eleven", "else", "elsewhere", "empty", "end", "enough", "everybody", "entirely", "especially", "et", "et-al", "etc", "even", "ever", "evermore", "every", "cant", "came", "call", "ca", "al", "allow", "allows", "alone", "along", "alongside", "already", "also", "amid", "amidst", "among", "amongst", "amount", "announce", "another", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "ain't", "ain", "ahead", "accordingly", "'s", "'ve", "I", "a's", "able", "abroad", "abst", "accordance", "according", "across", "ah", "act", "added", "adj", "adopted", "affected", "affecting", "affects", "afterwards", "ago", "anyways", "anywhere", "apart", "best", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "believe", "beside", "besides", "better", "becomes", "beyond", "bill", "biol", "bottom", "brief", "briefly", "c", "c'mon", "c's", "becoming", "become", "apparently", "ask", "appear", "appreciate", "appropriate", "approximately", "aren", "arent", "arise", "around", "aside", "asking", "became", "associated", "auth", "available", "away", "awfully", "b", "back", "backward", "backwards", "follows", "former", "obviously", "move", "many", "may", "mayn", "mayn't", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "mightn", "mightn't", "mill", "million", "mine", "minus", "miss", "ml", "mon", "moreover", "makes", "make", "made", "likely", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likewise", "m", "line", "little", "ll", "look", "looking", "looks", "low", "lower", "ltd", "mostly", "mr", "formerly", "mrs", "nevertheless", "new", "next", "nine", "ninety", "no-one", "nobody", "non", "none", "nonetheless", "noone", "normally", "nos", "noted", "nothing", "notwithstanding", "novel", "nowhere", "o", "obtain", "obtained", "neverless", "neverf", "never", "namely", "much", "mug", "must", "mustn", "'re", "myse”", "n", "na", "name", "nay", "neither", "nd", "near", "nearly", "necessarily", "necessary", "need", "needn", "needn't", "needs", "later", "lately", "last", "largely", "h", "hadn", "half", "happens", "hardly", "hasn", "hasnt", "haven", "hello", "help", "hence", "hereafter", "hereby", "herein", "heres", "hereupon", "herse", "hes", "hi", "hid", "himse", "greetings", "gotten", "got", "gave", "forth", "forty", "forward", "found", "four", "front", "full", "furthermore", "g", "get", "gone", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "going", "hither", "home", "hopefully", "k", "invention", "inward", "isn", "it'd", "it'll", "itd", "itse", "itse”", "j", "keep", "instead", "keeps", "kept", "keys", "kg", "km", "know", "known", "knows", "l", "interest", "insofar", "howbeit", "important", "however", "hundred", "id", "ie", "ignored", "im", "immediate", "immediately", "importance", "inasmuch", "inside", "inc", "inc.", "indeed", "index", "indicate", "indicated", "indicates", "information", "inner", "zero"];

  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    function: rifflingReading,
    args: [FixationStrength, SaccadesStrength, OpacityStrength, stopwordStrength, StopwordsList, StopWordsBehavior, RareWordsFreq, RareWordsBehavior]
  })

  // window.close();

});


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


//////////////////////
// RIFFLING READING //
//////////////////////
function rifflingReading(fixation, saccades, opacity, stopwords, stopWordsList, stopwordsBehavior, maxFreqRareWords, rarewordsBehavior) {

  const markStart = "<mark-br>"
  const markEnd = "</mark-br>"
  const underlineStart = "<u-br>"
  const underlineEnd = "</u-br>"
  const strikethroughStart = "<s-br>"
  const strikethroughEnd = "</s-br>"
  const boldStart = "<bold-br>"
  const boldEnd = "</bold-br>"
  const removeStart = "<invisible-br>"
  const removeEnd = "</invisible-br>"

  const splitter = /([ (){}\n\t-.!?;:"])/
  const notToken = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ \n\t'
  const tags = ['p', 'font', 'span', 'li'];


  ////////////////////////////
  // HIGHLIGHTING FUNCTIONS //
  ////////////////////////////
  function opacityHighlight(token, highlightFormat) {
    switch (highlightFormat) {
      case "highlight":
        return `${markStart}${token}${markEnd}`;
      case "underline":
        return `${underlineStart}${token}${underlineEnd}`;
      case "strikethrough":
        return `${strikethroughStart}${token}${strikethroughEnd}`;
      case "remove":
        return `${removeStart}${token}${removeEnd}`;
      case "bold":
        return `${boldStart}${token}${boldEnd}`;
      default:
        return token;
    }
  }


  function fixationHighlight(token, fixation) {
    if (token.length <= 2 && fixation < 8) {
      return [token.slice(0, 1), token.slice(1)];
    } else {
      const lastCharToHighlight = Math.round((fixation / 10) * token.length);
      return [token.slice(0, lastCharToHighlight), token.slice(lastCharToHighlight)];
    }
  }


  function tokenHighlight(token, index, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
    let firstPart = "";
    let secondPart = "";
    if (stringContainsNumber(token)) {
      return [token, index];
    } else if (rareWords.includes(token.toLowerCase())) {
      return [opacityHighlight(token, rarewordsBehavior), index];
    } else if (stopwords.includes(token.toLowerCase())) {
      return [opacityHighlight(token, stopwordsBehavior), index - 1];
    } else if (index % saccades == 0 || index == 1) {
      let temp = fixationHighlight(token, fixation);
      firstPart = temp[0];
      secondPart = temp[1];
      firstPart = opacityHighlight(firstPart, "bold");
      return [firstPart.concat(secondPart), index];
    } else {
      return [token, index];
    }
  }


  function stringHighlight(string, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
    const tokens = textToTokens(string);
    const tokensHighlighted = [];
    let index = 0;
    for (let token of tokens) {
      if (notToken.includes(token)) {
        tokensHighlighted.push(token);
      } else {
        index += 1;
        let temp = tokenHighlight(token, index, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior);
        index = temp[1];
        token = temp[0];
        tokensHighlighted.push(token);
      }
    }

    return tokensHighlighted.join("")
  }


  function highlighting(fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
    const parser = new DOMParser();
    tags.forEach((tag) => {
      for (const element of document.getElementsByTagName(tag)) {
        const nodes = parser.parseFromString(element.innerHTML, 'text/html');
        const stringHighlighted = Array.from(nodes.body.childNodes).map((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            return stringHighlight(node.nodeValue, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior);
          }
          return node.outerHTML;
        });
        element.innerHTML = stringHighlighted.join('');
      }
    });
  }


  // function unhighlighting() {
  //   const tags = ['p']
  //   const parser = new DOMParser();
  //   tags.forEach((tag) => {
  //     for (const element of document.getElementsByTagName(tag)) {
  //       const stringHighlighted = Array.from(element.innerHTML).map((node) => {
  //         console.log(node);
  //       })
  //       // let r = element.outerHTML;
  //       // r = r.replace("<bold-br>", "").replace("</bold-br>")
  //       // console.log(r)
  //       // element.innerHTML = r;
  //       element.innerHTML = stringHighlighted.join('');
  //     }
  //   });
  // }

  //////////////////////
  // HELPER FUNCTIONS //
  //////////////////////
  function stringContainsNumber(string) {
    return /\d/.test(string);
  }


  function concatAllText() {
    let concatenedText = "";
    for (const element of document.getElementsByTagName("p")) {
      concatenedText = concatenedText.concat(" ", element.innerText);
    }
    return concatenedText;
  }


  function textToTokens(string) {
    const words = string.split(splitter);
    const correctWords = words.filter(function (word) {
      return word.length > 0;
    })
    return correctWords;
  }


  function setStopWords(array, stopwordsSize) {
    const end = Math.round((stopwordsSize / 10) * array.length);

    return array.slice(0, end);
  }


  //////////////////////////
  // RARE WORDS FUNCTIONS //
  //////////////////////////
  function wordFreq(string) {
      const words = textToTokens(string);
      let freqMap = {};
      words.forEach(function(w) {
          if (!freqMap[w]) {
              freqMap[w] = 0;
          }
          freqMap[w] += 1;
      });

      return freqMap;
  }


  function getRareWords(string, maxFreq, stopwords) {
    const freqMap = wordFreq(string);
    const filteredMap = Object.fromEntries(Object.entries(freqMap).filter(([k,v]) => k.length > 1 && !stopwords.includes(k) && !notToken.includes(k) && !stringContainsNumber(k) && v <= maxFreq));

    return Object.keys(filteredMap);
  }

  //////////
  // MAIN //
  //////////
  const boldedElements = document.getElementsByTagName('bold-br');
  console.log(boldedElements.length)
  document.body.classList.toggle('bold-br');
  document.body.classList.toggle('mark-br');
  document.body.classList.toggle('s-br');
  document.body.classList.toggle('u-br');
  document.body.classList.toggle('invisible-br');
  if (boldedElements.length) {
    return;
  }

  const style = document.createElement('style');
  style.textContent = `.s-br s-br {text-decoration: line-through;} .mark-br mark-br {background-color: #243b55; color: #03e9f4; } .u-b u-br {text-decoration: underline;} .bold-br bold-br { font-weight: ${opacity * 100} !important; display: inline; line-height: var(--br-line-height,initial); }  .invisible-br invisible-br {display:none}`;
  document.head.appendChild(style);

  const string = concatAllText().toLowerCase();
  const rareWords = getRareWords(string, maxFreqRareWords, stopWordsList);
  const filteredStopwords = setStopWords(stopWordsList, stopwords);

  return highlighting(fixation, saccades, opacity, rareWords, rarewordsBehavior, filteredStopwords, stopwordsBehavior);
}
