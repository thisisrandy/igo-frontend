export function capitalizeFirstLetter(
  [first, ...rest],
  locale = navigator.language
) {
  return [first.toLocaleUpperCase(locale), ...rest].join("");
}

/**
 * Assuming that lines are wrapped at `lineWidth` in the display, break words
 * longer than `lineWidth` at the appropriate points, ignoring language
 * conventions and observing only length, with a dash. This is only perfect
 * given a fixed-width font; any variable-length font's width cannot be reliably
 * measured via character length
 */
export function breakLongWords(text, lineWidth) {
  if (!Number.isInteger(lineWidth) || lineWidth <= 1) {
    console.error(
      `Bad width ${lineWidth} supplied to breakLongWords. Giving up`
    );
    return text;
  }

  const res = [];
  let curWidth = 0;
  for (let word of text.split(/\s+/)) {
    while (word.length > lineWidth) {
      // we are appending a dash, so need at least 2 chars to fill
      if (lineWidth - curWidth > 1) {
        res.push(`${word.slice(0, lineWidth - curWidth - 1)}-`);
        word = word.slice(lineWidth - curWidth - 1);
      }
      curWidth = 0;
    }
    if (lineWidth - curWidth < word.length) {
      curWidth = 0;
    }
    res.push(word);
    curWidth += word.length + 1;
  }

  return res.join(" ");
}
