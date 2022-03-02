function random(a, b) {
  if (a > b) {
    return Math.random() * (b - a) + a
  } else {
    return Math.random() * (a - b) + b
  }
}