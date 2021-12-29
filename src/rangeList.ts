/**
 * A Range is an array of 2 numbers
 */
type Range = [number, number];

/**
 * This class is used to aggregate ranges.  A range consists of pair of integers which define a range,
 * for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
 */
export class RangeList {
  ranges: Range[] = [];

  /**
   * Adds a range to the list
   * @param {Range} range - Array of two integers that specify beginning and end of range.
   */
  add(range: Range) {
    if (
      !range ||
      !Array.isArray(range) ||
      range[0] >= range[1] ||
      range.length != 2
    ) {
      console.info(`Invalid range ignored: ${range}`);
    } else {
      let merged = false;
      for (let i = 0; i < this.ranges.length; i++) {
        if (range[0] <= this.ranges[i][1] && range[1] >= this.ranges[i][0]) {
          merged = true;
          let mergedRange: Range = [
            Math.min(range[0], this.ranges[i][0]),
            Math.max(range[1], this.ranges[i][1]),
          ];
          this.ranges[i] = mergedRange;

          while (i < this.ranges.length - 1) {
            if (
              mergedRange[0] <= this.ranges[i + 1][1] &&
              mergedRange[1] >= this.ranges[i + 1][0]
            ) {
              mergedRange[1] = Math.max(mergedRange[1], this.ranges[i + 1][1]); // only need to extend the end
              this.ranges.splice(i + 1, 1);
            } else {
              break;
            }
          }
        }
      }
      if (!merged) {
        this.ranges.push(range);
        this.ranges.sort((r1, r2) => r1[0] - r2[0]);
      }
    }
  }

  /**
   * Removes a range from the list
   * @param {Range} range - Array of two integers that specify beginning and end of range.
   */
  remove(range: Range) {
    if (range[0] >= range[1]) {
      console.info(`Invalid range ignored: ${range}`);
    } else {
      let i = 0;
      while (i < this.ranges.length) {
        if (range[0] <= this.ranges[i][1] && range[1] >= this.ranges[i][0]) {
          if (range[0] <= this.ranges[i][0]) {
            if (range[1] >= this.ranges[i][1]) {
              this.ranges.splice(i, 1);
              continue;
            } else {
              this.ranges[i][0] = range[1];
            }
          } else {
            let savedRange = this.ranges[i].map((x) => x);
            this.ranges[i][1] = range[0];
            if (range[1] < savedRange[1]) {
              this.ranges.splice(i + 1, 0, [range[1], savedRange[1]]);
              break;
            }
          }
        }
        i++;
      }
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print(): string {
    return this.ranges.length === 0
      ? ""
      : "[" + this.ranges.map((r) => r[0] + ", " + r[1]).join(") [") + ")";
  }
}
