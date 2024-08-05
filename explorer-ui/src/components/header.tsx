/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "@/assets/logo_text.svg";
import Discord from "@/assets/discord.svg";
import Twitter from "@/assets/twitter.svg";
import Github from "@/assets/github.svg";

import { useClient } from "@/context/ClientProvider";
import { chains, type ChainProp } from "@/lib/config";

const medias = [
  {
    icon: Discord,
    link: "https://discord.gg/Wbx2BAn2A4",
  },
  {
    icon: Twitter,
    link: "https://twitter.com/dephynetwork",
  },
  {
    icon: Github,
    link: "https://github.com/dephy-io",
  },
];

export const Header = function () {
  const { chain, handleSwitchChain } = useClient();

  const [currentChain, setCurrentChain] = useState<ChainProp>(chain);

  useEffect(() => {
    const c = chains.find(({ id }) => id === chain.id);

    if (c) {
      setCurrentChain(c);
    }
  }, [chain]);

  return (
    <div className="flex h-[69px] w-full items-center justify-between bg-neutral-900 px-8 py-4">
      <div className="flex h-8 items-center justify-start gap-[11px]">
        <Link href="/">
          <Image src={Logo} alt="" className="w-30 h-8" />
        </Link>
      </div>

      <div className="flex items-center justify-start gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white">
            {currentChain.logo ? (
              <Image
                width={24}
                height={24}
                src={currentChain.logo}
                alt={currentChain.title ?? currentChain.name}
              />
            ) : null}
            {/* {currentChain.title ?? currentChain.name} */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>Support Chains</DropdownMenuLabel> */}
            {chains.map((chain) => (
              <DropdownMenuItem
                key={chain.id}
                className="cursor-pointer"
                onClick={() => handleSwitchChain(chain)}
              >
                <Image
                  width={24}
                  height={24}
                  src={chain.logo}
                  alt={chain.title}
                  className="mr-2"
                />
                {chain.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {medias.map(({ icon, link }, i) => (
          <a key={i} target="_blank" href={link} className="flex items-center">
            <Image src={icon} className="h-5 w-6" alt={link} />
          </a>
        ))}
      </div>
    </div>
  );
};
