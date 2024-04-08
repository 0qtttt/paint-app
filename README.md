## 프로젝트 소개

> 웹 브라우저에서 사용할 수 있는 간단한 도형 그림판

- 마우스를 드래그해서 사각형을 그릴 수 있습니다.
- 마우스를 드래그해서 원을 그릴 수 있습니다.
- 도형을 선택해서 삭제할 수 있습니다.
- 모든 도형을 일괄 삭제할 수 있습니다.
- 도형을 선택한 후 드래그로 위치를 바꿀 수 있습니다.
- 도형을 선택해서 표시 순서를 바꿀 수 있습니다. (e.g. 맨 앞으로 가져오기, 맨 뒤로 보내기)
- 그려진 도형은 QueryString에 저장되어 페이지를 새로고침 해도 유지되고 링크로 그려진 그림판을 공유 가능 합니다. (client-side storage에 저장하라 했지만 queryString 으로 저장해 봤습니다.)

<br/>
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
