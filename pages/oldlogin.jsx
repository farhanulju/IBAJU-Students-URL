/* eslint-disable @next/next/no-img-element */
import GithubStar from '@/components/utils/github-star';
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'IBA-JU BBA29',
  description:
    'IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence.',
};

const Home = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated' ? true : false;

  return (
    <>
      <Head>
        <title>IBA-JU 29th Batch CV</title>
        {/* <!-- Open Graph (OG) meta tags --> */}
        <meta property="og:url" content="https://bba29.iba-ju.edu.bd/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="IBA-JU BBA29 - The free & opensource link in bio tool"
        />
        <meta property="og:title" content="IBA-JU BBA29" />
        <meta
          property="og:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://IBA-JU BBA29.me/og.png"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://www.IBA-JU BBA29.me/og.png"
        />

        {/* <!-- Twitter Card meta tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IBA-JU" />
        <meta name="twitter:creator" content="@IBA-JU" />
        <meta
          property="twitter:domain"
          content="https://bba29.iba-ju.edu.bd/"
        />
        <meta property="twitter:domain" content="https://IBA-JU BBA29.me/" />
        <meta property="twitter:domain" content="https://www.IBA-JU BBA29.me/" />
        <meta property="twitter:url" content="https://bba29.iba-ju.edu.bd/" />
        <meta name="twitter:title" content="IBA-JU BBA29" />
        <meta
          name="twitter:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />
        <meta
          name="twitter:image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta name="twitter:image" content="https://IBA-JU BBA29.me/og.png" />
        <meta name="twitter:image" content="https://www.IBA-JU BBA29.me/og.png" />
        <meta
          data-rh="true"
          name="twitter:image:alt"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />

        {/* <!-- LinkedIn meta tags --> */}
        <meta
          property="og:linkedin:image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta
          property="og:linkedin:image"
          content="https://IBA-JU BBA29.me/og.png"
        />
        <meta
          property="og:linkedin:image"
          content="https://www.IBA-JU BBA29.me/og.png"
        />
        <meta property="og:linkedin:title" content="IBA-JU BBA29" />
        <meta
          property="og:linkedin:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />

        {/* <!-- Facebook meta tags --> */}
        <meta
          property="og:facebook:image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta
          property="og:facebook:image"
          content="https://IBA-JU BBA29.me/og.png"
        />
        <meta
          property="og:facebook:image"
          content="https://www.IBA-JU BBA29.me/og.png"
        />
        <meta property="og:facebook:title" content="IBA-JU BBA29" />
        <meta
          property="og:facebook:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />

        {/* <!-- Instagram meta tags --> */}
        <meta
          property="og:instagram:image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta
          property="og:instagram:image"
          content="https://IBA-JU BBA29.me/og.png"
        />
        <meta
          property="og:instagram:image"
          content="https://www.IBA-JU BBA29.me/og.png"
        />
        <meta property="og:instagram:title" content="IBA-JU BBA29" />
        <meta
          property="og:instagram:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />

        {/* <!-- Pinterest meta tags --> */}
        <meta
          property="og:pinterest:image"
          content="https://bba29.iba-ju.edu.bd/og.png"
        />
        <meta
          property="og:pinterest:image"
          content="https://IBA-JU BBA29.me/og.png"
        />
        <meta
          property="og:pinterest:image"
          content="https://www.IBA-JU BBA29.me/og.png"
        />
        <meta property="og:pinterest:title" content="IBA-JU BBA29" />
        <meta
          property="og:pinterest:description"
          content="IBA-JU BBA29 is an opensource link in bio tool that helps you easily manage your links, transforming your online presence."
        />
      </Head>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-y-0 w-full h-full"
            aria-hidden="true"
          ></div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav
                className="relative flex items-center justify-between md:justify-start"
                aria-label="Global"
              >
                <Link
                  className="flex items-center gap-2 font-bold text-xl"
                  href="/"
                >
                  <h3 className="lg:block">IBA-JU BBA29</h3>
                </Link>

                <div className="relative items-center w-28 z-10 md:absolute md:inset-y-0 md:right-0">
                  <Link
                    className="group inline-flex items-center gap-2 px-4 text-sm  bg-slate-900 border rounded-3xl text-white w-[116px] h-[35px] justify-center font-semibold transition-colors hover:bg-slate-700"
                    rel="noopener noreferrer"
                    href="/admin"
                  >
                    {isAuthenticated ? 'Admin' : 'Login'}
                  </Link>
                </div>
              </nav>
            </div>
            <div className="px-4 mx-auto mt-24 max-w-7xl sm:mt-16 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Only for IBA-JU</span>
                  <span className="hero-title block ">link in bio tool</span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  IBA-JU BBA29 is an opensource link in bio tool that helps you
                  easily manage your links, transforming your online presence.
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <div className="flex flex-col items-center">
                  <span className="inline-flex rounded-xl shadow">
                    <Link legacyBehavior href="/register">
                      <a className="inline-flex items-center px-4 py-2 font-medium text-lg gradient-btn border border-transparent rounded-xl text-white w-[190px] h-[50px] justify-center hover:shadow-lg">
                        Get started
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="flex-1 w-full bg-slate-900 " />
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <Image
                className="relative rounded-lg shadow-lg"
                src="/assets/new_shot.png"
                alt="App screenshot"
                height={700}
                width={1200}
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-900">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold tracking-wide text-center text-gray-400">
              Made by{' '}
              <a
                className="hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/NerdyProgramme2"
              >
                @IBA-JU
              </a>
            </h2>
            <div className="flex items-center gap-4 justify-center mt-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter logo"
              >
                <TwitterIcon color="white" />
              </a>
              <a
                href="https://github.com/IBA-JU"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github logo"
              >
                <GithubIcon color="white" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="insta logo"
              >
                <GlobeIcon color="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
