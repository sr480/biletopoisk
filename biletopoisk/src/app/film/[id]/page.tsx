export default function Page({ params }: { params: { id: string } }) {
  return <div>My Film: {params.id}</div>
}