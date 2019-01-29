module.exports = {
  plugins: {
    "autoprefixer": {
      browsers: [
        "> 1%",
        "last 5 versions",
        "not ie <= 8",
      ],
      //是否美化属性值 默认：true
      cascade: true,
      //是否去掉不必要的前缀 默认：true
      remove: false,
    },
  },
};
// module.exports = {
//   plugins: [
//     require("autoprefixer")({
//       browsers: ["last 10 versions"],
//     }),
//   ],
// };