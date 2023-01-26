const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const widthCanvas = canvas.clientWidth;
const heightCanvas = canvas.clientHeight;

let snake = [
  [250, 250],
  [235, 250],
  [220, 250],
  [205, 250],
  [190, 250],
  [175, 250],
  [160, 250],
  [145, 250],
  [130, 250],
];

let arr = [];
arr = Array.from({ length: 3 }).map((i, index) =>
  index === 0 ? [250, 250] : [12, 12]
);
console.log(arr);
console.log(snake);

function snakeDraw(arr) {
  arr.forEach((i) => {
    ctx.fillStyle = "black";
    ctx.fillRect(i[0], i[1], 10, 10);
  });
}

const move = {
  up: {
    flag: true,
    key: "ArrowUp",
    noMotion: "ArrowDown",
    action() {
      let lastElement = snake.pop();
      lastElement[0] = snake[0][0];
      lastElement[1] = snake[0][1] - 10;
      snake.unshift(lastElement);
    },
  },
  down: {
    flag: true,
    key: "ArrowDown",
    noMotion: "ArrowUp",
    action() {
      let lastElement = snake.pop();
      lastElement[0] = snake[0][0];
      lastElement[1] = snake[0][1] + 10;
      snake.unshift(lastElement);
    },
  },
  right: {
    flag: true,
    key: "ArrowRight",
    noMotion: "ArrowLeft",
    action() {
      let lastElement = snake.pop();
      lastElement[0] = snake[0][0] + 10;
      lastElement[1] = snake[0][1];
      snake.unshift(lastElement);
    },
  },
  left: {
    flag: true,
    key: "ArrowLeft",
    noMotion: "ArrowRight",
    action() {
      let lastElement = snake.pop();
      lastElement[0] = snake[0][0] - 10;
      lastElement[1] = snake[0][1];
      snake.unshift(lastElement);
    },
  },
};

function motionSnake(startValueKey, valueKey, timer) {
  document.addEventListener("keydown", (e) => {
    startValueKey = e.key;
    valueKey = Object.values(move).filter((i) => i.key === e.key)[0];
    if (valueKey.flag && !timer) {
      Object.values(move).map((i) =>
        i.key === e.key || i.noMotion === e.key
          ? (i.flag = false)
          : (i.flag = true)
      );
      let motionInterval = setInterval(
        (value) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          value.action();
          eatFood();
          snakeDraw(snake);
          if (value.flag || gameOver()) {
            clearInterval(motionInterval);
          }
        },
        100,
        valueKey
      );
      timer = setTimeout(() => (timer = clearTimeout(timer)), 100);
    } else {
      startValueKey = valueKey.key;
    }
  });
}

function gameOver() {
  if (
    snake[0][0] + 10 > widthCanvas ||
    snake[0][0] < 0 ||
    snake[0][1] + 10 > heightCanvas ||
    snake[0][1] < 0
  ) {
    reset();
    alert("Game over");
    return true;
  }
}

function reset() {
  snake = [
    [250, 250],
    [235, 250],
    [220, 250],
    [205, 250],
    [190, 250],
    [175, 250],
    [160, 250],
    [145, 250],
    [130, 250],
  ];
  snake[0][0] = widthCanvas * 0.5;
  snake[0][1] = heightCanvas * 0.5;

  Object.values(move).map((i) => (i.flag = true));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snakeDraw(snake);
}

const foodSnake = {
  x: food(500, 0),
  y: food(500, 0),
  width: 10,
  height: 10,
  draw() {
    const { x, y, width, height } = this;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width, height);
  },
};
function food(max, min) {
  return (
    Math.round(Math.random() * (max - min) + min)
      .toString()
      .slice(0, -1) * 10
  );
}

function eatFood() {
  if (snake[0][0] === foodSnake.x && snake[0][1] === foodSnake.y) {
    ctx.clearRect(foodSnake.x, foodSnake.y, 10, 10);
    snake.push([]);
    console.log(snake.length);
    foodSnake.x = food(500, 0);
    foodSnake.y = food(500, 0);
  } else {
    foodSnake.draw();
  }
}

function draw() {
  snakeDraw(snake);
  motionSnake();
}
draw();
