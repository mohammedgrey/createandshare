import { useEffect, useState } from "react";
import axios from "axios";

const UsePagination = (url, pageNumber, type) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // useEffect(() => {
  //   setBooks([]);
  // }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      params: { page: pageNumber, limit: 5 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setItems((prevItems) => {
          if (type === "followers") {
            return [...prevItems, ...res.data.data.followers];
          } else if (type === "following") {
            return [...prevItems, ...res.data.data.following];
          } else if (type === "posts") {
            return [...prevItems, ...res.data.data.posts];
          } else {
            return [...prevItems, ...res.data.data.posts];
          }
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, pageNumber]);

  return { loading, error, items, hasMore };
};

export default UsePagination;
