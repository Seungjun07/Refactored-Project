import youtube from "@/img/youtube.svg";
import naver from "@/img/naver.svg";
import chzzz from "@/img/chzzz.svg";
import "./index.css";

const links = [
  {
    id: 0,
    name: "네이버",
    src: naver,
    // url: boardData.urls.Naver,
  },
  {
    id: 1,
    name: "유튜브",
    src: youtube,
    // url: boardData.urls.TikTok,
  },
  {
    id: 2,
    name: "방송국",
    src: chzzz,
    // url: boardData.urls.TikTok,
  },
];

type Link = {
  id: number;
  name: string;
};

interface BoardLinkProps {
  links: Link[];
}

export default function BoardLink() {
  //   function handleRequestURL(url:string) {
  //     window.open(url, "_blank", "noopener, noreferrer");
  //   }
  return (
    <div className="LinkBox_container">
      {links.map((link) => {
        return (
          <div
            key={link.id}
            className="LinkBox"
            // onClick={() => handleRequestURL(link.url)}
          >
            <div className="LinkBox_img">
              <img src={link.src} alt="img" />
            </div>
            <div>{link.name}</div>
          </div>
        );
      })}
    </div>
  );
}
