import Script from "next/script";

const Layout = ({ children }) => {
  return (
    <>
      <Script src="https://cdn.tailwindcss.com" />
      {children}
    </>
  );
};

export default Layout;
