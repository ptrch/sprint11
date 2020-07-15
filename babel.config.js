const presets = [
    [
      "@babel/env",
      {

        useBuiltIns: "usage", 
        corejs: "3.4.1" 
      }
    ],
  ];
const plugins = [ 
 
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"

 ];
  module.exports = { presets,  plugins};