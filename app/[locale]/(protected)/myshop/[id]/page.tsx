// Might be needed later to display shops/profiles
export default function Page({ params }: { params: { id: string } }) {
  return <div>Some Shop/Profile: {params.id}</div>
}
