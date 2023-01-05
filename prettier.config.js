// prettier.config.js
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: './tailwind.config.js',
};
