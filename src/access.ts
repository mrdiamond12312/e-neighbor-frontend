/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.TAuthProfile } | undefined) {
  const { currentUser } = initialState ?? {};

  return {
    isLessor: currentUser?.role === 'lessor',
    isUser: currentUser?.role === 'user',
    isGuest: !currentUser,
  };
}
