import { useMatches } from "@remix-run/react";
import { addMovie } from "./api/databaseOperations.server";

function isUser(user) {
  return user && typeof user === "object" && typeof user.username === "string";
}

export function useOptionalUser() {
  const data = useMatches();

  const rootData = data.find(obj => obj.id === "root");

  if (!rootData || !isUser(rootData.data.user)) {
    return undefined;
  }

  return rootData.data.user;
}

