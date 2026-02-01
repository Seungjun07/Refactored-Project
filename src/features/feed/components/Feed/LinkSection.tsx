import { useEffect } from "react";
import { useLinkPreview } from "../../hooks/useLinkPreview";
import LinkPreview from "./LinkPreview";
import style from "@/pages/FeedPage/FeedPage.module.css";
type Link = {
  lid: string;
  title: string;
  domain: string;
  explain: string;
  url: string;
};
interface LinkSectionProps {
  links: Link[];
}

export default function LinkSection({ links }: LinkSectionProps) {
  const { images, fetchImages } = useLinkPreview(links);

  useEffect(() => {
    if (links) {
      fetchImages();
    }
  }, [links]);

  return (
    <>
      {links.length > 0 && (
        <div className={style["link-line"]}>
          <div className={style["hr-sect"]}>첨부된 링크</div>
          <p>안전을 위해 신뢰할 수 있는 사이트에만 접속하세요.</p>
        </div>
      )}
      {links.map((link, idx) => (
        <LinkPreview key={link.lid} link={link} image={images[idx]} />
      ))}
    </>
  );
}
