import type { UserOutputType } from "../types/user-output-type"

let currentUser: UserOutputType | null = null

export function setCurrentUser(user: UserOutputType | null) {
  currentUser = user
}

export function getCurrentUser() {
  return currentUser
}
