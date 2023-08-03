import RootLayout from "@/components/Layouts/RootLayout";
import { Card, Col, Image } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";


const NewsDetailPage = ({ news }) => {
  return (
    <div>
      <Col key={news.id} className="gutter-row" span={6}>
        <Card
          hoverable
          cover={
            <Image
              src={news?.image_url}
              // width={500}
              // height={200}
              responsive
              alt="news image"
            />
          }
        >
          <Meta title={news?.title} />
          <div
            className="line"
            style={{
              height: "5px",
              margin: "20px 0",
              background: "#000",
              width: "100%",
            }}
          ></div>

          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "gray",
              margin: "10px 0px",
              fontSize: "12px",
            }}
          >
            <span>
              <CalendarOutlined /> {news?.release_date}
            </span>
            <span>
              <CommentOutlined /> {news?.comment_count} COMMENTS
            </span>
            <span>
              <ProfileOutlined /> {news?.category}
            </span>
          </p>

          <p style={{ fontSize: "15px" }}>
            {news?.description.length > 100
              ? news?.description.slice(0, 70) + "..."
              : news?.description}
          </p>
        </Card>
      </Col>
    </div>
  );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/news");
  const newses = await res.json();
  const paths = newses.map((news) => ({
    params: { newsId: news.id }, //here id after params should be the name of dynamic pageId which we have create for dynamin render. here id should be named newsId
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
};
