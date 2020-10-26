const fileElem = document.querySelector('input');
let arr = [];
let field = [];
let canDraw = false;

fileElem.addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    arr = reader.result.split('\n').map(item => item.split(' '));
    arr.forEach(item => {
      switch(item[0]) {
        case 'C':
          createCanvas(item);
          break;
        case 'L':
          drawLine(item);
          break;
        case 'R':
          drawRect(item);
          break;
        case 'B':
          bucketFill(item);
          break;
        default:
          canDraw = false;
      }
    });
    for(let i = 0; i < field.length; i++) {
      for(let j = 0; j < field[i].length; j++) {
        if(!field[i][j]) {
          field[i][j] = ' ';
        }
      }
    }
    const toString = field.map(item => item.join(''));
    const output = toString.join('\n');
    console.log(output)
    document.body.insertAdjacentHTML('beforeend', `<a href = 'data:text/plain;charset=utf-8,%EF%BB%BF${encodeURIComponent(output)}' download = 'output.txt'>output.txt</a>`);
  };
});

function createCanvas(canvas) {
  if(canvas.length < 1) {
    canDraw = false;
  } else {
    canDraw = true;
    const w = +canvas[1];
    const h = +canvas[2];
    for(let i = 0; i < h + 2; i++) {
      field.push(new Array(w + 2));
    }
    field[0].fill('-');
    field[field.length - 1].fill('-');
    for(let i = 1; i < field.length - 1; i++) {
      field[i].splice(0, 1, '|');
      field[i].splice(field[i].length - 1, 1, '|');
    }
  }
}

function drawLine(line) {
  const x1 = +line[1];
  const y1 = +line[2];
  const x2 = +line[3];
  const y2 = +line[4];
  if(x1 === x2) {
    let i = y1;
    while(i <= y2) {
      field[i].splice(x1, 1, 'x');
      i++;
    }
  } else {
    const diff = x2 - x1 + 1;
    field[y1].splice(x1, diff, ...'x'.repeat(diff).split(''));
  }
}

function drawRect(rect) {
  console.log(rect);
  const x1 = +rect[1];
  const y1 = +rect[2];
  const x2 = +rect[3];
  const y2 = +rect[4];
  let i = y1;
  let j = x1;
  while(i <= y2) {
    field[i].splice(x1, 1, 'x');
    field[i].splice(x2, 1, 'x');
    i++;
  }
  const diff = x2 - x1 + 1;
  field[y1].splice(x1, diff, ...'x'.repeat(diff).split(''));
  field[y2].splice(x1, diff, ...'x'.repeat(diff).split(''));
}

function bucketFill(bucket) {

}
