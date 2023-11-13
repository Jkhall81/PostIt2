import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useRedux = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);
  const { user: userLogged } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.user);
  const { value: hasMore } = useAppSelector((state) => state.hasMore);
  const { comments } = useAppSelector((state) => state.comment);

  return { posts, userLogged, dispatch, users, hasMore, comments };
};
