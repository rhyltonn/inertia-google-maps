module.exports = {
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/inertia-google-maps/" : "/",
  css: {
    extract: false,
  },
};
