export type BuildCard = {
  user: { email: string },
  id: string,
  name: string,
  totalPrice: number,
  createdAt: Date | null,
  components: {
    id: string,
    component: {
      name: string,
    }
  }[]
}