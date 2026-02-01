export default function ReportButton() {
  return (
    <button
      className="text-xs text-[#797979]"
      onClick={(e) => {
        e.stopPropagation();
        console.log("신고");
        // fetchReportResult(feed.fid);
      }}
    >
      신고
    </button>
  );
}
