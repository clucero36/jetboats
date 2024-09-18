import { inter } from "./ui/fonts";
import NavBar from "./ui/navbar";
import Footer from "./ui/footer";
import "./globals.css";
import Context from "./context";

export const revalidate = 60

export const metadata = {
  title: "Jet Boat Classifieds",
  description: "Quality boating gear and accessories."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <Context>
            <NavBar />
            {children}
            <Footer />
          </Context>
        </body>
    </html>
  )
}
