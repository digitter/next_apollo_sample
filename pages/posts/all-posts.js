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
      <h3>All posts</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link href={{ pathname: '/posts/edit/[id]', query: { id: post.id } }}>
                    <a>ID: {post.id}</a>
                  </Link>
                </td>
                <td>Title: {post.title}</td>
                <td>Body: {post.body}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>・<Link href="/">トップへ戻る</Link></p>
      <p>・<Link href="/posts/all-posts">投稿一覧ページ</Link></p>
      <p>・<Link href="/posts/find-by-id">投稿ID検索ページ</Link></p>
      <p>・<Link href="/posts/create-post">投稿作成ページ</Link></p>
    </>
  )
}
