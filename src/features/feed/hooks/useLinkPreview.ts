import { useState } from "react";
import { fetchLinkImage } from "../api/feed";

type Link = {
  lid: string;
  title: string;
  domain: string;
  explain: string;
  url: string;
};

export function useLinkPreview(links: Link[]) {
  const [images, setImages] = useState<string[]>([]);

  async function fetchImages() {
    if (links.length === 0) return;

    const datas = await Promise.all(
      links.map((link) => fetchLinkImage(link.url)),
    );

    setImages(datas.map((data) => data.body.image));
  }

  return { images, fetchImages };
}
