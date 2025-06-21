export default {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "nesting-rules": false,
        "custom-media-queries": true,
        "custom-properties": {
          preserve: false,
        },
        "color-functional-notation": true,
        "logical-properties-and-values": true,
        "media-query-ranges": true,
      },
      browsers: ["last 2 versions", "> 1%", "not dead", "not IE 11"],
    },

    autoprefixer: {
      grid: true,
      flexbox: "no-2009",
    },

    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            reduceIdents: false,
            zindex: false,
          },
        ],
      },
    }),
  },
};
