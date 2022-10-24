/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  throw new Error('Crash homepage');
  return null
}

export function getServerSideProps() {
  return {
    props: {}
  }
}

