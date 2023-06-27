import React from "react";
import Meta from "@/components/meta";
import Team from "@/app/about/Team";
import Partners from "@/app/about/Partners";
import AboutNews from "@/app/about/AboutNews";
import Story from "@/app/about/Story";
import Video from "@/app/about/Video";

const About = () => {
  return (
    <>
      <Meta title="About || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Page title --> */}
      <section className="relative pt-24 lg:pb-96">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          {/* <!-- Page Title --> */}
          <div className="mx-auto max-w-2xl py-16 text-center">
            <h1 className="font-display text-jacarta-700 mb-8 text-4xl font-medium dark:text-white">
              About Xhibiter
            </h1>
            <p className="dark:text-jacarta-300 text-lg leading-normal">
              Every digital creation available through MakersPlace is an
              authentic and truly unique digital creation, signed and issued by
              the creator — made possible by blockchain technology.
            </p>
          </div>
        </div>
      </section>
      {/* <!-- Intro / Statistics --> */}

      <Video />

      {/* <!-- end intro / statistics --> */}
      {/* <!-- Story --> */}
      <Story compFor="about" />
      {/* <!-- end story --> */}
      <Team />
      <Partners />
      <AboutNews />
    </>
  );
};

export default About;
