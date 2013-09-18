module.exports = {
  options: {
  },
  bundle: {
    options: {
      alias: ['scuttlebutt', 'node_modules/scuttlebutt/model:scuttlebutt/model', 'mux-demux-shoe']
    },
    dest: 'tmp/public/vendor/npm-modules.js',
    src: []
  }
};

