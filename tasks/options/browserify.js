module.exports = {
  options: {
    alias: ['scuttlebutt', 'node_modules/scuttlebutt/model:scuttlebutt/model', 'mux-demux-shoe', 'stream']
  },
  debug: {
    dest: 'tmp/public/vendor/npm-modules.js',
    src: []
  },
  dist: {
    dest: 'vendor/npm-modules.js',
    src: []
  }
};

