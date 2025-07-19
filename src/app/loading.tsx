import Image from "next/image";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary/80">
      <Image
        src={"/images/logos/logo-symbol-foreground.png"}
        width={200}
        height={200}
        alt="loading"
        className="animate-pulse"
      />
    </div>
  );
};

export default loading;
