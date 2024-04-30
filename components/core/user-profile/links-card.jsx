import Image from 'next/image';

const LinkCard = (props) => {
  const isTransparent = props.buttonStyle.includes('bg-transparent');
  const hasShadowProp = props.buttonStyle.includes('shadow');

  const style = {
    background: isTransparent ? 'transparent' : props.theme.secondary,
    display: props.archived ? 'none' : 'flex',
    border: `1.5px solid ${props.theme.neutral}`,
    boxShadow: hasShadowProp ? `5px 5px 0 0 ${props.theme.neutral}` : '',
  };

  return (
    <a
      href={props.url}
      onClick={props.registerClicks}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center uppercase ${props.buttonStyle} hover:scale-105 transition-all border mb-3 w-full sm:w-64 md:w-72 lg:w-96 xl:w-3/4 2xl:w-3/5 max-w-sm lg:p-1 lg:mb-6`}
      style={style}
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {props.image && (
            <Image
              className="rounded-full"
              alt={props.title}
              src={props.image}
              width={40}
              height={40}
            />
          )}
        </div>
        <h2
          style={{ color: props.theme.accent }}
          className="text-lg text- flex justify-center items-center font-sans w-full text-gray-700 -ml-10 tracking-widest"
        >
          {props.title}
        </h2>
      </div>
    </a>
  );
};

export default LinkCard;
