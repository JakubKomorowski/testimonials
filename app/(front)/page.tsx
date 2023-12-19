import { getPosts } from "@/sanity/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import LinkButton from "../components/LinkButton";
import Circle from "../components/ui/Circle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testi Crafter",
  description: "Collect, customize and publish testimonials",
};

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);

  return (
    <main>
      <header className="bg-primary-foreground lg:h-[800px] relative">
        <div className="max-w-[400px] xs:max-w-[460px] sm:max-w-[560px] lg:max-w-[900px] mx-auto pt-[120px] sm:pt-[140px] container">
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
              Accelerate your business with those great looking testimonials
            </p>
            <div className="flex justify-center mt-10">
              <LinkButton route={"signin"}>Start for free</LinkButton>
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
        <div className="container gap-2 lg:gap-0 lg:left-1/2 lg:translate-x-[-50%] flex flex-col items-center lg:flex-row justify-between lg:absolute bottom-[-130px] xl:bottom-[-140px] w-full max-w-[1240px] mt-20 lg:mt-0">
          <Circle
            icon="collect"
            text="lorem ipsum lorem ipsum lorem ipsum lorem"
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
            text="lorem ipsum lorem ipsum lorem ipsum lorem"
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
            text="lorem ipsum lorem ipsum lorem ipsum lorem"
            title="Publish"
            iconAlt="publish icon"
          />
        </div>
        {/* {session?.data?.user.email} */}
      </header>
    </main>
  );
}
