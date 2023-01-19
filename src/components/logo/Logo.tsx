import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-[150px]">
      <Image
        alt="Logo"
        src="/bs_textlogo_500x59.png"
        height={59}
        width={500}
        className="brightness-200 saturate-0 transition-all hover:brightness-100 hover:saturate-100"
      />
    </div>
  );
};

export default Logo;
