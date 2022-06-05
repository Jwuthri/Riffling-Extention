chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-riffling') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const StopwordsList = ["all", "such", "in", "a", "as", "of", "the", "an", "to", "themselves", "then", "been", "before", "is", "were", "for", "myself", "there", "being", "below", "what", "be", "because", "them", "we", "theirs", "when", "from", "at", "where", "into", "that", "should", "than", "own", "it", "their", "my", "between", "did", "me", "until", "do", "up", "does", "doing", "down", "too", "during", "each", "same", "through", "those", "more", "this", "most", "very", "they", "these", "just", "few", "by", "but", "itself", "its", "both", "was", "she", "are", "further", "over", "i", "with", "if", "so", "some", "not", "her", "only", "here", "against", "again", "after", "once", "on", "hers", "or", "herself", "you", "him", "how", "himself", "his", "your", "above", "about", "yours", "yourself", "yourselves", "off", "nor", "under", "ourselves", "while", "no", "our", "who", "ours", "any", "whom", "and", "out", "have", "has", "had", "why", "having", "am", "which", "other", "he", "s", "hadn't", "mainly", "how's", "that's", "shouldn't", "don't", "didn't", "don", "maybe", "doesn't", "let's", "he's", "they've", "she's", "i've", "he'll", "isn't", "he'd", "there's", "t", "haven't", "it's", "here's", "hasn't", "she'll", "i'm", "i'll", "they'd", "i'd", "they'll", "they're", "she'd", "oh", "shan't", "couldn't", "we'd", "almost", "although", "always", "why's", "ought", "who's", "aren't", "cannot", "can't", "can", "where's", "when's", "what's", "weren't", "mustn't", "wasn't", "we'll", "we're", "will", "we've", "you'd", "won't", "you've", "could", "would", "you're", "you'll", "now", "actually", "wouldn't", "old", "pages", "somebody", "onto", "omitted", "shed", "shes", "page", "p", "part", "past", "particular", "particularly", "someday", "per", "perhaps", "somehow", "placed", "please", "plus", "okay", "shouldn", "showed", "show", "since", "ones", "ord", "one's", "one", "others", "slightly", "otherwise", "sixty", "six", "oughtn", "sincere", "oughtn't", "opposite", "poorly", "outside", "overall", "similar", "significantly", "significant", "owing", "side", "shows", "showns", "shown", "similarly", "recent", "possible", "recently", "round", "rd", "rather", "ran", "r", "run", "qv", "quite", "quickly", "que", "q", "put", "said", "provides", "provided", "re", "readily", "right", "regards", "somethan", "ref", "refs", "reasonably", "regarding", "regardless", "related", "results", "relatively", "research", "respectively", "resulted", "resulting", "really", "saw", "say", "saying", "seven", "serious", "primarily", "previously", "presumably", "seriously", "present", "predominantly", "sensible", "several", "pp", "shall", "potentially", "shan", "possibly", "sent", "selves", "proud", "promptly", "says", "sec", "second", "secondly", "section", "see", "seeing", "self", "seem", "probably", "seemed", "seeming", "seems", "seen", "someone", "'ll", "something", "what'll", "v", "value", "various", "ve", "versus", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "wasn", "way", "wed", "welcome", "well", "went", "uucp", "usually", "using", "unto", "u", "un", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "upon", "uses", "ups", "upwards", "us", "use", "used", "useful", "usefully", "usefulness", "weren", "what've", "sometime", "whatever", "whose", "widely", "willing", "wish", "within", "without", "won", "wonder", "words", "world", "wouldn", "www", "x", "y", "yes", "yet", "youd", "youre", "z", "whos", "whomever", "whole", "whereupon", "whats", "whence", "whenever", "whereafter", "whereas", "whereby", "wherein", "wheres", "wherever", "whoever", "whether", "whichever", "whilst", "whim", "whither", "who'd", "who'll", "whod", "two", "twice", "twenty", "twelve", "t's", "take", "taken", "taking", "tell", "ten", "tends", "th", "thank", "thanks", "thanx", "that'll", "that've", "thats", "thence", "there'd", "there'll", "there're", "there've", "system", "sure", "sup", "specifying", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "state", "suggest", "states", "still", "stop", "strongly", "sub", "substantially", "successfully", "sufficiently", "thereafter", "thereby", "thered", "took", "throug", "throughout", "thru", "thus", "til", "till", "tip", "together", "top", "thousand", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "three", "thoughh", "therefore", "thick", "therein", "thereof", "therere", "theres", "thereto", "thereupon", "theyd", "theyre", "thin", "though", "thing", "things", "think", "third", "thirty", "thorough", "thoroughly", "thou", "ok", "myse", "often", "ed", "course", "cry", "currently", "d", "dare", "daren", "daren't", "date", "de", "definitely", "describe", "described", "despite", "detail", "didn", "different", "directly", "doesn", "done", "downwards", "due", "couldnt", "couldn", "corresponding", "com", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "co.", "come", "contains", "comes", "computer", "con", "concerning", "consequently", "consider", "considering", "contain", "containing", "e", "edu", "forever", "effect", "ex", "exactly", "example", "except", "f", "fairly", "far", "farther", "fewer", "ff", "fifteen", "fifth", "fifty", "fill", "find", "fire", "first", "five", "fix", "followed", "following", "everywhere", "everything", "everyone", "ending", "eg", "eight", "eighty", "either", "eleven", "else", "elsewhere", "empty", "end", "enough", "everybody", "entirely", "especially", "et", "et-al", "etc", "even", "ever", "evermore", "every", "cant", "came", "call", "ca", "al", "allow", "allows", "alone", "along", "alongside", "already", "also", "amid", "amidst", "among", "amongst", "amount", "announce", "another", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "ain't", "ain", "ahead", "accordingly", "'s", "'ve", "I", "a's", "able", "abroad", "abst", "accordance", "according", "across", "ah", "act", "added", "adj", "adopted", "affected", "affecting", "affects", "afterwards", "ago", "anyways", "anywhere", "apart", "best", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "believe", "beside", "besides", "better", "becomes", "beyond", "bill", "biol", "bottom", "brief", "briefly", "c", "c'mon", "c's", "becoming", "become", "apparently", "ask", "appear", "appreciate", "appropriate", "approximately", "aren", "arent", "arise", "around", "aside", "asking", "became", "associated", "auth", "available", "away", "awfully", "b", "back", "backward", "backwards", "follows", "former", "obviously", "move", "many", "may", "mayn", "mayn't", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "mightn", "mightn't", "mill", "million", "mine", "minus", "miss", "ml", "mon", "moreover", "makes", "make", "made", "likely", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likewise", "m", "line", "little", "ll", "look", "looking", "looks", "low", "lower", "ltd", "mostly", "mr", "formerly", "mrs", "nevertheless", "new", "next", "nine", "ninety", "no-one", "nobody", "non", "none", "nonetheless", "noone", "normally", "nos", "noted", "nothing", "notwithstanding", "novel", "nowhere", "o", "obtain", "obtained", "neverless", "neverf", "never", "namely", "much", "mug", "must", "mustn", "'re", "myse”", "n", "na", "name", "nay", "neither", "nd", "near", "nearly", "necessarily", "necessary", "need", "needn", "needn't", "needs", "later", "lately", "last", "largely", "h", "hadn", "half", "happens", "hardly", "hasn", "hasnt", "haven", "hello", "help", "hence", "hereafter", "hereby", "herein", "heres", "hereupon", "herse", "hes", "hi", "hid", "himse", "greetings", "gotten", "got", "gave", "forth", "forty", "forward", "found", "four", "front", "full", "furthermore", "g", "get", "gone", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "going", "hither", "home", "hopefully", "k", "invention", "inward", "isn", "it'd", "it'll", "itd", "itse", "itse”", "j", "keep", "instead", "keeps", "kept", "keys", "kg", "km", "know", "known", "knows", "l", "interest", "insofar", "howbeit", "important", "however", "hundred", "id", "ie", "ignored", "im", "immediate", "immediately", "importance", "inasmuch", "inside", "inc", "inc.", "indeed", "index", "indicate", "indicated", "indicates", "information", "inner", "zero"];

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      function: rifflingReading,
      args: [7, 2, 8, 1, StopwordsList, "remove", 5, 'highlight']
    })
  }
});


//////////////////////
// RIFFLING READING //
//////////////////////
function rifflingReading(fixation, saccades, opacity, stopwords, stopWordsList, stopwordsBehavior, maxFreqRareWords, rarewordsBehavior) {

  const markStart = "<mark>"
  const markEnd = "</mark>"
  const underlineStart = "<u>"
  const underlineEnd = "</u>"
  const strikethroughStart = "<s>"
  const strikethroughEnd = "</s>"
  const boldStart = "<br-bold>"
  const boldEnd = "</br-bold>"

  const splitter = /([ (){}\n\t-.!?;:"])/
  const notToken = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ \n\t'
  const tags = ['p', 'font', 'span', 'li'];


  ////////////////////////////
  // HIGHLIGHTING FUNCTIONS //
  ////////////////////////////
  function opacityHighlight(token, highlightFormat, opacity) {
    switch (highlightFormat) {
      case "highlight":
        return `${markStart}${token}${markEnd}`;
      case "underline":
        return `${underlineStart}${token}${underlineEnd}`;
      case "strikethrough":
        return `${strikethroughStart}${token}${strikethroughEnd}`;
      default:
        return `${boldStart}${token}${boldEnd}`;
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


  function saccadesHighlight(saccades) {
    return saccades;
  }


  function stopwordsHighlight(token, stopwordsBehavior, opacity) {
    switch (stopwordsBehavior) {
      case "remove":
        return "";
      case "strikethrough":
        return opacityHighlight(token, stopwordsBehavior, opacity);
      default:
        return token;
    }
  }


  function rarewordsHighlight(token, rarewordsBehavior, opacity) {
    return opacityHighlight(token, rarewordsBehavior, opacity);
  }


  function tokenHighlight(token, index, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
    let firstPart = "";
    let secondPart = "";
    if (stringContainsNumber(token)) {
      return [token, index];
    } else if (rareWords.includes(token.toLowerCase())) {
      return [rarewordsHighlight(token, rarewordsBehavior, opacity), index];
    } else if (stopwords.includes(token.toLowerCase())) {
      return [stopwordsHighlight(token, stopwordsBehavior), index - 1];
    } else if (index % saccadesHighlight(saccades) == 0 || index == 1) {
      let temp = fixationHighlight(token, fixation);
      firstPart = temp[0];
      secondPart = temp[1];
      firstPart = opacityHighlight(firstPart, "bold", opacity);
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
  const boldedElements = document.getElementsByTagName('br-bold');
  document.body.classList.toggle('br-bold');
  if (boldedElements.length) {
    return;
  }

  const style = document.createElement('style');
  style.textContent = `.br-bold br-bold { font-weight: ${opacity * 100} !important; display: inline; line-height: var(--br-line-height,initial); }`;
  document.head.appendChild(style);

  const string = concatAllText().toLowerCase();
  const rareWords = getRareWords(string, maxFreqRareWords, stopWordsList);
  const filteredStopwords = setStopWords(stopWordsList, stopwords);

  return highlighting(fixation, saccades, opacity, rareWords, rarewordsBehavior, filteredStopwords, stopwordsBehavior);
}
