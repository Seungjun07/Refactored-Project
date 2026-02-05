// import reArrow1 from "./../../img/reArrow1.svg";
// import reArrow2 from "./../../img/reArrow2.svg";
// import reArrow3 from "./../../img/reArrow3.svg";
// import reArrow4 from "./../../img/reArrow4.svg";
// // / 대댓글
// function ReplyComment({
//   index,
//   length,
//   reply,
//   fetchOriginalComment,
//   handleRemove,
// }) {
//   const [firstWord, ...restWords] = reply.body.split(" ");

//   let src;

//   if (length === 1) {
//     src = reArrow1;
//   } else {
//     if (index === 0) {
//       src = reArrow2;
//     } else if (index + 1 === length) {
//       src = reArrow4;
//     } else {
//       src = reArrow3;
//     }
//   }

//   return (
//     <div className={style["img-container"]}>
//       <img src={src} alt="대댓글" />
//       <div
//         key={reply.cid}
//         className={`${style["reply-box"]}`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className={style["comment-user"]}>
//           <p>{reply.uname}</p>
//           <div className={style["function_button_container"]}>
//             {reply.is_reworked && (
//               <button
//                 className={style["AI_text"]}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   fetchOriginalComment(reply.cid);
//                 }}
//               >
//                 원문 보기
//               </button>
//             )}
//             {reply.owner ? (
//               <div
//                 className={style["comment-delete-report"]}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(reply.cid);
//                 }}
//               >
//                 삭제
//               </div>
//             ) : (
//               <div className={style["comment-delete-report"]}>신고</div>
//             )}
//           </div>
//         </div>

//         <div className={style["comment-content"]}>
//           <span style={{ color: reply.mention ? "#2C59CD" : "black" }}>
//             {firstWord}{" "}
//           </span>
//           {restWords.join("")}
//         </div>

//         <span className={style["date-st"]}> {reply.date}</span>
//       </div>
//     </div>
//   );
// }
