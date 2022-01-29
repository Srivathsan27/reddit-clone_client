import Router from "next/router";
import { useEffect } from "react";
import { useMeQuery, useCreateNewPostMutation } from "../../generated/graphql";

export const useIsAuth = (next: string | null = null) => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      if (next) {
        Router.replace("/login?next=" + next);
      } else {
        Router.replace("/login");
      }
    }
  }, [data, Router, fetching]);
};
