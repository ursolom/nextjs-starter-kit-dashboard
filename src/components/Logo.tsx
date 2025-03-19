import { SITE } from "@/constants";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex items-center">
            <Image src="/vercel.svg" alt="Logo" width={40} height={40} />
            <span className="md:text-xl text-lg font-bold ml-2 uppercase">{SITE.NAME}</span>
        </div>
    );
};

export default Logo;
