import Like from "./components/Like";
import Comment from "./components/Comment";
import Repost from "./components/Repost";
import Share from "./components/Share";

export default function InteractionBar({
  likes,
  comments,
  repost,
  shares,
  onToggleReply,
  isEmbedView = false,
  ...prop
}) {
  return (
    <div className="flex gap-1 items-center mt-3">
      <Like count={likes} isEmbedView={isEmbedView} {...prop} />
      <Comment
        count={comments}
        onToggleReply={onToggleReply}
        isEmbedView={isEmbedView}
        {...prop}
      />
      <Repost count={repost} isEmbedView={isEmbedView} {...prop} />
      <Share count={shares} post={prop.post} isEmbedView={isEmbedView} />
    </div>
  );
}
