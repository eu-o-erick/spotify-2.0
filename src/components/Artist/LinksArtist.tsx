"use client";

import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { SiWikipedia } from "react-icons/si";
const iconMap = {
  FACEBOOK: LuFacebook,
  INSTAGRAM: FaInstagram,
  TWITTER: FaXTwitter,
  WIKIPEDIA: SiWikipedia,
};

export default function LinksArtist({
  links,
}: {
  links: {
    name: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "WIKIPEDIA";
    url: string;
  }[];
}) {
  return (
    <nav>
      <ul className="flex items-start gap-3 max-sm:gap-2">
        {links.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <li key={name}>
              <a
                href={url}
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icon && (
                  <Icon className="w-5 h-5 text-zinc-500 hover:text-zinc-400 max-lg:w-4 max-lg:h-4" />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
