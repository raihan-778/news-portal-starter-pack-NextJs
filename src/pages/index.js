import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
// import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetAllnewsesQuery } from "@/redux/api/api";
import dynamic from "next/dynamic";

const HomePage = ({ allNews }) => {
  const { data, isLoading, isError, errorMessage } = useGetAllnewsesQuery();
  console.log(data);
  console.log(allNews);

  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => (
      <h1 style={{ fontSize: "20px", color: "red" }}>Loading...</h1>
    ),
    ssr: false,
  });

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
      <DynamicBanner />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      allNews: data.data,
    },
    revalidate: 10,
    //If we use getServerSideProps,we do not need to use revalidate because getServerSiderProps create page at the data rendar time so that we can get all updated data at the time of build

    // here revalidate is used to rebuild this specific page after 10 seconds.So that we can get any update info within few seconds. This is a property of getStaticProps function.
  };
};
