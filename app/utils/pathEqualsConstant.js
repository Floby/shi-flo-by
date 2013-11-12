function pathEqualsConstant (path, constant) {
  return function () {
    return this.get(path) === constant;
  }.property(path);
}

export default pathEqualsConstant;

