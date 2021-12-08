import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { DESTROY_POST, UPDATE_POST } from "../../../graphql/mutations/post";
import { POST, POSTS } from "../../../graphql/queries/post";

export default function EditPost() {
  let newTitle, newBody;
  const router = useRouter();
  const { query } = router;
  const { data, loading, error } = useQuery(POST, { variables: { id: query.id } });

  const [updatePost] = useMutation(
    UPDATE_POST,
    {
      update(cache, { data: { updatePost }}) {
        const data = cache.readQuery({ query: POSTS });
        if (!data) return;
        const { posts } = data;

        posts.forEach(post => {
          if (post.id === updatePost.id) {
            post = updatePost
          }
        });

        cache.updateQuery({ query: POSTS }, () => ({ posts }));
        cache.updateQuery(
          { query: POST, variables: { id: updatePost.id } },
          () => ({ post: updatePost })
        );
      }
    }
  );

  const [destroyPost] = useMutation(
    DESTROY_POST,
    {
      update(cache, { data: { destroyPost }}) {
        const data = cache.readQuery({ query: POSTS });
        if (!data) return;
        const posts = data.posts.filter(post => post.id !== destroyPost.id);
        cache.updateQuery({ query: POSTS }, () => ({ posts }));
      }
    }
  );

  const handlePostUpdate = event => {
    event.preventDefault();
    updatePost({ variables: { id: query.id, title: newTitle.value, body: newBody.value } });
    newTitle.value = newTitle.value;
    newBody.value = newBody.value;
  }

  const handlePostDestroy = event => {
    event.preventDefault();
    if (!window.confirm("削除してもよい？")) return
    destroyPost({ variables: { id: query.id } })
    router.push('/posts/all-posts')
  }

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <>
      <h3>Edit post</h3>

      <strong>ID: {query.id}</strong>

      <form onSubmit={handlePostUpdate}>
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

      <button onClick={handlePostDestroy}>Delete Post</button>

      <p>・<Link href="/">トップへ戻る</Link></p>
      <p>・<Link href="/posts/all-posts">投稿一覧ページ</Link></p>
      <p>・<Link href="/posts/find-by-id">投稿ID検索ページ</Link></p>
      <p>・<Link href="/posts/create-post">投稿作成ページ</Link></p>
    </>
  )
}
