
/**
 * shamelessly borrowed from Wayin Inc - thanks Greg!  
 * Supports dd MM, MMM, MMMM, YY, YYYY, hh, HH, mm, ss, aa as it is described in Java simple date format
 */

module.exports = function formatDate (d, pattern) {
  function subsPattern(pattern, regex, value, addZeroes) {
      if (pattern.match(regex)) {
          if (addZeroes) {
              value = value<10 ? '0'+value: value;
          }
          return pattern.replace(regex, value );
      }
      return pattern;
  }
  var monthShort=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthFull=['January', 'February', 'March', 'April','May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  if (!d || !pattern) {
      return '';
  }
  pattern = subsPattern(pattern, /MMMM/g, monthFull[d.getMonth()]);
  pattern = subsPattern(pattern, /MMM/g, monthShort[d.getMonth()]);
  pattern = subsPattern(pattern, /MM/g, d.getMonth()+1, true);
  pattern = subsPattern(pattern, /yyyy/i,  d.getFullYear());
  pattern = subsPattern(pattern, /yy/i, (''+d.getFullYear()).substr(2));
  pattern = subsPattern(pattern, /dd/g, d.getDate(), true);
  pattern = subsPattern(pattern, /hh/g, (d.getHours() % 12) || 12);
  pattern = subsPattern(pattern, /HH/g, d.getHours());
  pattern = subsPattern(pattern, /mm/g, d.getMinutes(), true);
  pattern = subsPattern(pattern, /ss/g, d.getSeconds(), true);
  pattern = subsPattern(pattern, /aa/g, d.getHours() >11 ? 'p.m.' : 'a.m.');

  return pattern;
};
