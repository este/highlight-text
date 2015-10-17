import escape from 'lodash.escape';
import mergeRanges from 'merge-ranges';
import {remove} from 'diacritics';

function allIndexesOf(str, word) {
  const indexes = [];
  for (let idx = str.indexOf(word); idx !== -1; idx = str.indexOf(word, idx + 1)) {
    indexes.push(idx);
  }
  return indexes;
}

export default function highlightText(text, highlight, tag = 'b') {
  const escapedText = escape(text);
  const normalizedText = remove(escapedText).toLowerCase();
  const highlightIntervals = escape(highlight)
    .split(/(\s+)/)
    .map(word => word.trim())
    .filter(word => word)
    .reduce((intervals, word) => {
      const normalizedWord = remove(word).toLowerCase();
      const wordIntervals = allIndexesOf(normalizedText, normalizedWord)
        .map(idx => [idx, idx + normalizedWord.length]);
      return intervals.concat(wordIntervals);
    }, []);

  return mergeRanges(highlightIntervals)
    .reduceRight((reducedText, [start, end]) => {
      return reducedText
        .slice(0, start) + `<${tag}>` + reducedText
        .slice(start, end) + `</${tag}>` + reducedText
        .slice(end);
    }, escapedText);
}
