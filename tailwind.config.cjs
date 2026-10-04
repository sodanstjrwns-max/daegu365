// 기존 사이트 테마를 빌드 단계에서 그대로 사용합니다.
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "brown": {
          "50": "#faf7f3",
          "100": "#f3ecdf",
          "200": "#e6d7bf",
          "300": "#d4ba94",
          "400": "#b89468",
          "500": "#a07747",
          "600": "#8a6235",
          "700": "#6b4c2a",
          "800": "#4a3520",
          "900": "#2c1f14",
          "950": "#1a120a"
        },
        "ivory": "#fdfbf7",
        "cream": "#f5efe5",
        "gold": "#c9a876"
      },
      "fontFamily": {
        "display": [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        "serif": [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        "sans": [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  "content": [
    "./src/**/*.{ts,tsx,js,jsx,html}",
    "./public/**/*.html",
    "./public/static/**/*.js"
  ]
}
