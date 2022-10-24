import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  throw new Error('Crash homepage');
  return <div>Homepage</div>
}

export function getServerSideProps() {
  return {
    props: {}
  }
}
