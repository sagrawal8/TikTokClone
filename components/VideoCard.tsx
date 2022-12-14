import React, {useState, useRef, useEffect} from 'react'
import {Video} from '../types'
import {NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import {BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';

interface IProps {
    post: Video
}
const VideoCard: NextPage<IProps> = ({post}) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  const onVidPress = () => {
    if(isPlaying) {
      vidRef?.current?.pause();
      setPlaying(false);
    } else {
      vidRef?.current?.play();
      setPlaying(true);
    }
  }

  useEffect(() => {
    if(vidRef?.current) {
      vidRef.current.muted = isMuted;
    }
  }, [isMuted]);
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=' rounded-full'
                  src={post.postedBy?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div 
          className="round-3xl"
          onMouseEnter={() => {setIsHover(true)}}
          onMouseLeave={() => {setIsHover(false)}}>
          <Link href={`/detail/${post._id}`}>
            <video 
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              loop
              src={post.video.asset.url}
              ref={vidRef} />
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {isPlaying ? (
                <button onClick={onVidPress}>
                  <BsFillPauseFill 
                  className="text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVidPress}>
                  <BsFillPlayFill 
                   className="text-2xl lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setMuted(false)}>
                  <HiVolumeOff
                  className="text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setMuted(true)}>
                  <HiVolumeUp
                   className="text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard