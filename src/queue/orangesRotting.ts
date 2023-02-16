type Point = {
  x: number;
  y: number;
}

function orangesRotting(vector: number[][]) {
  const rottenQueue: Point[] = [];
  let minutes = 0;
  let freshOranges = 0;

  function couldRotting(x: number, y: number) {
    return (y >= 0 && y < vector.length)
      && (x >= 0 && x < vector[0].length)
      && vector[y][x] === 1;
  }

  function rotten(x: number, y: number) {
    if (couldRotting(x, y)) {
      vector[y][x] = 2;
      rottenQueue.push({x, y});
      freshOranges--;
    }
  }

  function isFreshOrangesEmpty() {
    return !freshOranges;
  }

  // init
  for (let y = 0; y < vector.length; y++) {
    for (let x = 0; x < vector[y].length; x++) {
      if (vector[y][x] === 2) {
        rottenQueue.push({x, y});
      }
      if (vector[y][x] === 1) {
        freshOranges++;
      }
    }
  }

  if (isFreshOrangesEmpty()) {
    return minutes;
  }

  let count = 0;
  let total = rottenQueue.length;
  while(rottenQueue.length) {
    if (count >= total) {
      minutes++;
      count = 0;
      total = rottenQueue.length;
      if (isFreshOrangesEmpty()) {
        return minutes;
      }
    }
    const { x = 0, y = 0 } = rottenQueue.shift() || {};
    rotten(x-1, y);
    rotten(x+1, y);
    rotten(x, y-1);
    rotten(x, y+1);
    count++;
  }

  minutes++;

  if (isFreshOrangesEmpty()) {
    return minutes;
  }

  return -1;
}

console.log(orangesRotting([[2,1,1], [1,1,0], [0,1,1]])); // 4
console.log(orangesRotting([[0,2]])) // 0
console.log(orangesRotting([[1,2]])) // 1
console.log(orangesRotting([[2,2,2,1,1]])) // 2
