/* eslint-disable @next/next/no-img-element */
import LinkCard from '@/components/core/user-profile/links-card';
import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import Loader from '@/components/utils/loading-spinner';
import NotFound from '@/components/utils/not-found';
import useLinks from '@/hooks/useLinks';
import Script from 'next/script';
import { SocialCards } from '@/components/core/user-profile/social-cards';
import Head from 'next/head';

const ProfilePage = () => {
  const { query } = useRouter();
  const { handle } = query;

  const {
    data: fetchedUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser(handle);

  const { data: userLinks, isFetching: isLinksFetching } = useLinks(
    fetchedUser?.id
  );

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

  if (isUserLoading) {
    return <Loader message={'Loading...'} bgColor="black" textColor="black" />;
  }

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
        <title> @{handle} | IBA-JU Links</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
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
    <img
      src={`/people/${fetchedUser?.handle}.jpg`}
      alt="background"
      className="w-full h-52 object-cover blur-[5px] align-middle"
    />
  </div>

  <div className="flex items-center w-full mt-16 flex-col mx-auto max-w-3xl justify-center px-8 relative z-10">
    {(isLinksFetching || isUserFetching) && (
      <div className="absolute -top-5 left-2">
        <Loader
          strokeWidth={7}
          width={15}
          height={15}
          bgColor={theme.accent}
        />
      </div>
    )}

    {/* White rectangular shape with rounded-md */}

   


<div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow mt-24 mb-14 font-semibold py-4" style={{ color: theme.text }}>
    <div class="flex justify-end px- pt-2"> 
    </div>
    <div class="flex flex-col items-center pb-4">
        <Avatar.Root
        className="inline-flex h-[150px] w-[150px] border-2 border-red-950 -mt-24
              items-center justify-center overflow-hidden rounded-full align-middle  mx-auto"
      >
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={`/people/${fetchedUser?.handle}.jpg`}
          referrerPolicy="no-referrer"
          alt="avatar"
        />
        <Avatar.Fallback
          className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={100}
        >
          @
        </Avatar.Fallback>
      </Avatar.Root>
        <span class="mt-2 mb-1 text-2xl font-sans text-gray-900 text-center">{fetchedUser?.name}</span>
        <span class="text-sm text-gray-500">{fetchedUser?.bio}</span>
    </div>
</div>

          
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

          {userLinks?.length === 0 && (
            <div className="flex justify-center">
              <h3
                style={{ color: theme.neutral }}
                className="pt-8 text-md text-white font-semibold lg:text-2xl"
              >
                Hello World 🚀
              </h3>
            </div>
          )}
           <div className="flex justify-center">
              <h3
                style={{ color: theme.neutral }}
                className="pt-4 text-lg text-white font-semibold tracking-[6px]"
              >
                 {userLinks?.filter((link) => link.isSocial && !link.archived && link.url !== "#").length > 0
  ? "CONTACT ME"
  : ""}
              </h3>
            </div>
          
            {userLinks
              ?.filter((link) => link.isSocial && !link.archived && link.url !=="#")
              .map(({ id, title, url }) => {
                return (
                  
                  <div className="min-w-max flex flex-wrap gap-2 mb-8 lg:w-fit lg:gap-4">
                  <SocialCards
                    key={id}
                    title={title}
                    url={url}
                    color={theme.secondary}
                    registerClicks={() => handleRegisterClick(id)}
                  />
                  </div>
                );
              })}
      
        </div>
        
        <div className="my-10 lg:my-24" />
        {userLinks?.length > 0 ? (
          <footer className="relative hidden left-1/2 bottom-0 transform -translate-x-1/2 w-[200px]">
            <p
              style={{ color: theme.accent }}
              className="text-sm text-semibold text-center w lg:text-lg"
            >
              Trained to Lead{' '}
              <Link
                className="font-semibold"
                target="_blank"
                href="/"
              >
                by IBA-JU
              </Link>
            </p>
          </footer>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default ProfilePage;
