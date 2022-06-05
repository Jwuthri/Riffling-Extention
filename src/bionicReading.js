// ////////////////////
// // BIONIC READING //
// ////////////////////
// function bionicReading(fixation, saccades, opacity, stopwords, stopwordsBehavior, maxFreqRareWords, rarewordsBehavior) {
//
//   const markStart = "<mark>"
//   const markEnd = "</mark>"
//   const underlineStart = "<u>"
//   const underlineEnd = "</u>"
//   const strikethroughStart = "<s>"
//   const strikethroughEnd = "</s>"
//   const boldStart = "<b>"
//   const boldEnd = "</b>"
//
//   const stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"]
//   const splitter = /([ (){}\n\t-.!?;:'"])/
//   const notToken = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \n\t'
//   const tags = ['p', 'font', 'span', 'li'];
//
//
//   ////////////////////////////
//   // HIGHLIGHTING FUNCTIONS //
//   ////////////////////////////
//   function opacityHighlight(token, highlightFormat, opacity) {
//     switch (highlightFormat) {
//       case "highlight":
//         return `${markStart}${token}${markEnd}`;
//       case "underline":
//         return `${underlineStart}${token}${underlineEnd}`;
//       case "strikethrough":
//         return `${strikethroughStart}${token}${strikethroughEnd}`;
//       default:
//         return `${boldStart}${token}${boldEnd}`;
//     }
//   }
//
//
//   function fixationHightlight(token, fixation) {
//     if (token.length <= 2) {
//       return token.slice(0, 1), token.slice(1);
//     } else {
//       const lastCharToHighlight = Math.round(fixation * token.length);
//       return token.slice(0, lastCharToHighlight), token.slice(lastCharToHighlight);
//     }
//   }
//
//
//   function saccadesHighlight(saccades) {
//     return saccades;
//   }
//
//
//   function stopwordsHighlight(token, stopwordsBehavior, opacity) {
//     switch (stopwordsBehavior) {
//       case "remove":
//         return "";
//       case "strikethrough":
//         return opacityHighlight(token, stopwordsBehavior, opacity);
//       default:
//         return token;
//     }
//   }
//
//
//   function rarewordsHighlight(token, rarewordsBehavior, opacity) {
//     return opacityHighlight(token, rarewordsBehavior, opacity);
//   }
//
//
//   function tokenHighlight(token, index, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
//     if (stringContainsNumber(token)) {
//       return token, index;
//     } else if (rareWords.includes(token.toLowerCase())) {
//       return rarewordsHighlight(token, rarewordsBehavior, opacity), index;
//     } else if (stopwords.includes(token.toLowerCase()) && ["highlight", "bold"].includes(stopwordsBehavior)) {
//       return stopwordsHighlight(token, stopwordsBehavior), index - 1;
//     } else if (index % saccadesHighlight(saccades) == 0 or index == 1) {
//       firstPart, secondPart = fixationHightlight(token, fixation), index;
//       if (stopwords.includes(token)) {
//         firstPart = opacityHighlight(firstPart, stopwordsBehavior, opacity);
//       } else {
//         firstPart = opacityHighlight(firstPart, "bold", opacity);
//       }
//       return firstPart.concat(secondPart), index;
//     } else {
//       return token, index;
//     }
//   }
//
//
//   function stringHighlight(string, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
//     const tokens = textToTokens(string);
//     const tokensHighlighted = [];
//     let index = 0;
//     for (const token in tokens) {
//       if (notToken.includes(token)) {
//         tokensHighlighted.push(token);
//       } else {
//         index += 1;
//         token, index = tokenHighlight(token, index, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior)
//         tokensHighlighted.push(token);
//       }
//     }
//   }
//
//
//   function highlighting(fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior) {
//     const parser = new DOMParser();
//     tags.forEach((tag) => {
//       for (const element of document.getElementsByTagName(tag)) {
//         const nodes = parser.parseFromString(element.innerHTML, 'text/html');
//         const stringHighlighted = Array.from(nodes.body.childNodes).map((node) => {
//           if (node.nodeType === Node.TEXT_NODE) {
//             return stringHighlight(node.nodeValue, fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior);
//           }
//           return node.outerHTML;
//         });
//         element.innerHTML = textArrTransformed.join('');
//       }
//     });
//   }
//
//
//   //////////////////////
//   // HELPER FUNCTIONS //
//   //////////////////////
//   function stringContainsNumber(string) {
//     return /\d/.test(string);
//   }
//
//
//   function concatAllText() {
//     let concatenedText = "";
//     for (const element of document.getElementsByTagName("p")) {
//       concatenedText = concatenedText.concat(" ", element.innerText);
//     }
//     return concatenedText;
//   }
//
//
//   function textToTokens(string) {
//     const words = string.split(splitter);
//     const correctWords = words.filter(function (word) {
//       return word.length > 0;
//     })
//     return correctWords;
//   }
//
//
//   function bionicAlreadyApplied() {
//   	const boldedElements = document.getElementsByTagName('br-bold');
//   	document.body.classList.toggle('br-bold');
//   	if (boldedElements.length) {
//   		return true;
//   	} else {
//   		return false;
//   	}
//   }
//
//   //////////////////////////
//   // RARE WORDS FUNCTIONS //
//   //////////////////////////
//   function wordFreq(string) {
//       const words = textToTokens(string);
//       let freqMap = {};
//       words.forEach(function(w) {
//           if (!freqMap[w]) {
//               freqMap[w] = 0;
//           }
//           freqMap[w] += 1;
//       });
//
//       return freqMap;
//   }
//
//
//   function getRareWords(string, maxFreq, stopwords) {
//     const freqMap = wordFreq(string);
//     const filteredMap = Object.fromEntries(Object.entries(freqMap).filter(([k,v]) => !stopwords.includes(k) && !notToken.includes(k) && !stringContainsNumber(k) && v <= maxFreq));
//
//     return filteredMap;
//   }
//
//
//   //////////
//   // MAIN //
//   //////////
//   if (bionicAlreadyApplied()) {
//   	return;
//   }
//
//   const style = document.createElement('style');
//   style.textContent = `.br-bold br-bold { font-weight: ${opacity * 100} !important; display: inline; line-height: var(--br-line-height,initial); }`;
//   document.head.appendChild(style);
//
//   const string = concatAllText().toLowerCase();
//   const rareWords = getRareWords(string, maxFreqRareWords, stopwords);
//
//   return highlighting(fixation, saccades, opacity, rareWords, rarewordsBehavior, stopwords, stopwordsBehavior);
// }
