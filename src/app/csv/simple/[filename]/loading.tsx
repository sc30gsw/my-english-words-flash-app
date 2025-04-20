import { Loader } from '~/components/intentui/ui/loader'

export default function SimpleCsvLoading() {
  return (
    <Loader
      variant="ring"
      size="large"
      intent="primary"
      className="animate-spin"
    />
  )
}
