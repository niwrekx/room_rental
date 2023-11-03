"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Logo = () => {
    const router = useRouter();

  return (
    <Link href="/">
      <Image 
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="hidden md:block cursor-pointer"    
      />
    </Link>
  )
}

export default Logo;