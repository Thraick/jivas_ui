```
npx create-remix@latest
npm i @radix-ui/colors
npx shadcn-ui init
npm i remix-auth
npm i remix-auth-google
npm i axios  
npm i zod
```


### Follow this to setup tailwind

https://tailwindcss.com/docs/installation

https://remix.run/docs/en/1.16.1/guides/styling#tailwind-css

https://ui.shadcn.com/docs/installation
### update tailwind.config.js
 ```
 content: [
    './routes/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      colors: {
        primary: {
          1: blue.blue1,
          2: blue.blue2,
          3: blue.blue3,
          4: blue.blue4,
          5: blue.blue5,
          6: blue.blue6,
          7: blue.blue7,
          8: blue.blue8,
          9: blue.blue9,
          10: blue.blue10,
          11: blue.blue11,
          12: blue.blue12,
        },
        gray: {
          1: gray.gray1,
          2: gray.gray2,
          3: gray.gray3,
          4: gray.gray4,
          5: gray.gray5,
          6: gray.gray6,
          7: gray.gray7,
          8: gray.gray8,
          9: gray.gray9,
          10: gray.gray10,
          11: gray.gray11,
          12: gray.gray12,
        },
      },
    },
  }

```