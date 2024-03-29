# Softpage
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

export
```bash
# if you run this command. you should delete .next before.
npm run build
# Basicly, build already include the export to out
next export
```

Use the dummy data server
```bash
git submodule update
# read the dummy_server/README.md
```

## Additional info
```bash
# update all the packages to the latest
npm install -g npm-check-updates
ncu --upgrade
npm install
```

# Reference by my note
[Redux example](https://blog.logrocket.com/use-redux-next-js/)  
[next-redux-warpper GitHub](https://github.com/kirill-konshin/next-redux-wrapper)  
[MUI5 with nextjs and nextjs](https://dev.to/hajhosein/nextjs-mui-v5-typescript-tutorial-and-starter-3pab)  
[getServerSideProps v.s. getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)  
[Update All of the packages][https://medium.com/subjective-developer/update-all-node-packages-to-latest-aa128396b92b] 


---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Refers:
[How to use material ui with nextjs](https://medium.com/nextjs/how-to-use-material-ui-with-nextjs-and-react-18-6c054ceacf77)


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
