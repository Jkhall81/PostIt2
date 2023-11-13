import { motion } from "framer-motion";
import Image from "next/image";
import { PostHeadContainer } from "./PostHeadContainer";
import { Post } from "@/interfaces/interface";
import { useRedux } from "@/hooks/useRedux";
import { Likes } from "./Likes";

const variants = {
  hidden: { x: 100 },
  visible: { x: 0, transition: { duration: 0.3 } },
};

interface Props {
  post: Post;
  posts: Post[];
}

export const ImageModal = ({ post, posts }: Props) => {
  const { userLogged } = useRedux();
  return (
    <div
      className="fixed top-0 left-0 h-full w-full bg-black/80 flex items-center
    justify-center z-50"
    >
      <motion.section
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        className="flex w-[1200px] h-[calc(100vh-100px)] bg-gray-200 dark:bg-dark-200"
      >
        <div className="relative w-full max-w-[700px] h-[calc(100vh-100px)] bg-black aspect-video">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
            alt="#"
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.webp"
            sizes="(max-width: 920px) 100vw, 700px, 500px, 300px"
            className="object-contain"
          />
        </div>

        <div className="w-full px-6 py-4 overflow-y-auto modal">
          <div className="mb-6">
            <PostHeadContainer
              post={post}
              posts={posts}
              authorId={post.author_id ?? userLogged!.id}
              authorUsername={
                typeof post.author === "number"
                  ? userLogged!.username
                  : post.author
              }
            />
          </div>

          {/* Likes */}
          <Likes
            likes={post.likes}
            likesCount={post.likes.length}
            postId={post.id}
          />
        </div>
      </motion.section>
    </div>
  );
};
