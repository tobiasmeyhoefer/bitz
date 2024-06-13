export default function Page({ params }: { params: { id: string } }) {
  return <div>Test: {params.id}</div>
}
