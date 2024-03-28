export type GroupPreview = {
  id: string,
  title: string,
  createdAt: string,
  participants: Participant[]
}
export type Group = {
  id: string,
  title: string,
  createdAt: string,
  participants: Participant[]
}
export type Participant = {
  id: string,
  name: string,
}