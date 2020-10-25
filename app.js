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
        case 'L':
          drawLine(item);
        case 'R':
          drawRect(item);
        case 'B':
          bucketFill(item);
        default:
          canDraw = false;
      }
    });
    console.log(arr);
  };
});

function createCanvas(canvas) {
  if(canvas.length < 1) {
    canDraw = false;
  } else {
    canDraw = true;
    const w = +canvas[0][1];
    const h = +canvas[0][2];
    for(let i = 0; i < h + 2; i++) {
      field.push(new Array(w + 2));
    }
    const upperBorder = '-'.repeat(w + 2);
    field[0] = upperBorder;
    field[field.length - 1] = upperBorder;
    for(let i = 1; i < field.length - 1; i++) {
      field[i].splice(0, 1, '|');
      field[i].splice(field[i].length - 1, 1, '|');
    }
  }
  const output = field.join('\n');
  document.body.insertAdjacentHTML('beforeend', `<a href = 'data:text/plain;charset=utf-8,%EF%BB%BF${encodeURIComponent(output)}' download = 'output.txt'>output.txt</a>`);
};

function drawLine(line) {

};

function drawRect(rect) {

};

function bucketFill(bucket) {

};
