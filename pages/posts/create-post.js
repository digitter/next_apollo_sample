import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutations/post";
import { POSTS } from "../../graphql/queries/post";
import Link from 'next/link'

export default function CreatePost() {
  let title, body;
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handlePostSubmit = event => {
    event.preventDefault();

    createPost(
      {
        variables: { title: title.value, body: body.value },
        update: (cache, { data: { createPost } }) => {
          const data = cache.readQuery({ query: POSTS }); // クエリのcacheを読み込み。
          if (!data) return; // 上記のクエリcacheがなければ return
          const newData = [ ...data.posts, createPost];
          // クエリのcacheがあればそこにデータを追加する。
          cache.updateQuery({ query: POSTS }, () => ({ posts: newData }));
        }
      }
    );

    title.value = '';
    body.value = '';
  }

  const newPost = data?.createPost

  return (
    <div>
      <h3>Create Post</h3>

      {newPost
        ? (
          <div>
            <h3>Successfuly created data below</h3>
            <p>{newPost.id}</p>
            <p>{newPost.title}</p>
            <p>{newPost.body}</p>
          </div>
        ) : null}

      <form onSubmit={handlePostSubmit}>
        <input placeholder='title' ref={node => { title = node; }} /><br />
        <input placeholder='body' ref={node => { body = node; }} /><br />
        <button type="submit">Add Post</button>
      </form>

      <p>・<Link href="/">トップへ戻る</Link></p>
      <p>・<Link href="/posts/all-posts">投稿一覧ページ</Link></p>
      <p>・<Link href="/posts/find-by-id">投稿ID検索ページ</Link></p>
      <p>・<Link href="/posts/create-post">投稿作成ページ</Link></p>
    </div>
  );
}
