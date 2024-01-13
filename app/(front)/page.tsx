import { getPosts } from "@/sanity/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LinkButton from "../components/ui/LinkButton";
import Circle from "../components/ui/Circle";
import { Metadata } from "next";
import { ROUTES } from "@/routes";
import Link from "next/link";
import DefaultCard from "../components/ui/testimonialCards/DefaultCard";
import QuoteCard from "../components/ui/testimonialCards/QuoteCard";
import { CarouselComponent } from "../components/ui/testimonialCards/CaruselComponent";
import Divider from "../components/ui/Divider";
import { Button } from "@/components/ui/button";
import AddEmailButton from "../components/ui/AddEmailButton";
import SpeachBubble from "../components/ui/testimonialCards/SpeachBubble";
import PostCard from "../components/ui/PostCard";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Post } from "@/types/Post";
import { sanityFetch } from "@/sanity/lib/client";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Trust Catcher",
  description: "Collect, customize and publish testimonials",
  openGraph: {
    images: "/logo.png",
  },
};

export default async function Home() {
  // const posts = await getPosts();
  const posts: Post[] = await sanityFetch({
    query: getPosts,
    tags: ["post"],
  });
  const session = await getServerSession(authOptions);
  const fourPosts = posts.slice(0, 4);

  return (
    <main>
      <header className="bg-bg lg:h-[750px] relative mb-0 lg:mb-56 pb-12 lg:pb-0">
        <div className="max-w-[400px] xs:max-w-[460px] sm:max-w-[560px] lg:max-w-[900px] mx-auto pt-[120px] container">
          <div className="relative">
            <Image
              src="/handWriting.svg"
              alt="hand-writing"
              width={330}
              height={100}
              className="absolute top-[70px] right-20 xs:right-3 xs:top-8 sm:right-4 sm:top-10 lg:right-10 lg:top-16 w-[160px] sm:w-[200px] lg:w-[330px]"
            />
            <h1 className="text-white text-center font-bold leading-tight">
              Improve your conversion <br /> using testimonials as a social
              proof
            </h1>
            <p className="text-white  text-center mt-8">
              {/* Accelerate your business with those great looking testimonials */}
              Get notified when we’re launching.
            </p>
            {/* <div className="flex justify-center mt-10">
              <LinkButton route={ROUTES.signin}>Start for free</LinkButton>
            
            </div> */}
            <div className="flex justify-center mt-10">
              <AddEmailButton />
            </div>
          </div>
        </div>
        <Image
          src="/testimonialShadow.svg"
          alt="hand-writing"
          width={230}
          height={100}
          className="absolute left-0 top-16 hidden lg:block"
        />
        <Image
          src="/testimonialShadowRight.svg"
          alt="hand-writing"
          width={150}
          height={100}
          className="absolute right-0 top-[350px] hidden lg:block"
        />
        <div className="container lg:gap-0 lg:left-1/2 lg:translate-x-[-50%] flex flex-col items-center lg:flex-row justify-between lg:absolute bottom-[-130px] xl:bottom-[-140px] w-full max-w-[1160px] mt-20 lg:mt-0">
          <Circle
            icon="collect"
            text="Gather customer feedback quickly and easily."
            title="Collect"
            iconAlt="collect icon"
          />
          <Image
            src="/Icons/arrow-right.svg"
            alt="arrow-right"
            width={45}
            height={61}
            className="w-11 lg:rotate-0 rotate-90"
          />
          <Circle
            icon="customize"
            text="Edit testimonials to match your brand's style."
            title="Customize"
            iconAlt="customize icon"
          />
          <Image
            src="/Icons/arrow-right.svg"
            alt="arrow-right"
            width={45}
            height={61}
            className="w-11 lg:rotate-0 rotate-90"
          />
          <Circle
            icon="publish"
            text="Display refined testimonials on your site effortlessly."
            title="Publish"
            iconAlt="publish icon"
          />
        </div>
      </header>
      <section className="flex flex-col items-center lg:flex-row sm:items-start container gap-20 md:px-16 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-20 lg:w-1/2">
          <div className="max-w-[250px]">
            <p className="text-6xl font-bold pb-2">380%</p>
            <p className="text-gray-600">
              Increase in conversion rate when reviews were displayed
            </p>
          </div>
          <div className="max-w-[250px]">
            <p className="text-6xl font-bold pb-2">86%</p>
            <p className="text-gray-600">
              People under 45 say that reviews are essential in making purchase
              decisions
            </p>
          </div>
          <div className="max-w-[250px]">
            <p className="text-6xl font-bold pb-2">62%</p>
            <p className="text-gray-600">
              Increase in revenue per visit when reviews were displayed
            </p>
          </div>
          <div className="max-w-[250px]">
            <p className="text-6xl font-bold pb-2">92%</p>
            <p className="text-gray-600">
              Of consumers read at least one online review of a company before
              deciding to make a purchase
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2">
          <h2 className="text-6xl justify-self-end">Statistics sources</h2>
          <ol className="mt-6 text-gray-600 text-lg flex flex-col gap-2 underline">
            <li>
              <Link href="https://www.sciencedirect.com/science/article/abs/pii/S0167923617300428">
                Sciencedirect
              </Link>
            </li>
            <li>
              <Link href="https://www.digitalcommerce360.com/2015/01/22/product-reviews-boost-revenue-online-visit-62/">
                Digitalcommerce360
              </Link>
            </li>
            <li>
              <Link href="https://www.bigcommerce.com/blog/customer-testimonials/">
                Bigcommerce
              </Link>
            </li>
            <li>
              <Link href="https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/">
                Spiegel Research Center
              </Link>
            </li>
          </ol>
        </div>
      </section>
      <section className="container md:px-16 flex flex-wrap justify-around gap-10 mt-36">
        <DefaultCard
          image="/avatar1.jpg"
          alt="avatar"
          name="Ana Gray"
          text="This product transformed my daily routine, making everything more
        efficient and enjoyable."
          rating={4}
        />
        <DefaultCard
          image="/avatar2.jpg"
          alt="avatar"
          name="Monica Lee"
          text="I've never experienced customer service as attentive and caring as this company's."
          rating={5}
        />
        <DefaultCard
          image="/avatar3.jpg"
          alt="avatar"
          name="Vince Doe"
          text="The results were beyond my expectations – truly a game-changer for my business."
          rating={5}
        />
      </section>
      <div className="container md:px-16 my-12">
        <Divider>
          <div className="bg-gray-300 w-4 h-4 rounded-full flex justify-center items-center">
            <div className="bg-white w-2 h-2 rounded-full"></div>
          </div>
        </Divider>
      </div>
      <section className="flex container justify-center px-8 md:px-28">
        <CarouselComponent />
      </section>
      <div className="container md:px-16 my-12">
        <Divider>
          <div className="bg-gray-300 w-4 h-4 rounded-full flex justify-center items-center">
            <div className="bg-white w-2 h-2 rounded-full"></div>
          </div>
        </Divider>
      </div>
      <section className="container md:px-28">
        <SpeachBubble />
      </section>
      <section className="container md:px-16 mt-20">
        <h2 className="text-6xl">Recent Posts</h2>
        <div className="flex  flex-wrap justify-center sm:justify-start gap-12 my-12">
          {fourPosts.map((post, i) => {
            return <PostCard key={i} post={post} />;
          })}
        </div>
      </section>
    </main>
  );
}
