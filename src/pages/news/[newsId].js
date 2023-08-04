import { Col, Image, Row } from "antd";
import RootLayout from "@/components/Layouts/RootLayout"; //please be carefule to import RootLayout after all other component import.
import {
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const NewsDetailPage = ({ news }) => {
  if (!news) {
    return <h1>Loading......</h1>;
  }
  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={12}>
          <div>
            <Image
              src={news?.image_url}
              width={500}
              height={200}
              responsive
              alt="news image"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <h1 style={{ fontSize: "25px" }}>{news?.title}</h1>
            <h6 style={{ fontSize: "16px" }}>{news?.author}</h6>
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
            <p style={{ fontSize: "15px" }}>{news?.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

/* export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/news");
  const newses = await res.json();
  const paths = newses.map((news) => ({
    params: { newsId: news.id }, //here id after params should be the name of dynamic pageId which we have create for dynamin render. here id should be named newsId
  }));

  return { paths, fallback: false }; //here if we use fallback:false it will create only the maped ammount of data. that means if we get 4 data after map then we can get only 4 static page & if we hit to 5 th dynamic data it will throw us in error page.But it we use fallback:true.Then whatever page we hit it will create this amount of static blank page and wait for the page waitin in a loading state.But if we use fallback:"blocking" then it will not wait in loading state it directly create the user requested static page even if this dyami path is not exist in mapped data.
};
 */
export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
};
