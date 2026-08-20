import { Center } from "@mantine/core";

const Page = ({ params }) => {
  return (
    <Center>
      <iframe
        style={{ width: "100%", height: 700 }}
        src={decodeURIComponent(params?.flipBookLink)}
        seamless="seamless"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        allowfullscreen
      ></iframe>
    </Center>
  );
};

export default Page;
