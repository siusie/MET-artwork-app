import { getToken } from "../lib/authenticate";

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function getFavourites() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return [];
  }
}

export async function addToHistory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function removeFromHistory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function getHistory() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/history`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
