import PostCard from "@/components/PostCard";
import { Comment, Post } from "@/types";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const UserPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR(username ? `user/${username}` : null);

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* 유저 포스트 댓글 리스트 */}
      <div className="w-full md:mr-3 md:w-8/12">
        {data.userData.map((data: any) => {
          if (data.type === "Post") {
            const post: Post = data;
            return <PostCard key={post.identifier} post={post} />;
          } else {
            const comment: Comment = data;
            return (
              <div
                key={comment.identifier}
                className="flex my-4 bg-white rounded"
              >
                <div className="flex-shrink-0 w-10 py-10 text-center bg-gray-200 rounded">
                  <i className="text-gray-500 fas fa-comment-alt fa-xs"></i>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="hidden w-4/12 ml-3 md:block"></div>
    </div>
  );
};

export default UserPage;
