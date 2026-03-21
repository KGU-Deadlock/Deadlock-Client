export function formatNicknameInput(value: string) {
  return value.trim().replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
}

export const NICKNAME_MAX_LENGTH = 13;
