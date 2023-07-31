import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/allNews";

const HomePage = ({ allNews }) => {
  console.log(allNews);
  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/news");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      allNews: data,
    },
    revalidate: 10, // here revalidate is used to rebuild this specific page after 10 seconds.So that we can get any update info within few seconds. This is a property of getStaticProps function.
  };
};
