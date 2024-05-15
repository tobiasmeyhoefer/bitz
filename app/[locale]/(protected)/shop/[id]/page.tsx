export default function Page({ params }: { params: { id: string } }) {
  return <div>Some Shop: {params.id}</div>
}
