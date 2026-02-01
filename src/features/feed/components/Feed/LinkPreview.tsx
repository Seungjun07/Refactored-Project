import link_pin_icon from "@/img/link_pin.png";
import style from "@/pages/FeedPage/FeedPage.module.css";

type Link = {
  lid: string;
  title: string;
  domain: string;
  explain: string;
  url: string;
};
interface LinkPreviewProps {
  link: Link;
  image: string;
}
export default function LinkPreview({ link, image }: LinkPreviewProps) {
  function openLink() {
    window.open(link.url, "_blank", "noopener, noreferrer");
  }

  return (
    <>
      {/* {link && (
        <div className={style["link-line"]}>
          <div className={style["hr-sect"]}>첨부된 링크</div>
          <p>안전을 위해 신뢰할 수 있는 사이트에만 접속하세요.</p>
        </div>
      )} */}
      <div key={link.lid} className={style["Link_Container"]}>
        <div
          className={style["Link_box"]}
          onClick={(e) => {
            e.stopPropagation();
            openLink();
          }}
        >
          <div className={style["Link_thumbnail"]}>
            <img src={image} alt={`${link.title} thumbnail`} />
          </div>

          <div className={style["Link_info"]}>
            <div className={style["Link_title"]}>{link.title}</div>
            <div className={style["Link_domain"]}>{link.domain}</div>
          </div>
        </div>

        <div className={style["Link_explain"]}>
          <span>
            <img src={link_pin_icon} alt="pin" />
          </span>
          <span>{link.explain}</span>
        </div>
      </div>
    </>
  );
}
