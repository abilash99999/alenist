
import Header from "./header";
import Footer from "./footer";
import Homee from "./home";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />


      <main className="container mx-auto px-4 flex-grow">
        <Homee />
      </main>


      <Footer />
    </div>
  );
}
