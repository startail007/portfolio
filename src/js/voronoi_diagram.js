let setShadow = (ctx, offsetX, offsetY, blur, color) => {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;
};
let clearShadow = (ctx) => {
  setShadow(ctx, 0, 0, 0, "rgba(0, 0, 0, 0)");
};
let drawText = (ctx, s, font, x, y) => {
  ctx.font = font;
  //let ssInfo = ctx.measureText(ss);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
};
let getLinearP = (pos, vector) => {
  return [vector[1], -vector[0], -pos[0] * vector[1] + pos[1] * vector[0]];
};
let intersection = (linearP0, linearP1) => {
  let d = linearP0[0] * linearP1[1] - linearP1[0] * linearP0[1];
  if (d === 0) {
    return;
  }
  let x = (linearP1[2] * linearP0[1] - linearP0[2] * linearP1[1]) / d;
  let y = (linearP0[2] * linearP1[0] - linearP1[2] * linearP0[0]) / d;
  return [x, y];
};

let getCircumcentre = (pos0, pos1, pos2) => {
  let c = getCenter(pos0, pos1);
  let v = getNormal(pos0, pos1);
  let lp0 = getLinearP(c, v);
  c = getCenter(pos1, pos2);
  v = getNormal(pos1, pos2);
  let lp1 = getLinearP(c, v);
  return intersection(lp0, lp1);
};

let getDistance = (pos0, pos1) => {
  return getVectorLength(getVector(pos0, pos1));
};
let getNormal = (pos0, pos1) => {
  return [-(pos1[1] - pos0[1]), pos1[0] - pos0[0]];
};
let pushVector = (pos, vector) => {
  return [pos[0] + vector[0], pos[1] + vector[1]];
};
let getVector = (pos0, pos1) => {
  return [pos1[0] - pos0[0], pos1[1] - pos0[1]];
};
let getVectorLength = (vector) => {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
};
let getCenter = (pos0, pos1) => {
  return [(pos1[0] + pos0[0]) * 0.5, (pos1[1] + pos0[1]) * 0.5];
};
let cross = (pos0, pos1, pos2) => {
  return (pos0[0] - pos1[0]) * (pos2[1] - pos1[1]) - (pos2[0] - pos1[0]) * (pos0[1] - pos1[1]);
};

let turnVector = (vector) => {
  let temp = vector[0];
  vector[0] = -vector[1];
  vector[1] = temp;
  return vector;
};
let reverseVector = (vector) => {
  vector[0] *= -1;
  vector[1] *= -1;
  return vector;
};
let scaleVector = (vector, scale) => {
  vector[0] *= scale;
  vector[1] *= scale;
  return vector;
};
let normalize = (vector) => {
  return scaleVector(vector, 1 / getVectorLength(vector));
};
let edgeInside = (pos, bound) => {
  return pos[0] >= bound.l && pos[0] <= bound.r && pos[1] >= bound.t && pos[1] <= bound.b;
};
let edgeIntersection = (pos, vector, bound) => {
  let num;
  if (vector[1] < 0) {
    if (pos[1] >= bound.t) {
      num = pos[0] + (vector[0] * (bound.t - pos[1])) / vector[1];
      if (num >= bound.l && num <= bound.r) {
        return { pos: [num, bound.t], type: 0 };
      }
    }
  } else if (vector[1] > 0) {
    if (pos[1] <= bound.b) {
      num = pos[0] + (vector[0] * (bound.b - pos[1])) / vector[1];
      if (num >= bound.l && num <= bound.r) {
        return { pos: [num, bound.b], type: 2 };
      }
    }
  }
  if (vector[0] < 0) {
    if (pos[0] >= bound.l) {
      num = pos[1] + (vector[1] * (bound.l - pos[0])) / vector[0];
      if (num >= bound.t && num <= bound.b) {
        return { pos: [bound.l, num], type: 3 };
      }
    }
  } else if (vector[0] > 0) {
    if (pos[0] <= bound.r) {
      num = pos[1] + (vector[1] * (bound.r - pos[0])) / vector[0];
      if (num >= bound.t && num <= bound.b) {
        return { pos: [bound.r, num], type: 1 };
      }
    }
  }
};

let aabbHit = (rect0, rect1) => {
  return (
    rect0.getL() <= rect1.getR() &&
    rect0.getR() >= rect1.getL() &&
    rect0.getT() <= rect1.getB() &&
    rect0.getB() >= rect1.getT()
  );
};

let lineToRect = (pos0, pos1) => {
  let xMin, xMax, yMin, yMax, bool;
  bool = pos0[0] < pos1[0];
  xMin = bool ? pos0[0] : pos1[0];
  xMax = bool ? pos1[0] : pos0[0];
  bool = pos0[1] < pos1[1];
  yMin = bool ? pos0[1] : pos1[1];
  yMax = bool ? pos1[1] : pos0[1];
  return new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
};

class Bound {
  constructor(l, t, r, b) {
    this.l = l;
    this.t = t;
    this.r = r;
    this.b = b;
  }
}
class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  getLT() {
    return [this.x, this.y];
  }
  getLB() {
    return [this.x, this.y + this.height];
  }
  getRT() {
    return [this.x + this.width, this.y];
  }
  getRB() {
    return [this.x + this.width, this.y + this.height];
  }
  getT() {
    return this.y;
  }
  getB() {
    return this.y + this.height;
  }
  getL() {
    return this.x;
  }
  getR() {
    return this.x + this.width;
  }
  toBound() {
    return new Bound(this.getL(), this.getT(), this.getR(), this.getB());
  }
}

let getT = (pos0, vector0, pos1, vector1) => {
  let d = vector0[0] * vector1[1] - vector0[1] * vector1[0];
  if (d === 0) {
    return;
  }
  let v2 = getVector(pos0, pos1);
  return {
    t0: (vector1[1] * v2[0] - vector1[0] * v2[1]) / d,
    t1: (vector0[1] * v2[0] - vector0[0] * v2[1]) / d,
  };
};
let getPos = (pos, vector, t) => {
  return pushVector(pos, scaleVector(vector, t));
};
let getRad = (pos0, pos1) => {
  return Math.atan2(pos1[1] - pos0[1], pos1[0] - pos0[0]);
};
let toPosRate = (p0, p1, rate) => {
  return [p0[0] * (1 - rate) + p1[0] * rate, p0[1] * (1 - rate) + p1[1] * rate];
};

//功能組
let getTriangleData = (posList, i0, i1, i2) => {
  let circumcentre = getCircumcentre(posList[i0], posList[i1], posList[i2]);
  if (circumcentre) {
    return {
      points: [i0, i1, i2],
      circumcentre: circumcentre,
      radius: getDistance(circumcentre, posList[i0]),
      bool: true,
    };
  }
};

let findIndexSame = (polygonPosList, point, startIndex) => {
  return polygonPosList.findIndex((el, index) => {
    return index >= startIndex && el.p[0] === point[0] && el.p[1] === point[1];
  });
};
let polygonPosListCorrespond = (polygonPosListData, newPolygonPosList, newPointsIndex) => {
  if (polygonPosListData.correspond === undefined) {
    polygonPosListData.correspond = newPolygonPosList.length;
    newPolygonPosList.push(polygonPosListData.p);
  }
  newPointsIndex.push(polygonPosListData.correspond);
};
let pushPolygonPos = (polygonPosList, index, point, newPolygonPosList, newPointsIndex) => {
  let findIndex = findIndexSame(polygonPosList, point, index);
  if (findIndex === -1) {
    polygonPosList.push({ p: point, b: true, correspond: newPolygonPosList.length });
    newPointsIndex.push(newPolygonPosList.length);
    newPolygonPosList.push(point);
  } else {
    newPointsIndex.push(polygonPosList[findIndex].correspond);
  }
};
let triangulationCreate = (posList) => {
  let triangleList = []; //主要儲存三角形
  let triangleList01 = []; //分散已不會計算到的三角型
  let shell = []; //記錄外圍線 索引號與固定某點在外圍線的外圈的布林
  let shapeBool = false; //紀錄是否有成形
  let i, j, k, len;

  let posList01 = posList.map((el, i) => i);
  posList01.sort((a, b) => posList[a][0] - posList[b][0] || posList[a][1] - posList[b][1]);
  //將位置點用索引紀錄並排序由左至右 由上至下 這樣在每計算新位置點時 大部分都會是跟外圍做計算

  let pos0, startIndex, endIndex, i0, i1, list, items;
  let prevPos;
  for (k = 0; k < posList01.length; k++) {
    pos0 = posList[posList01[k]];
    //將目前要計算的位置點先存放於變數

    if (prevPos) {
      if (prevPos[0] === pos0[0] && prevPos[1] === pos0[1]) {
        continue;
      }
    }
    prevPos = pos0;
    //判斷是否有相同的位置點

    if (shapeBool) {
      items = [];
      //紀錄需重新連接的位置點清空

      for (i = 0, len = shell.length; i < len; i++) {
        i0 = shell[i].i;
        i1 = shell[(i + 1) % len].i;
        if (cross(pos0, posList[i0], posList[i1]) > 0) {
          if (items.indexOf(i0) == -1) {
            items.push(i0);
          }
          if (items.indexOf(i1) == -1) {
            items.push(i1);
          }
          shell[i].b = true;
        } else {
          shell[i].b = false;
        }
      }
      //計算會與外圍需要連接的點 並記錄下來 並記錄界線

      //console.log(posList01[k], items);

      startIndex = shell.findIndex((el, i, array) => {
        return !el.b && array[(i + 1) % array.length].b;
      });
      //搜尋出 shell中 false true 的位置 為開頭

      endIndex = shell.findIndex((el, i, array) => {
        return el.b && !array[(i + 1) % array.length].b;
      });
      //搜尋出 shell中 true false 的位置 為結尾

      startIndex = (startIndex + 1) % shell.length;
      endIndex = (endIndex + 1) % shell.length;
      //添加一格轉讓紀錄線改變成點
      //假設紀錄線 0:(0-1)false 1:(1-2)true 2:(2-3)true 3:(3-0)false
      //抓到startIndex false true 就是 0 抓到endIndex true false 就是 2
      //所以startIndex 和 endIndex 是 0~2
      //有沾到邊的是(1-2)(2-3) 所以有用到的點1 2 3
      //通過加1 改成1~3

      if (startIndex <= endIndex) {
        shell.splice(startIndex + 1, endIndex - startIndex - 1, { i: posList01[k], b: false });
        //假設上面1 2 3點都用到 末端的點不必被砍掉 要替換的位置是從2這個位置開始 所以加1
        //假設1 2 3 4 5 保留末端1 5 要砍掉 2 3 4 就是 (5 - 1)-1 等於三個
      } else {
        shell.splice(startIndex + 1, shell.length - startIndex - 1, { i: posList01[k], b: false });
        shell.splice(0, endIndex);
        //抓到的endIndex 比較小 就先砍後面的再砍前面的
        startIndex -= endIndex;
      }

      triangleList.forEach((el) => {
        if (el.bool) {
          if (pos0[0] > el.circumcentre[0] + el.radius) {
            el.bool = false;
            triangleList01.push(el);
          }
        }
      });
      //因為是從左邊往右邊執行 所以如果超過三角形的外心圓 就會先屏除減少計算

      triangleList = triangleList.filter((el) => {
        if (!el.bool) {
          return false;
        }
        if (Math.abs(pos0[1] - el.circumcentre[1]) > el.radius) {
          return true;
        }
        if (getDistance(pos0, el.circumcentre) <= el.radius) {
          el.points.forEach((pointIndex) => {
            if (items.indexOf(pointIndex) == -1) {
              items.push(pointIndex);
            }
          });
          return false;
        }
        return true;
      });
      //如果位置點在三角形的外心圓內 記錄住並刪除

      list = [];
      for (i = 0, len = items.length; i < len; i++) {
        list.push({ i: items[i], a: getRad(pos0, posList[items[i]]), b: shell[startIndex].i !== items[i] });
      }
      list.sort((a, b) => a.a - b.a);
      //將記錄住需重新連接的點依照角度按順序排列 以及紀錄避開開頭位置

      list.forEach((el, i, array) => {
        if (el.b) {
          i1 = array[(i + 1) % array.length].i;
          triangleList.push(getTriangleData(posList, posList01[k], el.i, i1));
        }
      });
      //將排列好的點依序兩個點連接中心生成三角形
    } else {
      if (k < 2 || cross(pos0, posList[posList01[0]], posList[posList01[1]]) === 0) {
        shell.push({ i: posList01[k], b: false });
      } else {
        shapeBool = true;

        list = [];
        for (i = 0, len = shell.length; i < len; i++) {
          list.push({ i: i, a: getRad(pos0, posList[shell[i].i]) });
        }
        list.sort((a, b) => a.a - b.a);
        //將記錄住需重新連接的點依照角度按順序排列

        shell = list.map((el) => shell[el.i]);
        //將shell的順序重新設定

        list.forEach((el, i, array) => {
          i1 = array[(i + 1) % array.length].i;
          if (cross(pos0, posList[posList01[el.i]], posList[posList01[i1]]) < 0) {
            triangleList.push(getTriangleData(posList, posList01[k], posList01[el.i], posList01[i1]));
          } else {
            shell.splice(i + 1, 0, { i: posList01[k], b: false });
          }
        });
        //將排列好的點依序兩個點連接中心生成三角形
      }
    }
  }
  if (!shapeBool && shell.length > 2) {
    i0 = shell[0].i;
    i1 = shell[1].i;
    let lp = getLinearP(posList[i0], getNormal(posList[i0], posList[i1]));
    list = [];
    let item;
    for (i = 0, len = shell.length; i < len; i++) {
      item = posList[shell[i].i];
      list.push({ i: i, aaa: item[0] * lp[0] + item[1] * lp[1] + lp[2] });
    }
    list.sort((a, b) => a.aaa - b.aaa);
    shell = list.map((el) => shell[el.i]);
  }
  //將無法成形的位置點 重新按順序排列

  triangleList = triangleList.concat(triangleList01);
  shell = shell.map((el) => el.i);
  return { triangleList: triangleList, shell: shell };
};

let voronoiCreate = (posList, triangleList, shell, mainRect) => {
  if (posList.length <= 0) {
    return [];
  }
  let borderPos = [mainRect.getLT(), mainRect.getRT(), mainRect.getRB(), mainRect.getLB()];
  if (posList.length <= 1) {
    return [borderPos];
  }
  let mainBound;
  if (mainRect) {
    mainBound = mainRect.toBound();
  }
  let polygonList = [];
  let polygonPosList = [];
  let i, j, k, len;

  for (k = 0; k < posList.length; k++) {
    polygonList[k] = { points: [], unclose: false, r: 0 };
  }
  let i0, i1, p, xx, yy, r, v, pp, pos0, list, start, triangleIndex;
  let countIndex = 0;
  let shapeBool = triangleList.length !== 0;

  for (i = 0, len = shell.length - (shapeBool ? 0 : 1); i < len; i++) {
    i0 = shell[i];
    i1 = shell[(i + 1) % shell.length];
    if (shapeBool) {
      triangleIndex = triangleList.findIndex((el) => {
        return (
          (i0 === el.points[0] && i1 === el.points[1]) ||
          (i0 === el.points[1] && i1 === el.points[2]) ||
          (i0 === el.points[2] && i1 === el.points[0])
        );
      });
      p = triangleList[triangleIndex].circumcentre;
      //找出三角形
    } else {
      p = getCenter(posList[i0], posList[i1]);
    }
    if (mainRect) {
      xx = Math.abs(p[0] - mainBound.l) > Math.abs(p[0] - mainBound.r) ? mainBound.l : mainBound.r;
      yy = Math.abs(p[1] - mainBound.t) > Math.abs(p[1] - mainBound.b) ? mainBound.t : mainBound.b;
      //裁切矩形的四個邊點 最遠的點

      v = getNormal(posList[i1], posList[i0]);
      scaleVector(v, getDistance(p, [xx, yy]) / getVectorLength(v));
    } else {
      v = getNormal(posList[i1], posList[i0]);
    }

    pp = pushVector(p, v);
    polygonPosList.push({ p: pp, b: false });
    polygonList[i0].unclose = true;
    polygonList[i0].points.push({ i: countIndex, start: true });
    polygonList[i1].points.push({ i: countIndex, start: false });
    countIndex++;
    //記錄住開口的位置點

    if (!shapeBool) {
      reverseVector(v);
      pp = pushVector(p, v);
      polygonPosList.push({ p: pp, b: false });
      polygonList[i1].unclose = true;
      polygonList[i0].points.push({ i: countIndex, start: false });
      polygonList[i1].points.push({ i: countIndex, start: true });
      countIndex++;
    }
    //因為沒成形 所以記錄另一邊開口的位置點
  }

  triangleList.forEach((el) => {
    polygonPosList.push({ p: el.circumcentre, b: mainRect ? edgeInside(el.circumcentre, mainBound) : false });
    el.points.forEach((pointIndex) => {
      if (el.radius > polygonList[pointIndex].r) {
        polygonList[pointIndex].r = el.radius;
      }
      polygonList[pointIndex].points.push({ i: countIndex, start: false });
    });
    countIndex++;
  });
  //將外心點依照編號放入形狀陣列

  for (k = 0; k < posList.length; k++) {
    if (polygonList[k].points.length) {
      pos0 = posList[k];
      list = polygonList[k].points.map((el, i) => {
        return { i: i, a: getRad(pos0, polygonPosList[el.i].p) };
      });
      list.sort((a, b) => a.a - b.a);
      //將陣列裡的點依照角度排序圍成一個幾何

      if (polygonList[k].unclose) {
        start = list.findIndex((el) => polygonList[k].points[el.i].start);
        //尋找開頭
        polygonList[k].points = list.map((el, i, array) => polygonList[k].points[array[(i + start) % array.length].i]);
        //依開頭按順序排列
      } else {
        polygonList[k].points = list.map((el, i, array) => polygonList[k].points[el.i]);
      }
    }
  }
  if (!mainRect) {
    return polygonList.map((polygon) => polygon.points.map((el) => polygonPosList[el.i].p));
  }

  let polygonListShow = [];
  let borderPosI, polygon, uncloseBool, pos1, pos2;
  let len0 = polygonPosList.length;
  let polygonIndexList0 = [];
  let polygonPosList0 = [];
  //矩形裁切
  for (k = 0; k < polygonList.length; k++) {
    let pointsIndex = [];
    if (polygonList[k].points.length) {
      if (
        !polygonList[k].unclose &&
        posList[k][0] - polygonList[k].r >= mainBound.l &&
        posList[k][0] + polygonList[k].r <= mainBound.r &&
        posList[k][1] - polygonList[k].r >= mainBound.t &&
        posList[k][1] + polygonList[k].r <= mainBound.b
      ) {
        polygonList[k].points.forEach((el) => {
          polygonPosListCorrespond(polygonPosList[el.i], polygonPosList0, pointsIndex);
        });
        //如果沒有超過裁切矩形 就直接設定
      } else {
        borderPosI = [];
        for (i = 0; i < 4; i++) {
          borderPosI[i] = [];
        }
        polygon = polygonList[k].points;
        uncloseBool = polygonList[k].unclose;
        start = -1;
        for (i = 0, len = polygon.length - (uncloseBool ? 1 : 0); i < len; i++) {
          pos1 = polygonPosList[polygon[i].i];
          pos2 = polygonPosList[polygon[(i + 1) % polygon.length].i];
          if (!pos1.b || !pos2.b) {
            if (aabbHit(lineToRect(pos1.p, pos2.p), mainRect)) {
              v = getVector(pos1.p, pos2.p);
              if (!pos2.b) {
                pp = edgeIntersection(pos1.p, v, mainBound);
                if (pp) {
                  if (start === -1) {
                    start = pp.type;
                  }
                  borderPosI[pp.type].unshift({ p: pp.pos, i: i + 1 });
                }
              }
              if (!pos1.b) {
                pp = edgeIntersection(pos2.p, reverseVector(v), mainBound);
                if (pp) {
                  borderPosI[pp.type].push({ p: pp.pos, i: i + 1 });
                }
              }
            }
          }
        }

        //將polygon中每條線與裁切矩形四個邊線的交點與索引號記錄下來
        if (start !== -1) {
          let polygonActive = true; //polygon活動
          let data, index;

          for (i = 0; i < 5; i++) {
            index = (i + start) % 4;
            if (borderPosI[index].length === 0) {
              if (!polygonActive) {
                pushPolygonPos(polygonPosList, len0, borderPos[index], polygonPosList0, pointsIndex);
              }
            } else {
              if (!polygonActive) {
                pushPolygonPos(polygonPosList, len0, borderPos[index], polygonPosList0, pointsIndex);
              } else if (i !== 0) {
                if (data && data.i !== borderPosI[index][0].i) {
                  len = borderPosI[index][0].i + (!uncloseBool && borderPosI[index][0].i < data.i ? polygon.length : 0);
                  for (j = data.i; j < len; j++) {
                    i0 = polygon[j % polygon.length].i;
                    polygonPosListCorrespond(polygonPosList[i0], polygonPosList0, pointsIndex);
                  }
                }
              }

              if (i !== 4) {
                data = borderPosI[index][0];
                pushPolygonPos(polygonPosList, len0, data.p, polygonPosList0, pointsIndex);

                if (borderPosI[index].length === 2) {
                  data = borderPosI[index][1];
                  pushPolygonPos(polygonPosList, len0, data.p, polygonPosList0, pointsIndex);
                } else {
                  polygonActive = !polygonActive;
                }
              }
            }
          }
          //將polygon與裁切矩形 交集處抓取出來
        } else {
          let bool = polygon.some((el) => polygonPosList[el.i].b);
          if (!bool) {
            let lp;
            let bool0 = true;

            for (i = 0, len = polygon.length - (uncloseBool ? 1 : 0); i < len; i++) {
              i0 = polygon[i].i;
              i1 = polygon[(i + 1) % polygon.length].i;
              lp = getLinearP(polygonPosList[i0].p, getVector(polygonPosList[i0].p, polygonPosList[i1].p));
              if (borderPos[0][0] * lp[0] + borderPos[0][1] * lp[1] + lp[2] > 0) {
                bool0 = false;
                break;
              }
            }
            if (bool0) {
              borderPos.forEach((el) => {
                pushPolygonPos(polygonPosList, len0, el, polygonPosList0, pointsIndex);
              });
            }
            //判斷裁切矩形的四個點其中一點是否有在polygon的範圍內 就將矩形加入
          } else if (!uncloseBool) {
            polygon.forEach((el) => {
              polygonPosListCorrespond(polygonPosList[el.i], polygonPosList0, pointsIndex);
            });
          }
        }
      }
    }
    polygonIndexList0[k] = pointsIndex;
    polygonListShow[k] = pointsIndex.map((value) => {
      return polygonPosList0[value];
    });
  }
  return {
    polygonListShow,
    polygonIndexList: polygonIndexList0,
    polygonPosList: polygonPosList0,
  };
};

export { setShadow, clearShadow, Rect, pushVector, getDistance, toPosRate, triangulationCreate, voronoiCreate };
