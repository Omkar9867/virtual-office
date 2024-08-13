import Image from "next/image";
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Virtual Office</h1>
      <Chat/>
    </div>
  );
}
