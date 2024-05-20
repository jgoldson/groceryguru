import Navbar from "../components/Navbar";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>My Recipes App</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
