import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { UPDATE_POST } from "../../../graphql/mutations/post";
import { POST } from "../../../graphql/queries/post";

export default function EditPost() {
  const router = useRouter();
  const { query } = router;
  const { data, loading, error } = useQuery(POST, { variables: { id: query.id } })
  const [updatePost] = useMutation(UPDATE_POST);
  let newTitle, newBody;

  const handlePostSubmit = event => {
    event.preventDefault();
    updatePost({ variables: { id: query.id, title: newTitle.value, body: newBody.value } });
    newTitle.value = newTitle.value;
    newBody.value = newBody.value;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <>
      <h3>Edit post</h3>

      <strong>ID: {query.id}</strong>

      <form onSubmit={handlePostSubmit}>
        <input
          placeholder='title'
          defaultValue={data.post.title}
          ref={node => { newTitle = node; }}
        />
        <br />
        <input
          placeholder='body'
          defaultValue={data.post.body}
          ref={node => { newBody = node; }}
        />
        <br />
        <button type="submit">
          Update Post
        </button>
      </form>

      <p>・<Link href="/">トップへ戻る</Link></p>
      <p>・<Link href="/posts/all-posts">投稿一覧ページ</Link></p>
      <p>・<Link href="/posts/find-by-id">投稿ID検索ページ</Link></p>
      <p>・<Link href="/posts/create-post">投稿作成ページ</Link></p>
    </>
  )
}
