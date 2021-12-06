import { useQuery } from "@apollo/client"
import Link from "next/link";
import { POSTS } from "../../graphql/queries/post";

export default function AllPosts() {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  console.log(data);

  return (
    <>
      <h3>
        All posts
      </h3>
      {
        data.posts.map((post, index) => {
          return (
            <div key={index}>
              {post.id}: {post.title} {post.body}
            </div>
          )
        })
      }

      <p>・<Link href="/">トップへ戻る</Link></p>
      <p>・<Link href="/posts/all-posts">投稿一覧ページ</Link></p>
      <p>・<Link href="/posts/find-by-id">投稿ID検索ページ</Link></p>
      <p>・<Link href="/posts/create-post">投稿作成ページ</Link></p>
    </>
  )
}
