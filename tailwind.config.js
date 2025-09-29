/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"  ,
     "./components/**/*.{js,jsx,ts,tsx}"  
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312 ",
        light:{
          100:"#D6C6FF",
          200:"#A8B5DB",
          300:"#9CA4AB",

        },
        dark:{
          100:'#221F3d',
          200:'#0f0d23',
        },
        
      },
     accent:'#AB8BFF',

    },
  },
  plugins: [],
};
