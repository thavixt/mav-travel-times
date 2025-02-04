const ONE_RADIAN = 57.295779513082;

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

/**
 * An implementation of the Graham's Scan Convex Hull algorithm in JavaScript.
 * 
 * Rewritten in TypeScript by thavixt on 2025.02.04.
 * 
 * @todo Have some param to set the resulting polygon edge count (?)
 * @link https://github.com/brian3kb/graham_scan_js/blob/master/src/graham_scan.js
 */
export class GrahamScan {
  anchorPoint?: Point = undefined;
  reverse = false;
  points: Point[] = [];

  constructor() { }

  _findPolarAngle = (a: Point, b: Point) => {
    //if the points are undefined, return a zero difference angle.
    if (!a || !b) {
      return 0;
    }

    const deltaX = (b.x - a.x);
    const deltaY = (b.y - a.y);
    if (deltaX == 0 && deltaY == 0) {
      return 0;
    }

    let angle = Math.atan2(deltaY, deltaX) * ONE_RADIAN;
    if (this.reverse) {
      if (angle <= 0) {
        angle += 360;
      }
    } else {
      if (angle >= 0) {
        angle += 360;
      }
    }

    return angle;
  }

  addPoint = (x: number, y: number) => {
    //Check for a new anchor
    const newAnchor =
      (this.anchorPoint === undefined) ||
      (this.anchorPoint.y > y) ||
      (this.anchorPoint.y === y && this.anchorPoint.x > x);

    if (newAnchor) {
      if (this.anchorPoint !== undefined) {
        this.points.push(new Point(this.anchorPoint.x, this.anchorPoint.y));
      }
      this.anchorPoint = new Point(x, y);
    } else {
      this.points.push(new Point(x, y));
    }
  }

  _sortPoints = () => {
    return this.points.sort((a, b) => {
      if (!this.anchorPoint) {
        throw new Error('anchorPoint not present yet');
      }

      const polarA = this._findPolarAngle(this.anchorPoint, a);
      const polarB = this._findPolarAngle(this.anchorPoint, b);
      if (polarA < polarB) {
        return -1;
      }
      if (polarA > polarB) {
        return 1;
      }

      return 0;
    });
  }

  _checkPoints = (p0: Point, p1: Point, p2: Point) => {
    let difAngle = 0;
    const cwAngle = this._findPolarAngle(p0, p1);
    const ccwAngle = this._findPolarAngle(p0, p2);

    if (cwAngle > ccwAngle) {
      difAngle = cwAngle - ccwAngle;
      return !(difAngle > 180);
    } else if (cwAngle < ccwAngle) {
      difAngle = ccwAngle - cwAngle;
      return (difAngle > 180);
    }

    return true;
  }

  getHull = () => {
    if (!this.anchorPoint) {
      return;
    }

    let hullPoints = [],
      points,
      pointsLength;

    this.reverse = this.points.every(function (point) {
      return (point.x < 0 && point.y < 0);
    });

    points = this._sortPoints();
    pointsLength = points.length;

    //If there are less than 3 points, joining these points creates a correct hull.
    if (pointsLength < 3) {
      points.unshift(this.anchorPoint);
      return points;
    }

    //move first two points to output array
    hullPoints.push(points.shift(), points.shift());

    //scan is repeated until no concave points are present.
    while (true) {
      hullPoints.push(points.shift());
      const p0 = hullPoints[hullPoints.length - 3]!;
      const p1 = hullPoints[hullPoints.length - 2]!;
      const p2 = hullPoints[hullPoints.length - 1]!;

      if (this._checkPoints(p0, p1, p2)) {
        hullPoints.splice(hullPoints.length - 2, 1);
      }

      if (points.length == 0) {
        if (pointsLength == hullPoints.length) {
          //check for duplicate anchorPoint edge-case, if not found, add the anchorpoint as the first item.
          const ap = this.anchorPoint;
          //remove any undefined elements in the hullPoints array.
          hullPoints = hullPoints.filter(function (p) { return !!p; });
          if (!hullPoints.some(function (p) {
            return (p.x == ap.x && p.y == ap.y);
          })) {
            hullPoints.unshift(this.anchorPoint);
          }
          return hullPoints;
        }
        points = hullPoints;
        pointsLength = points.length;
        hullPoints = [];
        hullPoints.push(points.shift(), points.shift());
      }
    }
  }
}

