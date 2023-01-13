import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      alt="Logo"
      src="/bs_textlogo_500x59.png"
      height={0}
      width={150}
      className="brightness-200 saturate-0 transition-all hover:brightness-100 hover:saturate-100"
    />
  );
};

export default Logo;
