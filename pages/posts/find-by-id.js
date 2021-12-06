import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import { POST } from "../../graphql/queries/post";
import Link from "next/link";

export default function FindById() {
  const [cachedData, setCachedData] = useState();
  const [id, setId] = useState();

  // useLazyQuery
  // (イベント時にクエリ実行する。useQueryと違いコンポーネントレンダー時にはクエリされない。)
  const [
    getPost,
    { loading, error, data, called }
  ] = useLazyQuery(POST, { variables: { id } });

  useEffect(() => {
    if (data) setCachedData(data);
  }, [loading, cachedData]);

  const handleIdChange = event => setId(event.target.value);

  // 状態管理しているpostのidと
  // 検索しようとしているidが等しいならサーバーへリクエストしない。
  const handleClick = () => { if (data !== id) getPost({ variables: { id } }); }

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <>
      <h3>Find post by id</h3>

      <input type="number" onChange={handleIdChange} />
      <input type="button" value="検索" onClick={handleClick} />
      <br />

      {
        called ? (
          <>
            <strong>Post find by id {id}</strong>
            <p>Title: {data.post.title}</p>
            <p>Body: {data.post.title}</p>
          </>
        ) : null
      }

      <p>
        ・<Link href="/posts/all-posts">投稿一覧ページ</Link>
      </p>
      <p>
        ・<Link href="/posts/find-by-id">投稿ID検索ページ</Link>
      </p>
      <p>
        ・<Link href="/posts/create-post">投稿作成ページ</Link>
      </p>
    </>
  );
}
