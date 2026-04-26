export const useNotifications = () => {
  const { notifications, saveNotifications } = useMockStorage()
  const { user } = useAuth()

  const userNotifications = computed(() =>
    notifications.value.filter(n => n.userId === user.value?.id).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  )

  const unreadCount = computed(() => userNotifications.value.filter((n: any) => !n.read).length)

  function markRead(id: string) {
    const n = notifications.value.find((n: any) => n.id === id)
    if (n) { n.read = true; saveNotifications() }
  }

  function markAllRead() {
    notifications.value.filter((n: any) => n.userId === user.value?.id).forEach((n: any) => { n.read = true })
    saveNotifications()
  }

  return { userNotifications, unreadCount, markRead, markAllRead }
}
