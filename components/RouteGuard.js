const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];
import { isAuthenticated } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { useAtom } from "jotai";
import { getHistory, getFavourites } from "../lib/userData";

export default function RouteGuard(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  const [authorized, setAuthorized] = useState(false);

  function authCheck(url) {
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    async function initializeAuth() {
      authCheck(router.pathname);

      // Only update atoms if user is authenticated
      if (isAuthenticated()) {
        await updateAtoms();
      }
    }

    initializeAuth();

    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{authorized && props.children}</>;
}
