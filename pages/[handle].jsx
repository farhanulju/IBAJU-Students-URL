/* eslint-disable @next/next/no-img-element */
import LinkCard from '@/components/core/user-profile/links-card';
import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
//import Loader from '@/components/utils/loading-spinner';
import NotFound from '@/components/utils/not-found';
//import useLinks from '@/hooks/useLinks';
import Script from 'next/script';
import { SocialCards } from '@/components/core/user-profile/social-cards';
import Head from 'next/head';
import Image from 'next/image'
import { Home } from 'lucide-react';
import { Description } from '@radix-ui/react-dialog';


export async function getStaticProps(context) {
  const { handle } = context.params;
  
  let fetchedUser = null;
  let userLinks = null;
  
  try {
    const userResult = await axios.get(`https://iba-students-url.vercel.app/api/users/${handle}`);
    fetchedUser = userResult.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }

  if (fetchedUser) {
    try {
      const linksResult = await axios.get(`https://iba-students-url.vercel.app/api/links?userId=${fetchedUser.id}`);
      userLinks = linksResult.data;
    } catch (error) {
      console.error("Error fetching links:", error.message);
    }
  }
  
  // Pass data to the page via props
  return { props: { fetchedUser, userLinks }, revalidate: 60 }
}

export async function getStaticPaths() {
  // Fetch handles from API
  const res = await axios.get("https://iba-students-url.vercel.app/api/users");
  const users = res.data;

  // Map users to an array of paths
  const paths = users.map((user) => ({
    params: { handle: user.handle },
  }));

  // Fallback ensures that if a handle is not present in the paths, it will still try to render the page on the fly
  return { paths, fallback: 'blocking' };
}

const ProfilePage = ({ fetchedUser, userLinks }) => {
  const { query } = useRouter();
  const { handle } = query;




  const queryClient = useQueryClient();
  const [, setIsDataLoaded] = useState(false);

  const mutation = useMutation(
    async (id) => {
      await axios.patch(`/api/analytics/clicks/${id}`);
    },
    {
      onError: (error) => {
        toast.error(
          (error.response && error.response.data.message) || 'An error occurred'
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', fetchedUser?.id] });
        queryClient.invalidateQueries({ queryKey: ['users', fetchedUser?.id] });
      },
    }
  );

  const handleRegisterClick = async (id) => {
    await mutation.mutateAsync(id);
  };

  useEffect(() => {
    window.addEventListener('message', () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    });

    return () => {
      window.removeEventListener('message', () => {
        queryClient.invalidateQueries({ queryKey: ['links'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      });
    };
  }, [queryClient]);

  useEffect(() => {
    if (fetchedUser && userLinks) {
      setIsDataLoaded(true);
    }
  }, [fetchedUser, userLinks]);


  if (!fetchedUser?.id) {
    return <NotFound />;
  }

  const buttonStyle = fetchedUser?.buttonStyle;
  const theme = {
    primary: fetchedUser?.themePalette.palette[0],
    secondary: fetchedUser?.themePalette.palette[1],
    accent: fetchedUser?.themePalette.palette[2],
    neutral: fetchedUser?.themePalette.palette[3],
    text: fetchedUser?.themePalette.palette[4]
  };

  return (
    <>
      <Head>
        <title>{`${fetchedUser?.name} | BBA 29th`}</title>        
      <meta property="title" content={`${fetchedUser?.name} | BBA 29th`} />
    <meta
      name="description"
      content={`${fetchedUser?.name}'s Detail`}
    />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <meta property="og:url" content="https://bba29.iba-ju.edu.bd/" />
    <meta property="og:type" content="website" />
    <meta
      property="og:site_name"
      content="IBA-JU 29th Batch CV"
    />
    <meta property="og:title" content={`${fetchedUser?.name} | BBA 29th`} />
    <meta
      property="og:description"
      content={`${fetchedUser?.name}'s Detail`}
    />
    <meta
      property="og:image"
      itemProp="image"
      content={`https://bba29.iba-ju.edu.bd/people/${fetchedUser?.handle}.jpg`}
    />

    {/* <!-- Twitter Card meta tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@IBA-JU" />
    <meta name="twitter:creator" content="@IBA-JU" />
    <meta
      property="twitter:domain"
      content="https://bba29.iba-ju.edu.bd/"
    />
    <meta property="twitter:url" content="https://bba29.iba-ju.edu.bd/" />
    <meta name="twitter:title" content={`${fetchedUser?.name} | BBA 29th`} />
    <meta
      name="twitter:description"
      content="IBA-JU 29th Batch CV"
    />
    <meta
      name="twitter:image"
      content={`https://bba29.iba-ju.edu.bd/people/${fetchedUser?.handle}.jpg`}
    />
    <meta
      data-rh="true"
      name="twitter:image:alt"
      content={`${fetchedUser?.handle}'s Picture`}
    />
      </Head>
      {!query.isIframe ? (
        <Script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token={process.env.NEXT_PUBLIC_DATA_TOKEN}
        />
      ) : (
        ''
      )}
      <section
  style={{ background: theme.primary }}
  className="h-[100vh] w-[100vw] no-scrollbar overflow-auto relative"
>
  {/* Blurred background image */}
  <div className="absolute inset-0 overflow-hidden">
    <Image
      src={`/people/${fetchedUser?.handle}.jpg`}
      height={500}
      width={500}
      alt="background"
      className="w-full h-52 object-cover blur-[5px] align-middle"
    />
  </div>

  <div className="flex items-center w-full mt-16 flex-col mx-auto max-w-3xl justify-center px-8 relative z-10">
    

    {/* White rectangular shape with rounded-md */}

   


<div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow mt-24 mb-14 font-semibold py-4" style={{ color: theme.text }}>
    <div className="flex justify-end px- pt-2"> 
    </div>
    <div className="flex flex-col items-center pb-4 ">
        <Avatar.Root
        className="inline-flex h-[150px] w-[150px] border-2 border-red-950 -mt-24
              items-center justify-center overflow-hidden rounded-full align-middle  mx-auto bg-white"
      >
        <Image
          className="h-full w-full rounded-[inherit] object-cover"
          width={500}
          height={500}
          src={`/people/${fetchedUser?.handle}.jpg`}
          referrerPolicy="no-referrer"
          alt="avatar"
        />        
      </Avatar.Root>
        <span className="mt-2 mb-1 text-2xl font-sans text-gray-900 text-center">{fetchedUser?.name}</span>
        <span className="text-sm text-gray-500">{fetchedUser?.bio}</span>
       
    </div>
</div>


<a
  href={`/CV/${fetchedUser?.handle}.png`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center uppercase rounded-full hover:scale-105 transition-all border mb-3 w-full sm:w-64 md:w-72 lg:w-96 xl:w-3/4 2xl:w-3/5 max-w-sm lg:p-1 lg:mb-6"
  style={{ background: 'rgb(89, 0, 2)', display: 'flex', border: '1.5px solid rgb(120, 0, 2)' }}
>
  <div className="flex text-center w-full">
    <div className="w-10 h-10"></div>
    <h2
      className="text-lg text- flex justify-center items-center font-sans w-full text-gray-700 -ml-10 tracking-widest"
      style={{ color: 'rgb(255, 255, 255)' }}
    >
      Résumé
    </h2>
  </div>
</a>

          {userLinks
            ?.filter((link) => !link.isSocial)
            .map(({ id, ...link }) => (
              <LinkCard
                buttonStyle={buttonStyle}
                theme={theme}
                id={id}
                key={id}
                {...link}
                registerClicks={() => handleRegisterClick(id)}
              />
            ))}

          
           <div className="flex justify-center">
              <h3
                style={{ color: theme.neutral }}
                className="pt-4 text-lg text-white font-semibold tracking-[6px]"
              >CONTACT ME
              </h3>
            </div>
          {/* eslint-disable react/jsx-key */}
          <div className="min-w-max flex flex-wrap gap-2 mb-8 lg:w-fit lg:gap-4">
            {userLinks
              ?.filter((link) => link.isSocial && !link.archived)
              .map(({ id, title, url }) => {
                return (                  
                                   
                  <SocialCards
                    key={id}
                    title={title}
                    url={url}
                    color={theme.secondary}
                    registerClicks={() => handleRegisterClick(id)}
                  />
                  
                );
              })}
              <a        
        target="_blank"
        href={`mailto:${fetchedUser?.email}`}
        className="hover:scale-125 transition-all w-[45px] h-[45px] rounded-full px-2"
      >
        <img
          loading="lazy"
          src="https://s2.svgbox.net/social.svg?color=780002&ic=gmail"
          className="w-[42px] h-[42px]"
          alt="email"
        />
      </a>

      
              </div>
              <p              
              className="text-sm text-semibold text-center w lg:text-lg bg-[590002]"            >
              
              <Link
                className="font-semibold"
                href="/"
              >
                <Home />
              </Link>
            </p>
      {/* eslint-enable react/jsx-key */}
        </div>
        
      
        
        
     
      </section>
    </>
  );
};

export default ProfilePage;
